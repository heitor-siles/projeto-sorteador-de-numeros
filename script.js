const asidePrimary = document.querySelector(".primary");
const asideSecondary = document.querySelector(".secondary");

const numberAmount = document.getElementById("number-amount");
const from = document.getElementById("from");
const to = document.getElementById("to");

const repeat = document.getElementById("back");

const sortButton = document.querySelector(".sort");
const sortAgain = document.querySelector(".again");
const results = document.querySelector(".results");

let canRepeat = true;

let numbersToSort;
let minimalNumber;
let maximumNumber;

repeat.onclick = function () {
  repeat.classList.toggle("active");

  if (repeat.classList.contains("active")) {
    canRepeat = false;
  } else {
    canRepeat = true;
  }

  console.log(canRepeat);
};

sortButton.addEventListener("click", () => {
  numbersToSort = Number(numberAmount.value);
  minimalNumber = Number(from.value);
  maximumNumber = Number(to.value);

  if (
    numbersToSort <= maximumNumber - minimalNumber &&
    maximumNumber > minimalNumber
  ) {
    try {
      let numbersSorted = new Array(numbersToSort);
      let newNumber;

      for (let i = 0; i < numbersSorted.length; i++) {
        if (canRepeat) {
          numbersSorted[i] = generateNumber(minimalNumber, maximumNumber);
          newNumber = numbersSorted.at(i);
        } else {
          numbersSorted[i] = generateNonRepeatedNumber(
            minimalNumber,
            maximumNumber,
            numbersSorted,
          );
          newNumber = numbersSorted.at(i);
        }

        createNumberElement(newNumber);
      }

      asidePrimary.classList.toggle("inactive");
      asideSecondary.classList.toggle("inactive");
    } catch (error) {
      console.log(
        "Não foi possível gerar o sorteio. Tente novamente mais tarde!",
      );
    }
  } else {
    console.log(
      "A quantidade de números a ser sorteada é maior que o intervalor definido.",
    );
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

function restart() {}
