// Select DOM elements
const playArea = document.getElementById('play-area');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const candyBag = document.getElementById('candy-bag');

// Initialize game variables
let score = 0;
let timeLeft = 30;
let gameInterval;
let candyInterval;

// Update candy bag position to follow the mouse
document.addEventListener('mousemove', (e) => {
  candyBag.style.left = `${e.pageX - 25}px`; // Center the candy bag
  candyBag.style.top = `${e.pageY - 25}px`;

  // Add wiggle animation when the mouse moves
  candyBag.style.animation = 'wiggle 0.3s ease';

  // Remove animation after a short delay to prevent stacking
  setTimeout(() => {
    candyBag.style.animation = 'none';
  }, 300);
});

// Start game
function startGame() {
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = `Score: ${score}`;
  timerDisplay.textContent = `Time Left: ${timeLeft}s`;

  // Start spawning candies
  candyInterval = setInterval(spawnCandy, 1000);

  // Start timer countdown
  gameInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

// Spawn a candy
function spawnCandy() {
  const candy = document.createElement('div');
  candy.className = 'candy';

  // Randomize candy position
  candy.style.left = `${Math.random() * (playArea.offsetWidth - 40)}px`;

  // Set animation duration (falling speed)
  candy.style.animationDuration = `${Math.random() * 3 + 2}s`;

  // Add click event to catch the candy
  candy.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    candy.remove(); // Remove candy when clicked
  });

  // Remove candy after it falls out of view
  candy.addEventListener('animationend', () => {
    candy.remove();
  });

  // Add candy to play area
  playArea.appendChild(candy);
}

// End game
function endGame() {
  clearInterval(gameInterval);
  clearInterval(candyInterval);
  alert(`Time's up! Your final score is ${score}`);
}

// Start the game when the page loads
window.onload = startGame;
