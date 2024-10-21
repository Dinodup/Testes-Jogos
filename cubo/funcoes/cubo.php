<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cubo</title>
    
  <style>
    html {
    background-color: #22264C;
}

body {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    perspective: 500px;
}
  
.cube {
    width: 200px;
    height: 200px;
  
    animation: rotate 10s infinite linear; /* Mude 'alternate' para 'linear' */
    transform-style: preserve-3d;
}
  
.face {
    background: linear-gradient(45deg, #7F4DA6, #7F4DA6);
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    font-weight: bold;
    color: black;
  
    width: 200px;
    height: 200px;
    position: absolute;
}
  
.face--front {
    transform: translateZ(100px);
}
  
.face--right {
    transform: rotateY(90deg) translateZ(100px);
}
  
.face--back {
    transform: rotateY(180deg) translateZ(100px);
}
  
.face--left {
    transform: rotateY(-90deg) translateZ(100px);
}
  
.face--top {
    transform: rotateX(90deg) translateZ(100px);
}
  
.face--bottom {
    transform: rotateX(-90deg) translateZ(100px);
}
  
@keyframes rotate {
    from {
        transform: rotateX(40deg) rotateY(-50deg);
    }
  
    to {
        transform: rotateX(40deg) rotateY(310deg); /* Ajuste o valor final para 310deg */
    }
}

  </style>

</head>
<body>
    <div class="cube">
        <div class="face face--front"></div>
        <div class="face face--right"></div>
        <div class="face face--back"></div>
        <div class="face face--left"></div>
        <div class="face face--top"></div>
        <div class="face face--bottom"></div>
      </div>
</body>
</html>
