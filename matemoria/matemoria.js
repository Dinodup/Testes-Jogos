// Listas de cartas para cada dificuldade
const cardValuesF = [
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

const cardValuesM = [
    { expression: '√16', solution: '4' },
    { expression: '4', solution: '√16' },
    { expression: '√64', solution: '8' },
    { expression: '8', solution: '√64' },
    { expression: '2⁵', solution: '32' },
    { expression: '32', solution: '2⁵' },
    { expression: '6²', solution: '36' },
    { expression: '36', solution: '6²' },
    { expression: '1.5', solution: '3/2' },
    { expression: '3/2', solution: '1.5' },
    { expression: '1/4', solution: '0.25' },
    { expression: '0.25', solution: '1/4' },
    { expression: '0-0.5', solution: '-0.5' },
    { expression: '-0.5', solution: '0-0.5' },
    { expression: '√25*0.5', solution: '2.5' },
    { expression: '2.5', solution: '√25*0.5' }
];

const cardValuesD = [
    { expression: '2³', solution: '16-8' },
    { expression: '16-8', solution: '2³' },
    { expression: '5²+2²', solution: '58/2' },
    { expression: '58/2', solution: '5²+2²' },
    { expression: '√49', solution: '2³-1' },
    { expression: '2³-1', solution: '√49' },
    { expression: '³√27', solution: '3' },
    { expression: '3', solution: '³√27' },
    { expression: '√9/3', solution: '2⁰' },
    { expression: '2⁰', solution: '√9/3' },
    { expression: '4²*2', solution: '√100' },
    { expression: '√100', solution: '4²*2' },
    { expression: '10*0', solution: '5¹-5' },
    { expression: '5¹-5', solution: '10*0' },
    { expression: '0.5', solution: '√0.25' },
    { expression: '√0.25', solution: '0.5' }

];

// Escolhe a lista com base na dificuldade selecionada no PHP
let selectedCardValues;
switch (selectedDifficulty) {
    case 'facil':
        selectedCardValues = cardValuesF;
        break;
    case 'medio':
        selectedCardValues = cardValuesM;
        break;
    case 'dificil':
        selectedCardValues = cardValuesD;
        break;
    default:
        selectedCardValues = cardValuesF; // Default para 'easy'
}

// Seleciona os elementos do DOM
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

// Função para iniciar o timer
function startTimer() {
    timer = setInterval(() => {
        timeElapsed++;
        timerDisplay.textContent = `Tempo: ${timeElapsed}s`;
    }, 1000);
}

// Para o timer
function stopTimer() {
    clearInterval(timer);
}

// Cria as cartas no grid
function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `<span>${value.expression}</span>`;
    card.dataset.solution = value.solution;
    card.addEventListener('click', flipCard);
    grid.appendChild(card);
}

// Função para virar a carta
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

// Verifica se as duas cartas formam um par
function checkMatch() {
    const firstValue = firstCard.dataset.solution;
    const secondValue = secondCard.innerText;

    if (firstValue === secondValue) {
        disableCards();
        matchesFound++;
        if (matchesFound === selectedCardValues.length / 2) {
            gameOver();
        }
    } else {
        unflipCards();
    }
}

// Desativa as cartas se formarem um par
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.classList.add('inactive');
    secondCard.classList.add('inactive');
    resetBoard();
}

// Desvira as cartas se não formarem um par
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

// Reseta as variáveis de controle
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Cálculo da pontuação -> 20s tempo para os 10 pontos, diminui a cada 10s no 'facil'
function gameOver() {
    stopTimer(); // Para o timer
    gameOverScreen.classList.remove('hidden'); // Exibe a tela de fim de jogo

    // Parâmetros baseados no nível de dificuldade
    let maxTime, penaltyInterval, maxScore, penaltyPoints;
    switch (selectedDifficulty) {
        case 'facil':
            maxTime = 20;
            penaltyInterval = 15;
            maxScore = 10;
            penaltyPoints = 1;
            break;
        case 'medio':
            maxTime = 20;
            penaltyInterval = 10;
            maxScore = 20;
            penaltyPoints = 2;
            break;
        case 'dificil':
            maxTime = 20;
            penaltyInterval = 5;
            maxScore = 30;
            penaltyPoints = 3;
            break;
        default:
            maxTime = 20; // Default para 'fácil'
            penaltyInterval = 15;
            maxScore = 10;
            penaltyPoints = 1;
            break;
    }

    // Cálculo da pontuação
    const finalScore = Math.max(
        0, 
        maxScore - Math.floor(Math.max(0, timeElapsed - maxTime) / penaltyInterval) * penaltyPoints
    );

    // Exibindo a pontuação final
    finalTimeDisplay.textContent = `${finalScore}`;
}



// Embaralha as cartas
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Inicia o jogo
function startGame() {
    shuffle(selectedCardValues);
    selectedCardValues.forEach(createCard);
    startTimer();
}

// Inicia o jogo automaticamente
document.addEventListener('DOMContentLoaded', startGame);
