"use strict";

// Selecting player elements
const playerElements = [
  document.querySelector(".player--0"),
  document.querySelector(".player--1"),
];

// Selecting score elements
const scoreElements = [
  document.getElementById("score--0"),
  document.getElementById("score--1"),
];

// Selecting current score elements
const currentElements = [
  document.getElementById("current--0"),
  document.getElementById("current--1"),
];

// Selecting dice and buttons
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Initialize game state variables
let scores, currentScore, activePlayer, playing;

// Function to initialize the game state
const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Resetting scores and current scores for both players
  for (let i = 0; i < scoreElements.length; i++) {
    scoreElements[i].textContent = currentScore;
    currentElements[i].textContent = currentScore;

    // Resetting player backgrounds
    playerElements[i].classList.remove(
      "bg-slate-100",
      "bg-slate-300",
      "bg-[#2f2f2f]",
    );
    playerElements[i].classList.add(i === 0 ? "bg-slate-100" : "bg-slate-300");
  }

  // Hide the dice
  diceEl.classList.add("invisible");
};

// Function to switch players
const switchPlayer = () => {
  currentScore = 0;
  currentElements[activePlayer].textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;

  // Toggle player backgrounds
  for (const el of playerElements) {
    el.classList.toggle("bg-slate-100");
    el.classList.toggle("bg-slate-300");
  }
};

// Event listener for rolling the dice
btnRoll.addEventListener("click", () => {
  if (playing) {
    // Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display the dice
    diceEl.classList.remove("invisible");
    diceEl.src = `dice-${dice}.png`;

    // Check for rolled 1
    if (dice !== 1) {
      // Add dice to current player's score
      currentScore += dice;
      currentElements[activePlayer].textContent = currentScore;
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

// Event listener for holding the current score
btnHold.addEventListener("click", () => {
  if (playing) {
    // Hold and display the current score
    scores[activePlayer] += currentScore;
    scoreElements[activePlayer].textContent = scores[activePlayer];

    // Check if the player has won
    if (scores[activePlayer] >= 100) {
      // Mark the winning player and end the game
      playerElements[activePlayer].classList.add("bg-[#2f2f2f]");
      diceEl.classList.add("invisible");
      playing = false;
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

// Event listener for starting a new game
btnNew.addEventListener("click", init);

// Initialize the game
init();
