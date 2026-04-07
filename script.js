function handleNumber(value) {
    if (value === ".") {
        if (!op && firstNum.includes(".")) return;
        if (op && secondNum.includes(".")) return;
    }

    if (resetDisplay) {
        if (!op) {
            firstNum = "";
        }
        secondNum = "";
        resetDisplay = false;
    }

    if (!op) {
        firstNum += value;
    } else {
        secondNum += value;
    }

    console.log(firstNum, op, secondNum);
}

function setOperator(opValue) {
    // Allow negative number at the start
    if (firstNum === "" && opValue === "-") {
        firstNum = "-";
        return;
    }

    if (firstNum === "") return;

    if (op && secondNum === "") {
        op = opValue;
        return;
    }

    if (secondNum !== "") {
        calculate();
    }

    op = opValue;
}

function calculate() {
    if (!firstNum || !secondNum || !op) return;

    let result = operate(Number(firstNum), op, Number(secondNum));


    if (result === "ERROR") {
        lastEquation = "Undefined";
        firstNum = "";
        secondNum = "";
        op = null;
        resetDisplay = true;
        return;
    }

    //round decimals
    result = Math.round(result * 10000) / 10000;

    lastEquation = `${firstNum} ${op} ${secondNum} = ${result}`;

    firstNum = result.toString();
    secondNum = "";
    op = null;

    resetDisplay = true;
}

function operate(a, op, b) {
    if (op === "+") return a + b;
    if (op === "-") return a - b;
    if (op === "*") return a * b;
    if (op === "/") return b === 0 ? "ERROR" : a / b;
}

function updateDisplay() {
    previousDisplay.textContent = lastEquation;

    if (op) {
        currentDisplay.textContent = `${firstNum} ${op} ${secondNum}`;
    } else {
        currentDisplay.textContent = firstNum || "0";
    }
}

let firstNum = "";
let secondNum = "";
let op = null;

let lastEquation = "";
let resetDisplay = false;

const buttons = document.querySelectorAll(".btn");
const clearBtn = document.getElementById("clearBtn");
const deleteBtn = document.getElementById("deleteBtn");

const previousDisplay = document.getElementById("previous");
const currentDisplay = document.getElementById("current");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;

        if (!isNaN(value) || value === ".") {
            handleNumber(value);
        } else if (value === "=") {
            calculate();
        } else {
            setOperator(value);
        }

        updateDisplay();
    });
});

clearBtn.addEventListener("click", () => {
    firstNum = "";
    secondNum = "";
    op = null;
    lastEquation = "";

    resetDisplay = false;
    updateDisplay();
});

deleteBtn.addEventListener("click", () => {
    if (!op) {
        firstNum = firstNum.slice(0, -1);
    } else {
        secondNum = secondNum.slice(0, -1);
    }

    updateDisplay();
});



