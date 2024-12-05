<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Planamente Espacial</title>
    <style>
        body {
            background-color: #1a1b3a;
            color: white;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column; /* Alinhar os elementos na vertical */
            justify-content: flex-start; /* Manter os elementos no topo */
            align-items: center; /* Centralizar horizontalmente */
            min-height: 100vh; /* Garantir que preencha a tela */
        }

        .controls {
            width: 100%;
            max-width: 910px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding: 10px;
            border-radius: 10px;
        }

        .controls button {
            background-color: #6c2d91;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
        }

        .controls button:hover {
            background-color: #4d2d61;
        }

        .controls #timer {
            font-size: 1rem;
            color: #fff;
        }

        .container {
            background-color: #25264d;
            width: 80%;
            max-width: 900px;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
        }

        h1 {
            text-align: center;
            margin-bottom: 20px;
            margin-top: 100px;
        }

        .inputs {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }

        .input-box {
            width: 45%;
            height: 80px;
            background-color: #4f3b71;
            border: none;
            border-radius: 10px;
            color: white;
            font-size: 16px;
            padding: 10px;
            resize: none;
        }

        .input-section {
            display: flex;
            align-items: center;
            gap: 10px;
            background-color: #4f3b71;
            padding: 10px;
            border-radius: 10px;
        }

        input {
            flex-grow: 1;
            padding: 10px;
            border-radius: 5px;
            border: none;
            background-color: #7d63a3;
            color: white;
            font-size: 1.2rem;
        }

        .submit-btn {
            background-color: #7d63a3;
            border: none;
            width: 40px;
            height: 40px;
            font-size: 1.5rem;
            border-radius: 5px;
            cursor: pointer;
        }

        .submit-btn:hover {
            background-color: #a389d4;
        }

        textarea {
            width: 100%;
            height: 80px;
            background-color: #8c52d1;
            border: none;
            border-radius: 10px;
            color: white;
            font-size: 16px;
            padding: 10px;
            resize: none;
        }

        .result-area {
            margin-top: 20px;
        }

        ::-webkit-input-placeholder {
            color: white;
        }

        .result-text {
            width: 100%;
            height: 50px;
            background-color: #8c52d1;
            border: none;
            border-radius: 10px;
            color: white;
            font-size: 18px;
            padding: 10px;
            resize: none;
        }

        .imagem {
            text-align: center;
            margin: 20px 0;
        }

        .imagem img {
            max-width: 30%;
            height: auto;
            border-radius: 10px;
        }

        .hidden {
        display: none;
    }
    </style>
</head>
<body>
    <h1>Planamente Espacial</h1>
    <div class="controls">
        <button onclick="reiniciarJogo()">Reiniciar Jogo</button>
        <button onclick="voltarPagina()">Voltar</button>
        <p id="timer">Tempo: 0s</p>
    </div>

    <div class="container">
        <div class="inputs">
            <div class="input-box">
                <label for="formula">Fórmula:</label>
                <div id="formula" readonly>Digite nessa área aqui</div>
            </div>

            <div class="input-box">
                <label for="dados">Dados:</label>
                <div id="dados" readonly>Digite nessa área aqui</div>
            </div>
        </div>
        <div class="imagem">
            <img id="imagem-solido" src="" alt="Imagem do sólido">
        </div>
        <div class="input-section">
            <label for="response-input">R:</label>
            <input type="text" id="resultado" placeholder="Digite aqui...">
            <button class="submit-btn" id="submit-btn">✔</button>
        </div>
    </div>

    <div id="game-over" class="hidden">
        <h2>Parabéns! Você ganhou <span id="final-time"></span> pontos.</h2>
    </div>

    <script>
    // Array de perguntas
    const perguntas = [
        {
            solido: "Cubo",
            formula: {
                volume: "V = a³",
                area: "A = 6a²",
            },
            dados: "Aresta (a) = 5",
            imagem: "http://localhost/Testes-Jogos/cubo/imagens/cubo.png",
            resposta: 125 // Resposta correta
        },
        {
            solido: "Esfera",
            formula: {
                volume: "V = (4/3)πr³",
                area: "A = 4πr²",
            },
            dados: "Raio (r) = 3",
            imagem: "http://localhost/Testes-Jogos/cubo/imagens/esfera.png",
            resposta: (4 * Math.PI * Math.pow(3, 2)).toFixed(2) // Resposta correta
        },
        {
            solido: "Cilindro",
            formula: {
                volume: "V = πr²h",
                area: "A = 2πr(r + h)",
            },
            dados: "Raio (r) = 2, Altura (h) = 5",
            imagem: "http://localhost/Testes-Jogos/cubo/imagens/cilindro.png",
            resposta: (Math.PI * Math.pow(2, 2) * 5).toFixed(2) // Resposta correta
        }
    ];

    // Elementos HTML
    const formulaDiv = document.getElementById('formula');
    const dadosDiv = document.getElementById('dados');
    const resultadoInput = document.getElementById('resultado');
    const imagemSolido = document.getElementById('imagem-solido');
    const timerDisplay = document.getElementById('timer');
    const gameOverScreen = document.getElementById('game-over');
    const finalTimeDisplay = document.getElementById('final-time');

    let timer; // Referência do cronômetro
    let timeElapsed = 0; // Tempo decorrido
    let perguntaAtual; // Armazena a pergunta atual

    // Função para iniciar o timer
    function startTimer() {
        timeElapsed = 0; // Zera o tempo
        timer = setInterval(() => {
            timeElapsed++;
            timerDisplay.textContent = `Tempo: ${timeElapsed}s`;
        }, 1000);
    }

    // Função para parar o timer
    function stopTimer() {
        clearInterval(timer);
    }

    // Carregar uma pergunta
    function carregarPergunta() {
        const index = Math.floor(Math.random() * perguntas.length);
        perguntaAtual = perguntas[index]; // Salva a pergunta atual

        // Atualizar o HTML
        formulaDiv.innerHTML = `
            <strong>${perguntaAtual.solido}</strong><br>
            Volume: ${perguntaAtual.formula.volume}<br>
            Área: ${perguntaAtual.formula.area}
        `;
        dadosDiv.innerText = perguntaAtual.dados;
        imagemSolido.src = perguntaAtual.imagem;

        // Limpar input de resposta
        resultadoInput.value = "";

        // Ocultar mensagem de game over
        gameOverScreen.classList.add("hidden");

        // Reiniciar o cronômetro
        stopTimer();
        startTimer();
    }

    // Verificar a resposta
    document.getElementById('submit-btn').addEventListener('click', () => {
        const respostaUsuario = parseFloat(resultadoInput.value);
        const respostaCorreta = parseFloat(perguntaAtual.resposta);

        if (respostaUsuario === respostaCorreta) {
            stopTimer(); // Para o cronômetro
            const pontos = Math.max(30 - timeElapsed, 0); // Cálculo da pontuação

            // Exibir mensagem de sucesso com a pontuação
            finalTimeDisplay.textContent = pontos; 
            gameOverScreen.classList.remove("hidden"); // Exibe o elemento

            setTimeout(carregarPergunta, 3000); // Carrega próxima pergunta após 3 segundos
        } else {
            alert("Resposta incorreta. Tente novamente.");
        }
    });

    // Função para reiniciar o jogo
    function reiniciarJogo() {
        window.location.reload(); // Recarrega a página
    }

    // Função para voltar à página inicial
    function voltarPagina() {
        window.location.href = 'planamente.php';
    }

    // Configurar o estado inicial da div
    document.addEventListener("DOMContentLoaded", () => {
        gameOverScreen.classList.add("hidden");
    });

    // Carregar a primeira pergunta ao iniciar a página
    carregarPergunta();
    </script>
</body>
</html>