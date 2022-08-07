const calculator = document.querySelector('.calculator');
const numbers = calculator.querySelectorAll('.num');
const display = calculator.querySelector('.display');
const operators = calculator.querySelectorAll('.operator');
const equals = calculator.querySelector('.equals');
const ac = calculator.querySelector('.ac');
const c = calculator.querySelector('.c');

let displayValue = '0';
let previousValue = '';
let currentValue = '';
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
    currentValue += e.target.textContent;
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