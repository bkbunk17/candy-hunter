const playArea = document.getElementById('play-area');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

let score = 0;
let timeLeft = 30;

// Function to create a candy
function createCandy() {
  const candy = document.createElement('div');
  candy.classList.add('candy');
  candy.style.left = Math.random() * (playArea.clientWidth - 40) + 'px';
  candy.style.animationDuration = Math.random() * 3 + 2 + 's'; // 2-5 seconds fall time
  playArea.appendChild(candy);

  // Remove candy after it falls off the screen
  candy.addEventListener('animationend', () => {
    candy.remove();
  });

  // Increment score when candy is clicked
  candy.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    candy.remove();
  });
}

// Game timer
function startGame() {
  const candyInterval = setInterval(createCandy, 500); // Add a new candy every 500ms
  const timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(candyInterval);
      clearInterval(timerInterval);
      alert(`Game Over! Your score: ${score}`);
      playArea.innerHTML = ''; // Clear the play area
    }
  }, 1000);
}

// Start the game
startGame();
