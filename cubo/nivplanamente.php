<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Jogo - Nível Selecionado</title>
</head>
<body>
    <?php
    // Verificar se a dificuldade foi passada pela URL
    if (isset($_GET['dificuldade'])) {
        $dificuldade = $_GET['dificuldade'];

        // Carregar o script correspondente ao nível escolhido
        switch ($dificuldade) {
            case 'facil':
                include 'funcoes/interface.php';
                include 'funcoes/facil.php';
                break;

            case 'medio':
              include 'funcoes/interface.php';
              include 'funcoes/medio.php';
              break;

            case 'dificil':
              include 'funcoes/interface.php';
              include 'funcoes/dificil.php';
              break;

            default:
                echo "<h1>Dificuldade não reconhecida</h1>";
        }
    } else {
        echo "<h1>Nenhuma dificuldade selecionada</h1>";
    }
    ?>
</body>
</html>