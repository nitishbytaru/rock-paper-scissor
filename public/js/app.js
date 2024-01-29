//life counter
let counter = 4;
let gameOver = false;
let score = 0;

//Computer's move generator
const computerMoveArr = ["rock-computer", "paper-computer", "scissor-computer"];

//HTML Element Variables
const ELEMENTS = {
  resultBoard: document.querySelector(".text-area"),
  mainBody: document.querySelector(".container"),
  life1: document.getElementById("life1"),
  life2: document.getElementById("life2"),
  life3: document.getElementById("life3"),
  liveScore: document.getElementById("liveScore"),
  gameOverBanner: document.getElementById("gameOverBanner"),
};

//User Interactive Buttons
const BUTTON = {
  rock: document.getElementById("rock-button"),
  paper: document.getElementById("paper-button"),
  scissor: document.getElementById("scissor-button"),
  restartButton: document.getElementById("restartButton"),
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
BUTTON.restartButton.addEventListener("click", () => {
  restartGame(iconsArr);
});

//functions
function restartGame(arr) {
  let duplicateArr = [...arr];
  counter = 4;
  gameOver = false;
  score = 0;
  ELEMENTS.mainBody.style.pointerEvents = "auto";
  ELEMENTS.gameOverBanner.style.visibility = "hidden";
  removeGrey(ELEMENTS.life1, ELEMENTS.life2, ELEMENTS.life3);
  ELEMENTS.resultBoard.innerText = "Start your Game";
  ELEMENTS.liveScore.innerText = `${score}`;
  invisible(duplicateArr);
}

function buttonClicked(arr, playerChoice) {
  if (gameOver === false) {
    let duplicateArr = [...arr];
    let indexTObeRemoved = duplicateArr.indexOf(playerChoice);
    duplicateArr.splice(indexTObeRemoved, 1);
    invisible(duplicateArr);
    visible(playerChoice);
    computerMove(playerChoice);
  }
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
  score++;
  ELEMENTS.liveScore.innerText = `${score}`;
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
    grey(ELEMENTS.life1);
  } else if (counter == 2) {
    grey(ELEMENTS.life2);
  } else if (counter == 1) {
    grey(ELEMENTS.life3);
    ELEMENTS.resultBoard.innerText = "Game over Restart again !!!";
    gameOver = true;
    sendToServer(score);
    ELEMENTS.mainBody.style.pointerEvents = "none";
    ELEMENTS.gameOverBanner.style.transform = "scale(2)";
    ELEMENTS.gameOverBanner.style.visibility = "visible";
  }
  ELEMENTS.mainBody.classList.add("lose");
  setTimeout((event) => {
    ELEMENTS.mainBody.classList.remove("lose");
  }, 500);
}

//Function if no-one win's
async function sendToServer(highscore) {
  try {
    const response = await fetch("/game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({highscore}),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

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

function removeGrey(...elements) {
  elements.forEach((element) => {
    element.classList.remove("grey");
  });
}

//GAME RESTART
function gameRestart() {
  ELEMENTS.resultBoard.innerText = "Start your game";
  ELEMENTS.life1.classList.remove("grey");
  ELEMENTS.life2.classList.remove("grey");
  ELEMENTS.life3.classList.remove("grey");
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
