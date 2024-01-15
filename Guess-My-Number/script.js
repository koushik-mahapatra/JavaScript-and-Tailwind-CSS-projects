'use strict';

// Selecting DOM elements
const againBtn = document.querySelector('.again');
const correctNumber = document.querySelector('.number');
const checkBtn = document.querySelector('.check');
const message = document.querySelector('.message');
const displayScore = document.querySelector('.score');
const displayHighScore = document.querySelector('.highscore');

// Function to generate a random number between 1 and 20
const generateNumber = () => {
  return Math.floor(Math.random() * 20) + 1;
};

// Initial values
let secretNumber = generateNumber();
let score = 20;
let highscore = 0;
let gameActive = true; // Variable to track game state

// Function to display a message on the screen
const displayMessage = (messageStr) => {
  message.textContent = messageStr;
};

// Logging the secretNumber to the console for debugging
console.log(secretNumber);

// Event listener for the 'Check' button
checkBtn.addEventListener('click', () => {
  // Checking if the game is still active
  if (!gameActive) {
    return; // Do nothing if the game is not active
  }

  // Getting the guessed number from the input field
  const guessedNumber = Number(document.querySelector('.guess').value);

  // Checking if the user input is a valid number
  if (!guessedNumber) {
    displayMessage('⛔ No Number!');
  } else if (guessedNumber === secretNumber) {
    // When the player wins the game
    gameActive = false; // Disabling the game
    displayMessage('🎉 Correct Number!');
    document.querySelector('body').style.backgroundColor = '#60b347';
    correctNumber.textContent = secretNumber;
    correctNumber.style.width = '20rem';

    // Updating the highscore if the current score is higher
    if (score > highscore) {
      highscore = score;
      displayHighScore.textContent = highscore;
    }
  } else if (guessedNumber !== secretNumber) {
    // When the guessed number is incorrect
    if (score > 1) {
      // Decrementing the score and providing hints
      score--;
      displayScore.textContent = score;
      displayMessage(
        guessedNumber > secretNumber ? '📈 Too High!' : '📉 Too Low!',
      );
    } else {
      // When the player loses the game
      gameActive = false; // Disabling the game
      displayMessage('💥 You lost the game!');
      displayScore.textContent = 0;
    }
  }

  // Disabling the Check button after the game ends
  if (!gameActive) {
    checkBtn.disabled = true;
  }
});

// Event listener for the 'Again!' button
againBtn.addEventListener('click', () => {
  // Resetting the game state
  gameActive = true;
  checkBtn.disabled = false; // Enabling the Check button
  score = 20;
  displayScore.textContent = score;
  displayMessage('Start guessing...');
  secretNumber = generateNumber();
  document.querySelector('body').style.backgroundColor = 'black';
  correctNumber.style.width = 'auto';
  console.log(secretNumber);
  document.querySelector('.guess').value = '';
  correctNumber.textContent = '?';
});
