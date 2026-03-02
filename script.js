// script.js - Atrapa la Estrella (offline)// Modificar letras amarillas
const GAME_TIME = 60; // seconds
const MOVE_INTERVAL = 800; // ms

const arena = document.getElementById('arena');
const star = document.getElementById('star');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const message = document.getElementById('message');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const exportBtn = document.getElementById('exportBtn');

const clickSound = document.getElementById('clickSound');
const startSound = document.getElementById('startSound');
const endSound = document.getElementById('endSound');

let score = 0;
let timeLeft = GAME_TIME;
let running = false;
let timerInterval = null;
let moveInterval = null;

function moveStar(){
  const rect = arena.getBoundingClientRect();
  const size = Math.max(40, Math.min(72, rect.width * 0.08));
  const x = Math.random() * (rect.width - size);
  const y = Math.random() * (rect.height - size);
  star.style.left = `${x}px`;
  star.style.top = `${y}px`;
}

function startGame(){
  if(running) return;
  running = true;
  score = 0;
  timeLeft = GAME_TIME;
  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;
  message.textContent = '';
  try{ startSound.currentTime = 0; startSound.play(); }catch(e){}
  moveStar();
  timerInterval = setInterval(()=>{
    timeLeft--;
    timeEl.textContent = timeLeft;
    if(timeLeft <= 0) endGame();
  }, 1000);
  moveInterval = setInterval(moveStar, MOVE_INTERVAL);
}

function endGame(){
  running = false;
  clearInterval(timerInterval);
  clearInterval(moveInterval);
  try{ endSound.currentTime = 0; endSound.play(); }catch(e){}
  message.textContent = `🎉 ¡Fin del juego! Puntaje: ${score}`;
}

function resetGame(){
  running = false;
  clearInterval(timerInterval);
  clearInterval(moveInterval);
  score = 0;
  timeLeft = GAME_TIME;
  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;
  message.textContent = '';
  moveStar();
}

star.addEventListener('click', ()=>{
  if(!running) return;
  score++;
  scoreEl.textContent = score;
  try{ clickSound.currentTime = 0; clickSound.play(); }catch(e){}
  star.style.transform = 'scale(1.35) rotate(18deg)';
  setTimeout(()=> star.style.transform = 'scale(1)', 140);
  moveStar();
});

startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);

// Export combined project as index.html (so students can save their current game)
function exportProject(){
  const htmlContent = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Atrapa la Estrella - Exportado</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="game-wrapper">
    <header><h1 class="glow">🌠 Atrapa la Estrella — Exportado 🌠</h1></header>
    <div class="hud"><div class="panel">⭐ Puntos: <span id="score">0</span></div><div class="panel">⏳ Tiempo: <span id="time">30</span>s</div></div>
    <div id="arena" class="arena"><div id="star" class="star">★</div></div>
    <div class="controls"><button id="startBtn">Iniciar</button><button id="resetBtn">Reiniciar</button></div>
    <div id="message" class="message"></div>
  </div>
<script src="script.js"></script>
</body>
</html>`;
  // create blob and trigger download
  const blob = new Blob([htmlContent], {type: 'text/html'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'index.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

exportBtn.addEventListener('click', exportProject);

// Initialize
resetGame();
