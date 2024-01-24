//HTML Element Variables
let restartButton = document.querySelector(".restart-button");
let mainBody = document.querySelector(".main-container");
let life1 = document.getElementById("life1");
let life2 = document.getElementById("life2");
let life3 = document.getElementById("life3");
let resultBoard = document.querySelector(".result");

//User Interactive Buttons
let rockButton = document.querySelector(".rock-button");
let paperButton = document.querySelector(".paper-button");
let scissorsButton = document.querySelector(".scissors-button");

//User Icons
let rockPlayer = document.querySelector(".player-rock");
let paperPlayer = document.querySelector(".player-paper");
let scissorsPlayer = document.querySelector(".player-scissors");

//Computer Icons
let rockComputer = document.querySelector(".computer-rock");
let paperComputer = document.querySelector(".computer-paper");
let scissorsComputer = document.querySelector(".computer-scissors");

//Event Listeners
rockButton.addEventListener("click", (event) => {
  if (startGame === false) {
    invisible(
      rockComputer,
      paperComputer,
      scissorsComputer,
      paperPlayer,
      scissorsPlayer
    );
    visible(rockPlayer);
    computerMove(rockPlayer);
  }
});
paperButton.addEventListener("click", (event) => {
  if (startGame === false) {
    invisible(
      rockComputer,
      paperComputer,
      scissorsComputer,
      rockPlayer,
      scissorsPlayer
    );
    visible(paperPlayer);
    computerMove(paperPlayer);
  }
});
scissorsButton.addEventListener("click", (event) => {
  if (startGame === false) {
    invisible(
      rockComputer,
      paperComputer,
      scissorsComputer,
      rockPlayer,
      paperPlayer
    );
    visible(scissorsPlayer);
    computerMove(scissorsPlayer);
  }
});
restartButton.addEventListener("click", () => {
  gameRestart();
  restartButton.style.display = "none";
});

//Utility function to make element visible
function visible(element) {
  element.classList.add("visible");
}
//Utility function to make element invisible
function invisible(...elements) {
  elements.forEach((element) => {
    element.classList.remove("visible");
  });
}

//Computer's move generator
let computerMoveArr = ["computer-rock", "computer-paper", "computer-scissors"];

//function for computer's move generator
function computerMove(playerChoice) {
  let computerChoice = document.querySelector(
    `.${computerMoveArr[Math.floor(Math.random() * 3)]}`
  );
  visible(computerChoice);
  gameResult(playerChoice.id, computerChoice.id);
}

//function for checking the game result
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

//Function for player winning
function playerWon(mainBody) {
  resultBoard.innerText = "Player Won";
  mainBody.classList.add("won");
  setTimeout((event) => {
    mainBody.classList.remove("won");
  }, 500);
}

//Function for computer winning
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

//Function if no-one win's
function draw(mainBody) {
  resultBoard.innerText = "Draw";
  mainBody.classList.add("draw");
  setTimeout((event) => {
    mainBody.classList.remove("draw");
  }, 500);
}

//life counter
let counter = 4;
let startGame = false;

//function for losing chances
function grey(event) {
  event.classList.add("grey");
}

//GAME RESTART
function gameRestart() {
  resultBoard.innerText = "Start your game";
  startGame = false;
  life1.classList.remove("grey");
  life2.classList.remove("grey");
  life3.classList.remove("grey");
  counter = 4;
  invisible(
    rockComputer,
    paperComputer,
    scissorsComputer,
    paperPlayer,
    scissorsPlayer,
    rockPlayer
  );
}
