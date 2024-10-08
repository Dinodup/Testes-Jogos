const cardValues = [
    { expression: '13', solution: '5+8' },
    { expression: '5+8', solution: '13' },
    { expression: '0', solution: '9*0' },
    { expression: '9*0', solution: '0' },
    { expression: '3', solution: '21/7' },
    { expression: '21/7', solution: '3' },
    { expression: '21', solution: '7*3' },
    { expression: '7*3', solution: '21' },
    { expression: '-12', solution: '6-18' },
    { expression: '6-18', solution: '-12' },
    { expression: '12', solution: '24/2' },
    { expression: '24/2', solution: '12' },
    { expression: '0.5', solution: '1/2' },
    { expression: '1/2', solution: '0.5' },
    { expression: '15', solution: '8+7' },
    { expression: '8+7', solution: '15' }
];

const grid = document.querySelector('.grid');
const timerDisplay = document.getElementById('timer');
const gameOverScreen = document.getElementById('game-over');
const finalTimeDisplay = document.getElementById('final-time');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchesFound = 0;
let timer;
let timeElapsed = 0;

function startTimer() {
    timer = setInterval(() => {
        timeElapsed++;
        timerDisplay.textContent = `Tempo: ${timeElapsed}s`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `<span>${value.expression}</span>`;
    card.dataset.solution = value.solution;
    card.addEventListener('click', flipCard);
    grid.appendChild(card);
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkMatch();
}

function checkMatch() {
    const firstValue = firstCard.dataset.solution;
    const secondValue = secondCard.innerText;

    if (firstValue === secondValue) {
        disableCards();
        matchesFound++;
        if (matchesFound === 8) {
            gameOver();
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    firstCard.classList.add('inactive');
    secondCard.classList.add('inactive');

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function gameOver() {
    stopTimer();
    gameOverScreen.classList.remove('hidden');
    finalTimeDisplay.textContent = timeElapsed * 3;
}

// Embaralha as cartas antes de renderizar
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function restartGame() {
    grid.innerHTML = '';
    matchesFound = 0;
    timeElapsed = 0;
    timerDisplay.textContent = 'Tempo: 0s';
    gameOverScreen.classList.add('hidden');
    shuffle(cardValues);
    cardValues.forEach(value => createCard(value));
    stopTimer();
    startTimer();
}

document.getElementById('restart-btn').addEventListener('click', restartGame);
document.getElementById('back-btn').addEventListener('click', () => window.history.back());

shuffle(cardValues);
cardValues.forEach(value => createCard(value));
startTimer();
