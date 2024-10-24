<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Escolha a Dificuldade</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Planamente Espacial</h1>
    <p>Escolha o nível de dificuldade</p>
      <div class="buttons">
        <form action="nivplanamente.php" method="GET">
          <button type="submit" name="dificuldade" value="facil">Fácil</button>
          <button type="submit" name="dificuldade" value="medio">Médio</button>
          <button type="submit" name="dificuldade" value="dificil">Difícil</button>
        </form>
      </div>
  </div>
</body>
</html>