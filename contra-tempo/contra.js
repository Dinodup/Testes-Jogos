let level = 1; // Nível inicial do jogo
let correctAnswer; // Variável que armazena a resposta correta da pergunta atual
let startTime; // Armazena o tempo inicial quando o jogo começa
let interval; // Variável para controlar o cronômetro

// Função para iniciar ou reiniciar o jogo
function startGame() {
    level = 1; // Redefine o nível para 1
    document.getElementById('level').innerText = level; // Atualiza o nível na tela
    startTime = new Date().getTime(); // Captura o momento em que o jogo começa
    startTimer(); // Inicia o cronômetro
    generateQuestion(); // Gera a primeira pergunta
    document.getElementById('result').innerText = ''; // Limpa a mensagem de resultado
}

// Função para gerar uma nova pergunta matemática
function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1; // Número aleatório de 1 a 10
    const num2 = Math.floor(Math.random() * 10) + 1; // Outro número aleatório de 1 a 10
    const operation = Math.random() > 0.5 ? '+' : '-'; // Escolhe aleatoriamente entre + e -

    correctAnswer = operation === '+' ? num1 + num2 : num1 - num2; // Calcula a resposta correta

    document.getElementById('question').innerText = `${num1} ${operation} ${num2}`; // Exibe a pergunta
    generateOptions(correctAnswer); // Gera as opções de resposta
}

// Função para gerar duas opções de resposta
function generateOptions(answer) {
    const wrongAnswer = answer + Math.floor(Math.random() * 5) + 1; // Gera uma resposta errada
    const options = [answer, wrongAnswer].sort(() => Math.random() - 0.5); // Embaralha as opções
    
    document.getElementById('option1').innerText = options[0]; // Exibe a primeira opção
    document.getElementById('option2').innerText = options[1]; // Exibe a segunda opção
}

// Função para verificar se a resposta selecionada está correta
function checkAnswer(selectedAnswer) {
    const resultElement = document.getElementById('result'); // Elemento onde o resultado será mostrado
    
    if (parseInt(selectedAnswer) === correctAnswer) { // Verifica se a resposta está correta
        resultElement.innerText = "Correto!"; // Exibe a mensagem de sucesso
        resultElement.classList.remove('fail'); // Remove a classe de falha
        resultElement.classList.add('success'); // Adiciona a classe de sucesso
        
        if (level < 10) { // Verifica se o jogador ainda não completou os 10 níveis
            level++; // Incrementa o nível
            document.getElementById('level').innerText = level; // Atualiza o nível na tela
            setTimeout(() => {
                resultElement.innerText = ''; // Limpa a mensagem de sucesso
                generateQuestion(); // Gera a próxima pergunta
            }, 1000); // Aguarda 1 segundo antes de exibir a próxima pergunta
        } else {
            clearInterval(interval); // Para o cronômetro
            const totalTime = Math.floor((new Date().getTime() - startTime) / 1000); // Calcula o tempo total
            resultElement.innerText = `Você completou os 10 níveis em ${totalTime} segundos!`; // Exibe a mensagem de conclusão
        }
    } else {
        resultElement.innerText = "Resposta errada, tente novamente!"; // Exibe a mensagem de erro
        resultElement.classList.remove('success'); // Remove a classe de sucesso
        resultElement.classList.add('fail'); // Adiciona a classe de falha
        clearInterval(interval); // Para o cronômetro
        setTimeout(() => {
            startGame(); // Reinicia o jogo após um erro
        }, 2000); // Aguarda 2 segundos antes de reiniciar o jogo
    }
}

// Função para iniciar o cronômetro
function startTimer() {
    clearInterval(interval); // Garante que o cronômetro seja reiniciado corretamente
    interval = setInterval(() => {
        const timeElapsed = Math.floor((new Date().getTime() - startTime) / 1000); // Calcula o tempo decorrido
        document.getElementById('timer').innerText = timeElapsed; // Exibe o tempo na tela
    }, 1000); // Atualiza o tempo a cada segundo
}

// Eventos de clique para os botões de resposta
document.getElementById('option1').addEventListener('click', function() {
    checkAnswer(this.innerText); // Verifica a resposta ao clicar no botão 1
});

document.getElementById('option2').addEventListener('click', function() {
    checkAnswer(this.innerText); // Verifica a resposta ao clicar no botão 2
});

// Inicia o jogo ao carregar a página
startGame();
