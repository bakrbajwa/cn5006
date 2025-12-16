// Basic Arithmetic Operations Program
// Week 1 Portfolio Exercise

// Function to perform arithmetic operations
function calculate(num1, num2, operator) {
  let result;

  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      // Handle division by zero
      result = num2 !== 0 ? num1 / num2 : "Error: Division by zero";
      break;
    default:
      result = "Invalid operator!";
  }

  return result;
}

// Example usage
let number1 = 20;
let number2 = 5;

console.log("Addition:", calculate(number1, number2, '+'));
console.log("Subtraction:", calculate(number1, number2, '-'));
console.log("Multiplication:", calculate(number1, number2, '*'));
console.log("Division:", calculate(number1, number2, '/'));
