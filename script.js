const calculator = document.querySelector('.calculator');
const numbers = calculator.querySelectorAll('.num');
const display = calculator.querySelector('.display');
const operators = calculator.querySelectorAll('.operator');
const equals = calculator.querySelector('.equals');
const ac = calculator.querySelector('.ac');
const c = calculator.querySelector('.c');

const keys = ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '%', 'Enter', 'Backspace', 'Delete']

let displayValue = '0';
let previousValue = '';
let currentValue = '0';
let currentOperator = '';

// TODO: 7-segment display
// TODO: Keyboard support
// TODO: Prevent double dots

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
    currentValue = '';
    currentOperator = '';
    printValue();
});
c.addEventListener('click', () => {
    displayValue = '0';
    currentValue = '';
    printValue();
});

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
    display.textContent = displayValue;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        case '%':
            return remainder(a, b);

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