const displayValue = document.getElementById('display-value');
const calculatorButton = document.querySelectorAll('.calculator-button');
const plusButton = document.getElementById('plus');
const equalsButton = document.getElementById('equals');

let displayNum;
let firstNum;
let operator;
let secondNum;
let plusUsed = false;
let subtractUsed = false;
let multiplyUsed = false;
let divideUsed = false;
let equalsUsed = false;
let numbers = [];

function add(arr) {
  //   let result = parseFloat(firstNum) + parseFloat(secondNum);
  //   return result;
  let plusIndex = arr.indexOf('+');
  let result = arr.splice(
    plusIndex - 1,
    3,
    parseFloat(arr[plusIndex - 1]) + parseFloat(arr[plusIndex + 1])
  );
  console.log(result);
  return result;
}

function subtract(firstNum, secondNum) {
  return firstNum - secondNum;
}

function multiply(firstNum, secondNum) {
  return firstNum * secondNum;
}

function divide(firstNum, secondNum) {
  return firstNum / secondNum;
}

// function operate(operator, firstNum, secondNum) {
//   return `${operator}`(firstNum, secondNum);
// }

function operate() {
  if (plusUsed === true) {
    add(numbers);
  }
}

calculatorButton.forEach((button) =>
  button.addEventListener('click', () => {
    displayNum = button.textContent;

    if (button.textContent === 'CE') {
      displayValue.textContent = '';
    } else {
      displayValue.textContent += button.textContent;
      firstNum = button.textContent;
      displayNum = displayValue.textContent;
    }
    console.log(numbers);
    // isNaN(button.textContent)
    //   ? console.log('This aint a number')
    //   : (displayValue.textContent += button.textContent);
  })
);

plusButton.addEventListener('click', () => {
  plusUsed = true;

  if (!equalsUsed) {
    numbers.push(parseFloat(displayValue.textContent), '+');
  } else {
    numbers.push('+');
  }
  displayValue.textContent = '';
  console.log(numbers);
});

equalsButton.addEventListener('click', () => {
  equalsUsed = true;

  numbers.push(parseFloat(displayValue.textContent));
  operate();

  console.log(numbers);
  displayValue.textContent = numbers;
});
