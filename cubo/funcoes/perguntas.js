// Array de perguntas
const perguntas = [
    {
        solido: "Cubo",
        formula: {
            volume: "V = a³",
            area: "A = 6a²",
        },
        dados: "Aresta (a) = 5",
        pergunta: "Calcule o volume do cubo.",
        resposta: 125 // Resposta correta
    },
    {
        solido: "Esfera",
        formula: {
            volume: "V = (4/3)πr³",
            area: "A = 4πr²",
        },
        dados: "Raio (r) = 3",
        pergunta: "Calcule a área da esfera.",
        resposta: (4 * Math.PI * Math.pow(3, 2)).toFixed(2) // Resposta correta
    },
    {
        solido: "Cilindro",
        formula: {
            volume: "V = πr²h",
            area: "A = 2πr(r + h)",
        },
        dados: "Raio (r) = 2, Altura (h) = 5",
        pergunta: "Calcule o volume do cilindro.",
        resposta: (Math.PI * Math.pow(2, 2) * 5).toFixed(2) // Resposta correta
    }
];

// Elementos HTML
const formulaDiv = document.getElementById('formula');
const dadosDiv = document.getElementById('dados');
const resultadoInput = document.getElementById('resultado');

// Função para carregar uma pergunta aleatória
function carregarPergunta() {
    const index = Math.floor(Math.random() * perguntas.length);
    const perguntaAtual = perguntas[index];

    // Exibir a fórmula e os dados no HTML
    formulaDiv.innerHTML = `
        <strong>${perguntaAtual.solido}</strong><br>
        Volume: ${perguntaAtual.formula.volume}<br>
        Área: ${perguntaAtual.formula.area}
    `;
    dadosDiv.innerText = perguntaAtual.dados;

    // Validar a resposta ao digitar
    resultadoInput.addEventListener('change', () => {
        const respostaUsuario = parseFloat(resultadoInput.value);
        const respostaCorreta = parseFloat(perguntaAtual.resposta);

        if (respostaUsuario === respostaCorreta) {
            alert("Parabéns! Resposta correta.");
        } else {
            alert("Resposta incorreta. Tente novamente.");
        }
    });
}

// Carregar a primeira pergunta ao carregar a página
carregarPergunta();