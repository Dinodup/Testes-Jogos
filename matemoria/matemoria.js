// Lista de valores das cartas (expressões e suas soluções correspondentes)
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

// Seleciona os elementos do DOM
const grid = document.querySelector('.grid');
const timerDisplay = document.getElementById('timer');
const gameOverScreen = document.getElementById('game-over');
const finalTimeDisplay = document.getElementById('final-time');

let firstCard = null; // Primeira carta clicada
let secondCard = null; // Segunda carta clicada
let lockBoard = false; // Bloqueia o tabuleiro temporariamente para impedir múltiplos cliques
let matchesFound = 0; // Contador de pares encontrados
let timer; // Timer para medir o tempo de jogo
let timeElapsed = 0; // Tempo decorrido

// Inicia o timer para contar o tempo de jogo
function startTimer() {
    timer = setInterval(() => {
        timeElapsed++;
        timerDisplay.textContent = `Tempo: ${timeElapsed}s`;
    }, 1000);
}

// Para o timer ao final do jogo
function stopTimer() {
    clearInterval(timer);
}

// Cria as cartas e adiciona ao grid
function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `<span>${value.expression}</span>`; // Exibe a expressão no span da carta
    card.dataset.solution = value.solution; // Armazena a solução da carta
    card.addEventListener('click', flipCard); // Adiciona o evento de clique para virar a carta
    grid.appendChild(card); // Adiciona a carta ao grid
}

// Função para virar a carta ao clicar
function flipCard() {
    if (lockBoard) return; // Evita cliques durante a verificação de cartas
    if (this === firstCard) return; // Impede que a mesma carta seja clicada duas vezes

    this.classList.add('flip'); // Adiciona a classe 'flip' para girar a carta

    if (!firstCard) {
        firstCard = this; // Define a primeira carta clicada
        return;
    }

    secondCard = this; // Define a segunda carta clicada
    checkMatch(); // Verifica se as duas cartas são um par
}

// Verifica se as duas cartas formam um par
function checkMatch() {
    const firstValue = firstCard.dataset.solution; // Solução da primeira carta
    const secondValue = secondCard.innerText; // Expressão da segunda carta

    if (firstValue === secondValue) {
        disableCards(); // Se forem iguais, desativa as cartas
        matchesFound++; // Incrementa o contador de pares
        if (matchesFound === 8) {
            gameOver(); // Se todos os pares forem encontrados, o jogo termina
        }
    } else {
        unflipCards(); // Se não forem iguais, as cartas são desviradas
    }
}

// Desativa as cartas quando um par é encontrado
function disableCards() {
    firstCard.removeEventListener('click', flipCard); // Remove o evento de clique
    secondCard.removeEventListener('click', flipCard); // Remove o evento de clique
    firstCard.classList.add('inactive'); // Torna as cartas inativas
    secondCard.classList.add('inactive');
    resetBoard(); // Reseta as variáveis de controle
}

// Desvira as cartas se não formarem um par
function unflipCards() {
    lockBoard = true; // Bloqueia o tabuleiro temporariamente

    setTimeout(() => {
        firstCard.classList.remove('flip'); // Remove a classe 'flip' para desvirar
        secondCard.classList.remove('flip');
        resetBoard(); // Reseta as variáveis de controle
    }, 1000);
}

// Reseta o estado das variáveis de controle
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Função para finalizar o jogo
function gameOver() {
    stopTimer(); // Para o timer
    gameOverScreen.classList.remove('hidden'); // Exibe a tela de fim de jogo
    finalTimeDisplay.textContent = timeElapsed * 3; // Calcula e exibe a pontuação
}

// Embaralha as cartas antes de renderizar
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Troca as posições das cartas
    }
}

// Reinicia o jogo
function restartGame() {
    grid.innerHTML = ''; // Limpa o grid
    matchesFound = 0; // Reseta o número de pares encontrados
    timeElapsed = 0; // Reseta o tempo
    timerDisplay.textContent = 'Tempo: 0s'; // Reseta o display do timer
    gameOverScreen.classList.add('hidden'); // Esconde a tela de game over
    stopTimer(); // Reseta o timer

    shuffle(cardValues); // Embaralha as cartas
    cardValues.forEach(createCard); // Recria as cartas
    startTimer(); // Reinicia o timer
}

// Inicializa o jogo embaralhando e criando as cartas
shuffle(cardValues);
cardValues.forEach(createCard);
startTimer();