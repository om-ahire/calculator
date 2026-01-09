const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    // CLEAR
    if (value === 'C') {
      display.textContent = '0';
      firstNumber = null;
      operator = null;
      waitingForSecondNumber = false;
      return;
    }

    // DELETE
    if (value === 'DEL') {
      if (display.textContent.length === 1) {
        display.textContent = '0';
      } else {
        display.textContent = display.textContent.slice(0, -1);
      }
      return;
    }

    // DECIMAL
    if (value === '.') {
      if (!display.textContent.includes('.')) {
        display.textContent += '.';
      }
      return;
    }

    // OPERATORS
    if (['+', '-', '×', '÷'].includes(value)) {
      firstNumber = parseFloat(display.textContent);
      operator = value;
      waitingForSecondNumber = true;
      return;
    }

    // EQUALS
    if (value === '=') {
      if (operator === null || waitingForSecondNumber) return;

      const secondNumber = parseFloat(display.textContent);
      let result;

      switch (operator) {
        case '+':
          result = firstNumber + secondNumber;
          break;
        case '-':
          result = firstNumber - secondNumber;
          break;
        case '×':
          result = firstNumber * secondNumber;
          break;
        case '÷':
          if (secondNumber === 0) {
            display.textContent = 'Error';
            return;
          }
          result = firstNumber / secondNumber;
          break;
      }

      display.textContent = result.toString();
      operator = null;
      waitingForSecondNumber = false;
      return;
    }

    // NUMBERS
    if (!isNaN(value)) {
      if (display.textContent === '0' || waitingForSecondNumber) {
        display.textContent = value;
        waitingForSecondNumber = false;
      } else {
        display.textContent += value;
      }
    }
  });
});
