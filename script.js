const asidePrimary = document.querySelector(".primary");
const asideSecondary = document.querySelector(".secondary");

const numberAmount = document.getElementById("number-amount");
const from = document.getElementById("from");
const to = document.getElementById("to");

const repeat = document.getElementById("back");

const sortNumber = document.querySelector(".sortNumber");

const sortButton = document.querySelector(".sort");
const sortAgain = document.querySelector(".again");
const results = document.querySelector(".results");

const allInputs = document.querySelectorAll("input");

const warning = document.querySelector(".warning");
const message = document.querySelector(".warning p");

let warningMessage;

let canRepeat = true;

let numbersToSort;
let minimalNumber;
let maximumNumber;

let counter = 1;

numberAmount.addEventListener("input", () => {
  numberAmount.value = numberAmount.value.replace(/\D/g, "");
});

from.addEventListener("input", () => {
  from.value = from.value.replace(/\D/g, "");
});

to.addEventListener("input", () => {
  to.value = to.value.replace(/\D/g, "");
});

repeat.onclick = function () {
  repeat.classList.toggle("active");

  if (repeat.classList.contains("active")) {
    canRepeat = false;
  } else {
    canRepeat = true;
  }

  console.log(canRepeat);
};

console.log(numbersToSort, minimalNumber, maximumNumber);

sortButton.addEventListener("click", () => {
  numbersToSort = Number(numberAmount.value);
  minimalNumber = Number(from.value);
  maximumNumber = Number(to.value);

  if (
    (numbersToSort && minimalNumber && maximumNumber) != "" &&
    minimalNumber < maximumNumber
  ) {
    try {
      console.log(numbersToSort, minimalNumber, maximumNumber);
      let numbersSorted = new Array(numbersToSort);
      let newNumber;

      if (canRepeat) {
        for (let i = 0; i < numbersSorted.length; i++) {
          numbersSorted[i] = generateNumber(minimalNumber, maximumNumber);
          newNumber = numbersSorted.at(i);
          sortNumber.textContent = `${counter}º RESULTADO`;
          createNumberElement(newNumber);
        }
        asidePrimary.classList.toggle("inactive");
        asideSecondary.classList.toggle("inactive");
      } else {
        if (
          numbersToSort <= maximumNumber - minimalNumber &&
          maximumNumber > minimalNumber
        ) {
          for (let i = 0; i < numbersSorted.length; i++) {
            numbersSorted[i] = generateNonRepeatedNumber(
              minimalNumber,
              maximumNumber,
              numbersSorted,
            );
            newNumber = numbersSorted.at(i);
            sortNumber.textContent = `${counter}º RESULTADO`;
            createNumberElement(newNumber);
          }
          asidePrimary.classList.toggle("inactive");
          asideSecondary.classList.toggle("inactive");
        } else {
          warningMessage =
            "ATENÇÃO! A quantidade de números a ser sorteada não pode ser maior que o intervalo definido.";
          presentWarning(warningMessage);
        }
      }
    } catch (error) {
      warningMessage =
        "Não foi possível realizar o sorteio. Tente novamente mais tarde.";

      presentWarning(warningMessage);
    }
  } else {
    switch (
      (numbersToSort && minimalNumber && maximumNumber) == "" ||
      minimalNumber > maximumNumber
    ) {
      case (numbersToSort && minimalNumber && maximumNumber) == "":
        warningMessage =
          "ATENÇÃO! Há campos em branco. Favor preencher corretamente.";

        presentWarning(warningMessage);
        break;

      case minimalNumber > maximumNumber:
        warningMessage =
          "ATENÇÃO! O número mínimo não pode ser maior que o número máximo";

        presentWarning(warningMessage);
        break;
    }
  }
});

sortAgain.addEventListener("click", () => {
  newSort();
  let numbersSorted = new Array(numbersToSort);
  let newNumber;

  if (canRepeat) {
    for (let i = 0; i < numbersSorted.length; i++) {
      numbersSorted[i] = generateNumber(minimalNumber, maximumNumber);
      newNumber = numbersSorted.at(i);
      sortNumber.textContent = `${counter}º RESULTADO`;
      createNumberElement(newNumber);
    }
  } else {
    for (let i = 0; i < numbersSorted.length; i++) {
      numbersSorted[i] = generateNonRepeatedNumber(
        minimalNumber,
        maximumNumber,
        numbersSorted,
      );
      newNumber = numbersSorted.at(i);
      sortNumber.textContent = `${counter}º RESULTADO`;
      createNumberElement(newNumber);
    }
  }
});

function generateNonRepeatedNumber(
  minimalNumber,
  maximumNumber,
  numbersSorted,
) {
  let min = Math.ceil(minimalNumber);
  let max = Math.floor(maximumNumber);
  let generatedNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  while (numbersSorted.includes(generatedNumber)) {
    generatedNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return generatedNumber;
}

function generateNumber(minimalNumber, maximumNumber) {
  let min = Math.ceil(minimalNumber);
  let max = Math.floor(maximumNumber);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createNumberElement(newNumber) {
  let result = document.createElement("div");
  result.classList.add("result");

  let square = document.createElement("div");
  square.classList.add("square");

  let numberSpan = document.createElement("span");
  numberSpan.classList.add("number");
  numberSpan.textContent = newNumber;

  results.append(result);
  result.append(square);
  result.append(numberSpan);
}

function presentWarning(warningMessage) {
  warning.classList.add("active");
  message.textContent = warningMessage;

  setTimeout(() => {
    warning.classList.remove("active");
  }, 5000);
}

function newSort() {
  results.innerHTML = "";
  counter++;
}
