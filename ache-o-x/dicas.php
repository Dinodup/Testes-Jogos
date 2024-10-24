<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interface</title>
    <link rel="stylesheet" href="dicas.css">
</head>
<body>
    <div class="container">
        <div class="info-section">
            <div class="buttons">
                <button class="info-btn" id="btn1">1</button>
                <button class="info-btn" id="btn2">2</button>
                <button class="info-btn" id="btn3">3</button>
            </div>
            <div class="display-area" id="display-area"></div>
        </div>
        
        <div class="input-section">
            <label for="response-input">R:</label>
            <input type="text" id="response-input" placeholder="Digite aqui...">
            <button class="submit-btn" id="submit-btn">✔</button>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
