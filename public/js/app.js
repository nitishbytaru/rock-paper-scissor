//life counter
let counter = 4;

//Computer's move generator
const computerMoveArr = ["rock-computer", "paper-computer", "scissor-computer"];

//HTML Element Variables
const ELEMENTS = {
  resultBoard: document.querySelector(".text-area"),
  mainBody: document.querySelector(".main-container"),
};
let life1 = document.getElementById("life1");
let life2 = document.getElementById("life2");
let life3 = document.getElementById("life3");

//User Interactive Buttons
const BUTTON = {
  rock: document.getElementById("rock-button"),
  paper: document.getElementById("paper-button"),
  scissor: document.getElementById("scissor-button"),
};

//User Icons & computer icons
const ICONS = {
  PLAYER: {
    rock: document.querySelector(".rock-player"),
    paper: document.querySelector(".paper-player"),
    scissor: document.querySelector(".scissor-player"),
  },
  COMPUTER: {
    rock: document.querySelector(".rock-computer"),
    paper: document.querySelector(".paper-computer"),
    scissor: document.querySelector(".scissor-computer"),
  },
};

//icons array
const iconsArr = [
  ICONS.COMPUTER.rock,
  ICONS.COMPUTER.paper,
  ICONS.COMPUTER.scissor,
  ICONS.PLAYER.rock,
  ICONS.PLAYER.paper,
  ICONS.PLAYER.scissor,
];

//Event Listeners
BUTTON.rock.addEventListener("click", () => {
  buttonClicked(iconsArr, ICONS.PLAYER.rock);
});
BUTTON.paper.addEventListener("click", () => {
  buttonClicked(iconsArr, ICONS.PLAYER.paper);
});
BUTTON.scissor.addEventListener("click", () => {
  buttonClicked(iconsArr, ICONS.PLAYER.scissor);
});

//functions
function buttonClicked(arr, playerChoice) {
  let duplicateArr = [...arr];
  let indexTObeRemoved = duplicateArr.indexOf(playerChoice);
  duplicateArr.splice(indexTObeRemoved, 1);
  invisible(duplicateArr);
  visible(playerChoice);
  computerMove(playerChoice);
}

//Utility function to make element visible
function visible(element) {
  element.classList.add("visible");
  element.classList.remove("invisible");
}

//Utility function to make element invisible
function invisible(elements) {
  [...elements].forEach((element) => {
    element.classList.add("invisible");
  });
}

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
    draw(ELEMENTS.mainBody);
  } else if (playerChoice === "rock") {
    if (computerChoice === "paper") {
      computerWon(ELEMENTS.mainBody);
    } else if (computerChoice === "scissor") {
      playerWon(ELEMENTS.mainBody);
    }
  } else if (playerChoice === "paper") {
    if (computerChoice === "scissor") {
      computerWon(ELEMENTS.mainBody);
    } else if (computerChoice === "rock") {
      playerWon(ELEMENTS.mainBody);
    }
  } else if (playerChoice === "scissor") {
    if (computerChoice === "rock") {
      computerWon(ELEMENTS.mainBody);
    } else if (computerChoice === "paper") {
      playerWon(ELEMENTS.mainBody);
    }
  }
}

//Function for player winning
function playerWon(mainBody) {
  ELEMENTS.resultBoard.innerText = "Player Won";
  ELEMENTS.mainBody.classList.add("won");
  setTimeout((event) => {
    ELEMENTS.mainBody.classList.remove("won");
  }, 500);
}

//Function for computer winning
function computerWon(mainBody) {
  counter--;
  ELEMENTS.resultBoard.innerText = "Computer Won";
  if (counter == 3) {
    grey(life1);
  } else if (counter == 2) {
    grey(life2);
  } else if (counter == 1) {
    grey(life3);
    ELEMENTS.resultBoard.innerText = "Game over Restart again !!!";
  }
  ELEMENTS.mainBody.classList.add("lose");
  setTimeout((event) => {
    ELEMENTS.mainBody.classList.remove("lose");
  }, 500);
}

//Function if no-one win's
function draw(mainBody) {
  ELEMENTS.resultBoard.innerText = "Draw";
  ELEMENTS.mainBody.classList.add("draw");
  setTimeout((event) => {
    ELEMENTS.mainBody.classList.remove("draw");
  }, 500);
}

//function for losing chances
function grey(event) {
  event.classList.add("grey");
}

//GAME RESTART
function gameRestart() {
  ELEMENTS.resultBoard.innerText = "Start your game";
  life1.classList.remove("grey");
  life2.classList.remove("grey");
  life3.classList.remove("grey");
  counter = 4;
  invisible(
    ICONS.COMPUTER.rock,
    ICONS.COMPUTER.paper,
    ICONS.COMPUTER.scissor,
    ICONS.PLAYER.paper,
    ICONS.PLAYER.scissor,
    ICONS.PLAYER.rock
  );
}
