// Variables
const calculator = document.querySelector('.calculator');
const numbers = calculator.querySelectorAll('.num');
const display = calculator.querySelector('.display');
const operators = calculator.querySelectorAll('.operator');
const equals = calculator.querySelector('.equals');
const ac = calculator.querySelector('.ac');
const c = calculator.querySelector('.c');
const digits = calculator.querySelectorAll('.digit');

const keys = ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '%', 'Enter', 'Backspace', 'Delete'];
const segmentCodes = ['1111110', '0110000', '1101101', '1111001', '0110011', '1011011', '1011111', '1110000', '1111111', '1111011'];
const overflowCodes = ['0011101', '0111110', '1001111', '0000101', '1000111', '0001110', '0011101', '0101010'].reverse();
const segmentColorOn = getComputedStyle(document.documentElement).getPropertyValue('--segment-color-on');
const segmentColorOff = getComputedStyle(document.documentElement).getPropertyValue('--segment-color-off');

let displayValue = '0';
let previousValue = '';
let currentValue = '';
let currentOperator = '';
let segments = [];
let dots = [];

for (let i = 0; i < digits.length; i++) {
    segments[i] = Array.from(digits[i].querySelectorAll('div')).splice(0, 7);
    dots = display.querySelectorAll('.dot');
}

// Main
printValue();

// Events
onkeydown = (e) => {
    // Prevent enter from pressing the last clicked button with mouse.
    if (e.key === 'Enter') {
        e.preventDefault();
    }
}

document.onkeydown = (e) => {
    if (keys.includes(e.key)) {
        const pressedElement = document.getElementById(e.key);
        pressedElement.click();
    }
};

numbers.forEach((element) => {
    element.addEventListener('click', numberClick);
});

operators.forEach((element) => {
    element.addEventListener('click', operatorClick);
});

equals.addEventListener('click', equalsClick);

ac.addEventListener('click', () => {
    displayValue = '0';
    previousValue = '';
    currentValue = '0';
    currentOperator = '';
    printValue();
});

c.addEventListener('click', () => {
    displayValue = '0';
    currentValue = '';
    printValue();
});

// Functions
function numberClick(e) {
    if (currentValue === '0') {
        currentValue = '';
    }
    if (currentValue.includes('.') && e.target.textContent === '.') {
        return;
    }
    currentValue += e.target.textContent;
    if (currentValue === '.') {
        currentValue = '0.';
    }
    displayValue = currentValue;
    printValue();
}

function operatorClick(e) {
    currentValue = '';
    if (previousValue !== '') {
        displayValue = operate(currentOperator, previousValue, displayValue);
        printValue();
    }
    previousValue = displayValue;
    displayValue = '';
    currentOperator = e.target.textContent;
}

function equalsClick(e) {
    if (currentOperator === '') {
        return;
    }
    displayValue = operate(currentOperator, previousValue, displayValue);
    previousValue = '';
    currentValue = '';
    currentOperator = '';
    printValue();
}

function printValue() {
    clearDisplay();
    let dotOffset = 0;
    let maxDecimalCount = 12 - Math.max(0, displayValue.indexOf('.'));
    // displayValue = (Math.round(Number(displayValue) * Number('1' + ('0'.repeat(maxDecimalCount)))) / Number('1' + ('0'.repeat(maxDecimalCount)))).toString();
    if (displayValue.length - (displayValue.includes('.') ? 1 : 0) > 12) {
        printOverflow();
        return;
    }
    const displayDigits = displayValue.split('').reverse();
    if (displayDigits[0] === '.') {
        displayDigits.unshift('0');
    }
    for (let i = 0; i < displayDigits.length; i++) {
        if (displayDigits[i] === '.') {
            dots[i - 1].style.backgroundColor = segmentColorOn;
            dotOffset = 1;
            continue;
        }
        if (displayDigits[i] === '-') {
            segments[i - dotOffset][6].style.backgroundColor = segmentColorOn;
        }
        for (let j = 0; j < 7; j++) {
            if (segmentCodes[displayDigits[i]].charAt(j) === '1') {
                segments[i - dotOffset][j].style.backgroundColor = segmentColorOn;
            } else {
                segments[i - dotOffset][j].style.backgroundColor = segmentColorOff;
            }
        }
    }
}

function printOverflow() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 7; j++) {
            if (overflowCodes[i].charAt(j) === '1') {
                segments[i][j].style.backgroundColor = segmentColorOn;
            } else {
                segments[i][j].style.backgroundColor = segmentColorOff;
            }
        }
    }
}

function clearDisplay() {
    segments.forEach((digit) => {
        digit.forEach((segment) => {
            segment.style.backgroundColor = segmentColorOff;
        });
        dots.forEach((segment) => {
            segment.style.backgroundColor = segmentColorOff;
        });
    });
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b).toString();
        case '-':
            return subtract(a, b).toString();
        case '*':
            return multiply(a, b).toString();
        case '/':
            return divide(a, b).toString();
        case '%':
            return remainder(a, b).toString();

        default:
            break;
    }
}

function add(a, b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return Number(a) - Number(b);
}

function multiply(a, b) {
    return Number(a) * Number(b);
}

function divide(a, b) {
    if (Number(b) === 0) {
        return 'BRUH';
    }
    return Number(a) / Number(b);
}

function remainder(a, b) {
    return Number(a) % Number(b);
}