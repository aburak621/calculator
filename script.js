const calculator = document.querySelector('.calculator');
const numbers = calculator.querySelectorAll('.num');
const display = calculator.querySelector('.display');
const operators = calculator.querySelectorAll('.operator');
const equals = calculator.querySelector('.equals');

let displayValue = '';
let previousValue = '';
let currentOperator = '';

numbers.forEach((element) => {
    element.addEventListener('click', numberClick);
});
operators.forEach((element) => {
    element.addEventListener('click', operatorClick);
});
equals.addEventListener('click', equalsClick);

function numberClick(e) {
    displayValue += e.target.textContent;
    printValue();
}

function operatorClick(e) {
    previousValue = displayValue;
    displayValue = '';
    currentOperator = e.target.textContent;
}

function equalsClick(e) {
    displayValue = operate(currentOperator, previousValue, displayValue);
    console.log(displayValue);
    printValue();
}

function printValue() {
    display.textContent = displayValue;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case '*':
            return multiply(a, b);
            break;
        case '/':
            return divide(a, b);
            break;
        case '%':
            return remainder(a, b);
            break;

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