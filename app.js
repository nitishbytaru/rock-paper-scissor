//life counter
let counter = 4;
let startGame = false;

let restartButton = document.querySelector(".restart-button");

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
  if (startGame === false) {
    computerInvisible(rockComputer, paperComputer, scissorsComputer);
    visible(rockPlayer);
    invisible(paperPlayer, scissorsPlayer);
    computerMove(rockPlayer);
  }
});
paperButton.addEventListener("click", (event) => {
  if (startGame === false) {
    computerInvisible(rockComputer, paperComputer, scissorsComputer);
    visible(paperPlayer);
    invisible(rockPlayer, scissorsPlayer);
    computerMove(paperPlayer);
  }
});
scissorsButton.addEventListener("click", (event) => {
  if (startGame === false) {
    computerInvisible(rockComputer, paperComputer, scissorsComputer);
    visible(scissorsPlayer);
    invisible(rockPlayer, paperPlayer);
    computerMove(scissorsPlayer);
  }
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
  setTimeout((event) => {
    mainBody.classList.remove("won");
  }, 500);
}

function gameRestart() {
  resultBoard.innerText = "Start your game";
  startGame = false;
  life1.classList.remove("grey");
  life2.classList.remove("grey");
  life3.classList.remove("grey");
  counter = 4;
}

restartButton.addEventListener("click", () => {
  gameRestart();
  restartButton.style.display = "none";
});

function computerWon(mainBody) {
  counter--;
  resultBoard.innerText = "Computer Won";
  if (counter == 3) {
    grey(life1);
  } else if (counter == 2) {
    grey(life2);
  } else if (counter == 1) {
    grey(life3);
    resultBoard.innerText = "Game over Restart again !!!";
    startGame = true;
    restartButton.style.display = "block";
  }
  mainBody.classList.add("lose");
  setTimeout((event) => {
    mainBody.classList.remove("lose");
  }, 500);
}
function draw(mainBody) {
  resultBoard.innerText = "Draw";
  mainBody.classList.add("draw");
  setTimeout((event) => {
    mainBody.classList.remove("draw");
  }, 500);
}

//lifes
let life1 = document.getElementById("life1");
let life2 = document.getElementById("life2");
let life3 = document.getElementById("life3");

function grey(event) {
  event.classList.add("grey");
}
