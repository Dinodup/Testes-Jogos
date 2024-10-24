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
            justify-content: center;
            align-items: center;
            height: 100vh;
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
        }

        .inputs {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }

        .input-box {
            width: 45%;
            height: 80px;
            background-color: #8c52d1;
            border: none;
            border-radius: 10px;
            color: white;
            font-size: 16px;
            padding: 10px;
            resize: none;
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

        .gif {
            color: black;
            width: 30%;
            height: 500px;
            border-radius: 75px;
            margin: auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Planamente Espacial</h1>

        <div class="inputs">
          <div class="input-box">
              <label for="formula">Fórmula:</label>
                <div id="formula" readonly>Digite nessa area aqui</div>
            </div>

            <div class="input-box">
              <label for="dados">Dados:</label>
                <div id="dados" readonly>Digite nessa area aqui</div>
            </div>
        </div>
        <div class="gif"><br><br><br><br><br><br><br>
            <?php
              include('cubo.php');
            ?>
        </div>
        <div class="result-area">
            <label for="resultado">Perímetro/Área/Volume:</label>
            <textarea id="resultado" placeholder="Digite a resposta aqui..." class="result-text" ></textarea>
        </div>
    </div>
</body>
</html>
