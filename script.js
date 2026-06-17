const numberAmount = document.getElementById("number-amount");
const from = document.getElementById("from");
const to = document.getElementById("to");

const repeat = document.getElementById("back");

const sortButton = document.querySelector(".sort");
const sortAgain = document.querySelector(".again");

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
};

sortButton.addEventListener("click", () => {
  try {
    numbersToSort = Number(numberAmount.value);
    minimalNumber = Number(from.value);
    maximumNumber = Number(to.value);

    console.log(numbersToSort, minimalNumber, maximumNumber);

    let numbersSorted = new Array(numbersToSort);

    for (let i = 0; i < numbersSorted.length; i++) {
      numbersSorted[i] = generateNumber(minimalNumber, maximumNumber);
      console.log(numbersSorted);
    }
  } catch (error) {
    console.log("fodeu");
  }
});

function generateNumber(minimalNumber, maximumNumber) {
  minimalNumber = Math.ceil(minimalNumber);
  maximumNumber = Math.floor(maximumNumber);
  return (
    Math.floor(Math.random() * (maximumNumber - minimalNumber + 1)) +
    minimalNumber
  );
}
