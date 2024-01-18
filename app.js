//button elements
let rockButton = document.querySelector(".rock-button");
let paperButton = document.querySelector(".paper-button");
let scissorsButton = document.querySelector(".scissors-button");

//player elements
let rockPlayer = document.querySelector(".player-rock");
let paperPlayer = document.querySelector(".player-paper");
let scissorsPlayer = document.querySelector(".player-scissors");

//computer elements
let rockComputer = document.querySelector(".computer-rock");
let paperComputer = document.querySelector(".computer-paper");
let scissorsComputer = document.querySelector(".computer-scissors");

function visible(element) {
  element.classList.add("visible");
}
function invisible(element1, element2) {
  element1.classList.remove("visible");
  element2.classList.remove("visible");
}
function computerInvisible(element1, element2, element3) {
  element1.classList.remove("visible");
  element2.classList.remove("visible");
  element3.classList.remove("visible");
}

rockButton.addEventListener("click", (event) => {
  computerInvisible(rockComputer, paperComputer, scissorsComputer);
  visible(rockPlayer);
  invisible(paperPlayer, scissorsPlayer);
  computerMove(rockPlayer);
});
paperButton.addEventListener("click", (event) => {
  computerInvisible(rockComputer, paperComputer, scissorsComputer);
  visible(paperPlayer);
  invisible(rockPlayer, scissorsPlayer);
  computerMove(paperPlayer);
});
scissorsButton.addEventListener("click", (event) => {
  computerInvisible(rockComputer, paperComputer, scissorsComputer);
  visible(scissorsPlayer);
  invisible(rockPlayer, paperPlayer);
  computerMove(scissorsPlayer);
});

// computer logic
let computerMoveArr = ["computer-rock", "computer-paper", "computer-scissors"];

//computer's move generator
function computerMove(playerChoice) {
  let computerChoice = document.querySelector(
    `.${computerMoveArr[Math.floor(Math.random() * 3)]}`
  );
  visible(computerChoice);
  gameResult(playerChoice.id, computerChoice.id);
}

//checking winner
function gameResult(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    draw(mainBody);
  } else if (playerChoice === "rock") {
    if (computerChoice === "paper") {
      computerWon(mainBody);
    } else if (computerChoice === "scissors") {
      playerWon(mainBody);
    }
  } else if (playerChoice === "paper") {
    if (computerChoice === "scissors") {
      computerWon(mainBody);
    } else if (computerChoice === "rock") {
      playerWon(mainBody);
    }
  } else if (playerChoice === "scissors") {
    if (computerChoice === "rock") {
      computerWon(mainBody);
    } else if (computerChoice === "paper") {
      playerWon(mainBody);
    }
  }
}

//winning or loseing effects
let mainBody = document.querySelector(".main-container");

// player winnig
let resultBoard = document.querySelector(".result");

function playerWon(mainBody) {
  resultBoard.innerText = "Player Won";
  mainBody.classList.add("won");
  setTimeout(() => {
    mainBody.classList.remove("won");
  }, 500);
}
function computerWon(mainBody) {
  resultBoard.innerText = "Computer Won";
  mainBody.classList.add("lose");
  setTimeout(() => {
    mainBody.classList.remove("lose");
  }, 500);
}
function draw(mainBody) {
  resultBoard.innerText = "Draw";
  mainBody.classList.add("draw");
  setTimeout(() => {
    mainBody.classList.remove("draw");
  }, 500);
}
