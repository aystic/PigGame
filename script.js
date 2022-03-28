"use strict";

//selecting elements
const player0El = document.querySelector(".player--0");
const player0GambleScoreEl = document.querySelector("#current--0");
const player0ScoreEl = document.querySelector("#score--0");
const player1El = document.querySelector(".player--1");
const player1GambleScoreEl = document.querySelector("#current--1");
const player1ScoreEl = document.querySelector("#score--1");
const dice = document.querySelector(".dice");
const btnNewGame = document.querySelector(".btn--new");
const btnRollDice = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnShowRules = document.querySelector(".btn--rules");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnModalClose = document.querySelector(".close-modal");

//setting up the rules modal
//opening the rules modal window
btnShowRules.addEventListener("click", showModal);

//closing the rules modal window

//1.using the close btn
btnModalClose.addEventListener("click", hideModal);
//2.by clicking on the overlay
overlay.addEventListener("click", hideModal);
//3.by pressing esc on keyboard
document.addEventListener("keydown", (event) => {
	if (!modal.classList.contains("hidden") && event.key === "Escape") {
		hideModal();
	}
});

//intializing the values
player0ScoreEl.textContent = 0;
player1ScoreEl.textContent = 0;
dice.classList.add("hidden");

//helper variables
let playerActive = 0;
let gambleScore = 0;

//adding event listeners to btns
btnNewGame.addEventListener("click", reset);
btnRollDice.addEventListener("click", rollTheDice);
btnHold.addEventListener("click", holdScore);

//functions
function rollTheDice() {
	if (dice.classList.contains("hidden")) {
		dice.classList.remove("hidden");
	}
	let diceValue = Math.trunc(Math.random() * 6 + 1);
	dice.setAttribute("src", `dice-${diceValue}.png`);
	if (diceValue != 1) {
		gambleScore += diceValue;
		if (playerActive === 0) {
			player0GambleScoreEl.textContent =
				Number(player0GambleScoreEl.textContent) + diceValue;
		} else {
			player1GambleScoreEl.textContent =
				Number(player1GambleScoreEl.textContent) + diceValue;
		}
	} else {
		gambleScore = 0;
		if (playerActive === 0) {
			player0GambleScoreEl.textContent = 0;
		} else {
			player1GambleScoreEl.textContent = 0;
		}
		playerSwitcher();
	}
}
function holdScore() {
	if (dice.classList.contains("hidden")) {
		dice.classList.remove("hidden");
	}
	let totalScore = 0;
	if (playerActive === 0) {
		totalScore = Number(
			(player0ScoreEl.textContent =
				Number(player0ScoreEl.textContent) + gambleScore)
		);
		player0GambleScoreEl.textContent = 0;
	} else {
		totalScore = Number(
			(player1ScoreEl.textContent =
				Number(player1ScoreEl.textContent) + gambleScore)
		);
		player1GambleScoreEl.textContent = 0;
	}
	gambleScore = 0;
	if (totalScore >= 100) {
		notifyWin(playerActive);
	} else {
		playerSwitcher();
	}
}

function playerSwitcher() {
	playerActive -= 1;
	playerActive *= -1;
	if (playerActive === 0) {
		player1El.classList.remove("player--active");
		player0El.classList.add("player--active");
	} else {
		player0El.classList.remove("player--active");
		player1El.classList.add("player--active");
	}
}

function notifyWin() {
	btnHold.removeEventListener("click", holdScore);
	btnRollDice.removeEventListener("click", rollTheDice);
	if (playerActive === 0) {
		player0El.classList.add("player--winner");
	} else {
		player1El.classList.add("player--winner");
	}
	dice.classList.add("hidden");
}

function reset() {
	dice.classList.add("hidden");
	//resetting winner
	if (player0El.classList.contains("player--winner")) {
		player0El.classList.remove("player--winner");
	} else {
		player1El.classList.remove("player--winner");
	}
	//resetting active player
	if (playerActive === 1) {
		player1El.classList.remove("player--active");
	}
	player0El.classList.add("player--active");
	player0ScoreEl.textContent =
		player0GambleScoreEl.textContent =
		player1ScoreEl.textContent =
		player1GambleScoreEl.textContent =
			0;
	playerActive = 0;
	gambleScore = 0;
	btnRollDice.addEventListener("click", rollTheDice);
	btnHold.addEventListener("click", holdScore);
}

function showModal() {
	modal.classList.remove("hidden");
	overlay.classList.remove("hidden");
}

function hideModal() {
	modal.classList.add("hidden");
	overlay.classList.add("hidden");
}
