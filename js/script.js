const display = document.getElementById('display');
let buttons = document.querySelectorAll('.cal__btn');
let currentValue = "";
let operators = ['+', '-', '*', '/']
let isResultDisplayed = false;

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let value = e.target.textContent.trim();


    if (value === "Back") { 
      currentValue = currentValue.slice(0, -1);
      display.innerText = currentValue.length === 0 ? "0" : currentValue;
      return;
    }
    if(value === 'x') {
      value = '*';
    }
    if (value === "C") {
      display.innerText = "0";
      currentValue = "";
      isResultDisplayed = false
      return;
    }

    if (operators.includes(value)) {
      if (currentValue === "" || operators.includes(currentValue.slice(-1))) {
        return;
      }
    }


    if(isResultDisplayed && !operators.includes(value)) {
      display.innerText = value;
      currentValue = value;
      isResultDisplayed = false;
      return;
    }


    if (value === "=") {
      showResult();
      return;
    }

    if (display.innerText === "0" || currentValue == "") {
      display.innerText = value;
      currentValue = value;
    } else {
      display.innerText += value;
      currentValue += value;
    }
  });
});

function showResult() {
  let expression = currentValue;

  if (expression === "" || operators.includes(expression.slice(-1))) {
    return;
  }

  try {
    let result = eval(expression);
    display.innerText = result;
    currentValue = result.toString(); 
    isResultDisplayed = true
  } catch (error) {
    display.innerText = "Error";
    currentValue = "";
  }
}

