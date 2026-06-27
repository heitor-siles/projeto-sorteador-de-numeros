let screenWidth = window.innerWidth;

const numberAmount = document.getElementById("number-amount");
const from = document.getElementById("from");
const to = document.getElementById("to");

const dinamicPrimary = document.getElementById("dinamic-primary");
const divPrimary = document.querySelector(".primary");
const divSecondary = document.querySelector(".secondary");
const holder = document.querySelector(".holder");

const repeat = document.getElementById("back");

const sortNumber = document.querySelector(".sortNumber");

const sortButton = document.querySelector(".sort");
const sortAgain = document.querySelector(".again");
const results = document.querySelector(".results");

const allInputs = document.querySelector("input");

const warning = document.querySelector(".warning");
const message = document.querySelector(".warning p");

let warningMessage;

let canRepeat = true;

let numbersToSort;
let minimalNumber;
let maximumNumber;

let counter = 1;

window.addEventListener("load", () => {
  screenWidth = window.innerWidth;
  if (screenWidth <= 1110) {
    dinamicPrimary.classList.add("inactive");
    holder.classList.add("active");
    holder.append(divPrimary);
    holder.append(divSecondary);
  } else {
    holder.classList.remove("active");
    dinamicPrimary.classList.remove("inactive");
    dinamicPrimary.append(divPrimary);
    dinamicPrimary.append(divSecondary);
  }
});

window.addEventListener("resize", () => {
  screenWidth = window.innerWidth;
  if (screenWidth <= 1110) {
    dinamicPrimary.classList.add("inactive");
    holder.classList.add("active");
    holder.append(divPrimary);
    holder.append(divSecondary);
  } else {
    holder.classList.remove("active");
    dinamicPrimary.classList.remove("inactive");
    dinamicPrimary.append(divPrimary);
    dinamicPrimary.append(divSecondary);
  }
});

document.getElementById("sortDefiner").addEventListener("submit", (e) => {
  e.preventDefault();
});

numberAmount.addEventListener("input", () => {
  numberAmount.value = numberAmount.value.replace(/\D/g, "");
  numbersToSort = numberAmount.value;
});

from.addEventListener("input", () => {
  from.value = from.value.replace(/\D/g, "");
  minimalNumber = from.value;
});

to.addEventListener("input", () => {
  to.value = to.value.replace(/\D/g, "");
  maximumNumber = to.value;
});

repeat.addEventListener("click", () => {
  repeat.classList.toggle("active");
  const isActive = repeat.classList.contains("active");
  repeat.setAttribute("aria-checked", isActive);
  canRepeat = !isActive;
});

sortButton.addEventListener("click", () => {
  numbersToSort = Number(numbersToSort);
  minimalNumber = Number(minimalNumber);
  maximumNumber = Number(maximumNumber);

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
        warningMessage = "Sorteio realizado com sucesso!";
        warning.classList.add("success");
        presentWarning(warningMessage);

        divPrimary.classList.toggle("inactive");
        divSecondary.classList.toggle("inactive");
      } else {
        if (
          numbersToSort <= maximumNumber + 1 - minimalNumber &&
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
          warningMessage = "Sorteio realizado com sucesso!";
          warning.classList.add("success");
          presentWarning(warningMessage);

          divPrimary.classList.toggle("inactive");
          divSecondary.classList.toggle("inactive");
        } else {
          warningMessage =
            "ATENÇÃO! A quantidade de números a ser sorteada não pode ser maior que o intervalo definido.";
          warning.classList.add("error");
          presentWarning(warningMessage, true);
        }
      }
    } catch (error) {
      warningMessage =
        "Não foi possível realizar o sorteio. Tente novamente mais tarde.";
      warning.classList.add("error");

      presentWarning(warningMessage, true);
    }
  } else {
    switch (
      (numbersToSort && minimalNumber && maximumNumber) == "" ||
      minimalNumber > maximumNumber
    ) {
      case (numbersToSort && minimalNumber && maximumNumber) == "":
        warningMessage =
          "ATENÇÃO! Há campos em branco. Favor preencher corretamente.";
        warning.classList.add("error");

        presentWarning(warningMessage, true);
        break;

      case minimalNumber > maximumNumber:
        warningMessage =
          "ATENÇÃO! O número mínimo não pode ser maior que o número máximo";
        warning.classList.add("error");

        presentWarning(warningMessage, true);

        break;
    }
  }
  setTimeout(() => {
    sortAgain.removeAttribute("disabled");
  }, 2000);
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

  warningMessage = "Sorteio realizado com sucesso!";
  warning.classList.add("success");
  presentWarning(warningMessage);
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

function presentWarning(warningMessage, isError = false) {
  warning.setAttribute("aria-live", isError ? "assertive" : "polite");
  warning.classList.add("active");
  message.textContent = warningMessage;

  setTimeout(() => {
    warning.classList.remove("active");
    warning.classList.remove("error");
    warning.classList.remove("success");
  }, 5000);
}

function newSort() {
  results.innerHTML = "";
  counter++;
}
