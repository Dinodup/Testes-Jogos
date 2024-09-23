// Elementos da página
const displayArea = document.getElementById('display-area');
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const submitBtn = document.getElementById('submit-btn');
const responseInput = document.getElementById('response-input');

// Função para alterar o conteúdo ao clicar nos botões
btn1.addEventListener('click', () => {
    displayArea.textContent = "Conteúdo do botão 1";
});

btn2.addEventListener('click', () => {
    displayArea.textContent = "Conteúdo do botão 2";
});

btn3.addEventListener('click', () => {
    displayArea.textContent = "Conteúdo do botão 3";
});

// Ação do botão de envio
submitBtn.addEventListener('click', () => {
    const resposta = responseInput.value;
    if (resposta) {
        alert(`Você digitou: ${resposta}`);
        responseInput.value = ""; // Limpa o campo após o envio
    } else {
        alert("Por favor, digite uma resposta.");
    }
});
