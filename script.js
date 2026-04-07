function handleNumber(value) {
    if (!op) {
        firstNum += value;
    } else {
        secondNum += value;
    }

    console.log(firstNum, setOperator, secondNum);
}

function setOperator(opValue) {
    if (firstNum === "") return;
    op = opValue;
}

function calculate() {
    if (!firstNum || !secondNum || !op) return;

    const result = operate(Number(firstNum), op, Number(secondNum));

    firstNum = result.toString();
    secondNum = "";

    console.log(result);
}

function operate(a, op, b) {
    if (op === "+") return a + b;
    if (op === "-") return a - b;
    if (op === "*") return a * b;
    if (op === "/") return b === 0 ? "ERROR" : a / b;
}

let firstNum = "";
let secondNum = "";
let op = null;

const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;

        if (!isNaN(value)) {
            handleNumber(value);
        } else if (value === "=") {
            calculate();
        } else {
            setOperator(value);
        }
    });
});



