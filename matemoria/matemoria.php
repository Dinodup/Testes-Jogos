<?php
// Verifica o nível de dificuldade selecionado (por exemplo, via GET)
$difficulty = isset($_POST['dificuldade']) ? $_POST['dificuldade'] : 'facil'; // Default: 'easy'
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Matemória</title>
    <!--<link rel="stylesheet" href="../../styles/games/diff.css">-->
    <link rel="stylesheet" href="matemoria.css">
    <link rel="stylesheet" href="../../../styles/cabeça.css">
    <link rel="stylesheet" href="../../../styles/fonts.css">
    <link rel="stylesheet" href="../../../styles/media.css">
    <link rel="shortcut icon" type="imagex/png" href="../../../Material/images/favicon.ico">
</head>

<body>
    <div class="game-container">
        <h1>Matemória</h1>
        <div class="controls">
            <button onclick="reiniciarJogo()">Reiniciar Jogo</button>
            <button onclick="voltarPagina()">Voltar</button>
            <p id="timer">Tempo: 0s</p>
        </div>
        <div class="grid">
            <!-- Cartas do jogo, cada uma com um valor único -->
        </div>
        <div id="game-over" class="hidden">
            <h2>Parabéns! Você ganhou <span id="final-time"></span> pontos.</h2>
        </div>
    </div>

    <script>
        const selectedDifficulty = "<?php echo $difficulty; ?>";
    </script>

    <script src="matemoria.js"></script>
    <script>
        function reiniciarJogo() {
        // Lógica para reiniciar o jogo
        window.location.reload();
        }
  
        function voltarPagina() {
        // Redireciona para a página inicial
        window.location.href = '../../games.php';
        }
    </script>

</body>
</html>