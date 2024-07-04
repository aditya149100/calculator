const resultBtn = document.getElementById("calculate");
const clearBtn = document.getElementById("clear");
const numBtns = document.getElementsByClassName('calbtn');
const result = document.getElementById("result");

let currentInput = '';
let previousInput = '';
let operator = '';

function updateResult() {
    result.innerText = previousInput + ' ' + operator + ' ' + currentInput;
}

function handleNumberClick(e) {
    const value = e.target.id;
    currentInput += value;
    updateResult();
}

function handleOperatorClick(e) {
    if (currentInput === '' && e.target.id !== 'clear') return;
    
    if (previousInput && currentInput && operator) {
        calculate();
    } else {
        previousInput = currentInput;
        currentInput = '';
    }
    
    operator = e.target.innerText;
    updateResult();
}

function calculate() {
    let calculation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            calculation = prev + current;
            break;
        case '-':
            calculation = prev - current;
            break;
        case 'X':
            calculation = prev * current;
            break;
        case '/':
            calculation = prev / current;
            break;
        default:
            return;
    }

    currentInput = calculation.toString();
    operator = '';
    previousInput = '';
    updateResult();
}

function handleClear() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateResult('0');
}

Array.from(numBtns).forEach(btn => {
    if (!isNaN(btn.id)) {
        btn.addEventListener('click', handleNumberClick);
    } else if (btn.id === 'clear') {
        btn.addEventListener('click', handleClear);
    } else {
        btn.addEventListener('click', handleOperatorClick);
    }
});

resultBtn.addEventListener('click', calculate);
clearBtn.addEventListener('click', handleClear);
