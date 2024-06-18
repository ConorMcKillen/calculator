const displayValue = document.getElementById('display-value');
const calculatorButton = document.querySelectorAll('.calculator-button');
const plusButton = document.getElementById('plus');
const subtractButton = document.getElementById('subtract');
const multiplyButton = document.getElementById('multiply');
const divideButton = document.getElementById('divide');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');

let displayNum;
let operator;
let plusUsed = false;
let subtractUsed = false;
let multiplyUsed = false;
let divideUsed = false;
let equalsUsed = false;
let numbers = [];
let firstNum;
let secondNum;
let result;
let resultPushed = false;
let inputtingNewNumber = false;
let errorState = false;

function add(firstNum, secondNum) {
  result = parseFloat(firstNum) + parseFloat(secondNum);
  return Math.round(result * 100) / 100;
}

function subtract(firstNum, secondNum) {
  let result = parseFloat(firstNum) - parseFloat(secondNum);
  return Math.round(result * 100) / 100;
}

function multiply(firstNum, secondNum) {
  let result = parseFloat(firstNum) * parseFloat(secondNum);
  return Math.round(result * 100) / 100;
}

function divide(firstNum, secondNum) {
  let result = parseFloat(firstNum) / parseFloat(secondNum);
  return Math.round(result * 100) / 100;
}

function operate(operator, firstNum, secondNum) {
  if (operator === 'plus') return add(firstNum, secondNum);
  if (operator === 'subtract') return subtract(firstNum, secondNum);
  if (operator === 'multiply') return multiply(firstNum, secondNum);
  if (operator === 'divide') return divide(firstNum, secondNum);
}

calculatorButton.forEach((button) =>
  button.addEventListener('click', () => {
    if (errorState) return;

    if (!isNaN(button.textContent)) {
      if (inputtingNewNumber) {
        displayValue.textContent = ''; // Clear the display for new input
        inputtingNewNumber = false; // Reset the flag since the user is now inputting a new number
      }
      displayValue.textContent += button.textContent; // Append the new number to the display
      displayNum = parseFloat(displayValue.textContent);
      resultPushed = false; // Reset resultPushed as a new number is being input
    }
  })
);

clearButton.addEventListener('click', () => {
  displayValue.textContent = '';
  numbers = [];
});

plusButton.addEventListener('click', () => {
  if (!equalsUsed) {
    displayNum = parseFloat(displayValue.textContent);
    firstNum = displayNum;
  }

  if (!isNaN(displayNum) && numbers.length < 2 && !resultPushed) {
    numbers.push(displayNum);
    result = Math.round(numbers.reduce((acc, num) => acc + num, 0) * 100) / 100;
    resultPushed = true;
  }

  console.log(numbers);

  if (numbers.length === 2) {
    displayValue.textContent = result;
    numbers.splice(0, 2, result);
  }

  console.log(numbers);

  operator = 'plus';
  inputtingNewNumber = true; // Expect new input next
  equalsUsed = false;
});

subtractButton.addEventListener('click', () => {
  if (!equalsUsed) {
    displayNum = parseFloat(displayValue.textContent);
    firstNum = displayNum;
  }

  if (!isNaN(displayNum) && numbers.length < 2 && !resultPushed) {
    numbers.push(displayNum);
    result = Math.round(numbers.reduce((a, b) => a - b) * 100) / 100;
    resultPushed = true;
  }

  console.log(numbers);

  if (numbers.length === 2) {
    displayValue.textContent = result;
    numbers.splice(0, 2, result);
  }

  console.log(numbers);

  operator = 'subtract';
  inputtingNewNumber = true; // Expect new input next
  equalsUsed = false;
});

multiplyButton.addEventListener('click', () => {
  if (!equalsUsed) {
    displayNum = parseFloat(displayValue.textContent);
    firstNum = displayNum;
  }

  if (!isNaN(displayNum) && numbers.length < 2 && !resultPushed) {
    numbers.push(displayNum);
    result = Math.round(numbers.reduce((a, b) => a * b) * 100) / 100;
    resultPushed = true;
  }

  console.log(numbers);

  if (numbers.length === 2) {
    displayValue.textContent = result;
    numbers.splice(0, 2, result);
  }

  console.log(numbers);

  operator = 'multiply';
  inputtingNewNumber = true; // Expect new input next
  equalsUsed = false;
});

divideButton.addEventListener('click', () => {
  if (errorState) return;

  divideUsed = true;
  if (!equalsUsed) {
    displayNum = parseFloat(displayValue.textContent);
    firstNum = displayNum;
  }

  if (firstNum === 0 || secondNum === 0) {
    displayValue.textContent = `GTFO`;
    errorState = true;
    return;
  }

  if (!isNaN(displayNum) && numbers.length < 2 && !resultPushed) {
    numbers.push(displayNum);
    result = Math.round(numbers.reduce((a, b) => a / b) * 100) / 100;
    resultPushed = true;
  }

  console.log(numbers);

  if (numbers.length === 2) {
    displayValue.textContent = result;
    numbers.splice(0, 2, result);
  }

  console.log(numbers);

  operator = 'divide';
  inputtingNewNumber = true; // Expect new input next
  equalsUsed = false;
});

equalsButton.addEventListener('click', () => {
  if (equalsUsed) return;
  if (divideUsed && (firstNum === 0 || secondNum === 0 || displayNum === 0)) {
    displayValue.textContent = `GTFO`;
    errorState = true;
    return;
  }
  equalsUsed = true;
  secondNum = displayNum;
  result = operate(operator, firstNum, secondNum);
  displayValue.textContent = result;
  firstNum = result;
  numbers = [];
  resultPushed = false;
  console.log(firstNum);
  console.log(secondNum);
});

// function add(arr) {
//   //   let result = parseFloat(firstNum) + parseFloat(secondNum);
//   //   return result;
//   let plusIndex = arr.indexOf('+');
//   let result = arr.splice(
//     plusIndex - 1,
//     3,
//     parseFloat(arr[plusIndex - 1]) + parseFloat(arr[plusIndex + 1])
//   );

//   return parseFloat(result);
// }

// function subtract(arr) {
//   let subtractIndex = arr.indexOf('-');
//   let result = arr.splice(
//     subtractIndex - 1,
//     3,
//     parseFloat(arr[subtractIndex - 1]) - parseFloat(arr[subtractIndex + 1])
//   );
//   console.log(numbers);
//   return parseFloat(result);
// }

// function multiply(firstNum, secondNum) {
//   return firstNum * secondNum;
// }

// function divide(firstNum, secondNum) {
//   return firstNum / secondNum;
// }

// // function operate(operator, firstNum, secondNum) {
// //   return `${operator}`(firstNum, secondNum);
// // }

// function operate() {
//   if (plusUsed === true) {
//     add(numbers);
//   }
//   if (subtractUsed === true) {
//     subtract(numbers);
//   }
// }

// plusButton.addEventListener('click', () => {
//   plusUsed = true;

//   if (!isNaN(displayNum) && !equalsUsed && numbers.includes('+') === false) {
//     numbers.push(displayNum, '+');
//   } else if (numbers.includes('+') === false) {
//     numbers.push('+');
//   }

//   console.log(numbers);
//   displayValue.textContent = '';
// });

// subtractButton.addEventListener('click', () => {
//   subtractUsed = true;

//   if (
//     !isNaN(displayNum) &&
//     !equalsUsed &&
//     numbers.includes('-') === false &&
//     numbers.includes('+') === false
//   ) {
//     numbers.push(displayNum, '-');
//   } else if (
//     numbers.includes('-') === false &&
//     numbers.includes('+') === false
//   ) {
//     numbers.push('-');
//   }
//   displayValue.textContent = '';
// });

// equalsButton.addEventListener('click', () => {
//   equalsUsed = true;

//   numbers.push(parseFloat(displayNum));
//   console.log(numbers);
//   operate();

//   console.log(numbers);
//   displayValue.textContent = numbers;
// });
