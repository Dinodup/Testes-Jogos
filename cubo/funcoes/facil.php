<?php
echo "
<script>
perguntas = [
    {
        solido: 'Cubo',
        formula: { volume: 'V = a³', area: 'A = 6a²' },
        dados: 'Aresta (a) = 5',
        imagem: 'http://localhost:8080/testes-Jogos/Testes-Jogos/cubo/imagens/cubo.png',
        resposta: 125
    },
    {
        solido: 'Esfera',
        formula: { volume: 'V = (4/3)πr³', area: 'A = 4πr²' },
        dados: 'Raio (r) = 3',
        imagem: 'http://localhost:8080/testes-Jogos/Testes-Jogos/cubo/imagens/esfera.png',
        resposta: (4 * Math.PI * Math.pow(3, 2)).toFixed(2)
    }
];
</script>
";
?>