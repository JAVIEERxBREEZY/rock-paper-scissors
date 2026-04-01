const TOTAL_TOKENS = 50;
const SPEED_MIN = 0.9;
const SPEED_MAX = 1.9;
const TYPES = {
  rock: { emoji: "🪨", label: "Piedra", beats: "scissors" },
  paper: { emoji: "📄", label: "Papel", beats: "rock" },
  scissors: { emoji: "✂️", label: "Tijera", beats: "paper" },
};

const arena = document.getElementById("arena");
const toggleButton = document.getElementById("toggleButton");
const resetButton = document.getElementById("resetButton");
const rockCount = document.getElementById("rockCount");
const paperCount = document.getElementById("paperCount");
const scissorsCount = document.getElementById("scissorsCount");
const statusBadge = document.getElementById("statusBadge");
const summaryText = document.getElementById("summaryText");
const winnerBanner = document.getElementById("winnerBanner");

let tokens = [];
let animationFrameId = null;
let running = true;
let arenaWidth = 0;
let arenaHeight = 0;
let lastTimestamp = 0;

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function getRandomType(index) {
  const pool = ["rock", "paper", "scissors"];
  return pool[index % pool.length];
}

function getTokenSize(tokenNode) {
  return tokenNode ? tokenNode.offsetWidth : 46;
}

function createToken(index) {
  const type = getRandomType(index);
  const token = document.createElement("div");
  token.className = `token ${type}`;
  token.textContent = TYPES[type].emoji;
  arena.appendChild(token);
  const tokenSize = getTokenSize(token);

  return {
    id: index,
    type,
    x: randomBetween(0, Math.max(1, arenaWidth - tokenSize)),
    y: randomBetween(0, Math.max(1, arenaHeight - tokenSize)),
    vx: (Math.random() > 0.5 ? 1 : -1) * randomBetween(SPEED_MIN, SPEED_MAX),
    vy: (Math.random() > 0.5 ? 1 : -1) * randomBetween(SPEED_MIN, SPEED_MAX),
    node: token,
  };
}

function setArenaBounds() {
  const rect = arena.getBoundingClientRect();
  arenaWidth = rect.width;
  arenaHeight = rect.height;
}

function drawToken(token) {
  token.node.style.left = `${token.x}px`;
  token.node.style.top = `${token.y}px`;
}

function refreshTokenAppearance(token) {
  token.node.className = `token ${token.type}`;
  token.node.textContent = TYPES[token.type].emoji;
  token.node.classList.add("flash");
  window.setTimeout(() => token.node.classList.remove("flash"), 120);
}

function beats(attackerType, defenderType) {
  return TYPES[attackerType].beats === defenderType;
}

function resolveCollision(first, second) {
  if (first.type === second.type) {
    return;
  }

  if (beats(first.type, second.type)) {
    second.type = first.type;
    refreshTokenAppearance(second);
  } else if (beats(second.type, first.type)) {
    first.type = second.type;
    refreshTokenAppearance(first);
  }
}

function updateCounts() {
  const counts = { rock: 0, paper: 0, scissors: 0 };

  for (const token of tokens) {
    counts[token.type] += 1;
  }

  rockCount.textContent = counts.rock;
  paperCount.textContent = counts.paper;
  scissorsCount.textContent = counts.scissors;

  const aliveTypes = Object.entries(counts).filter(([, count]) => count > 0);

  if (aliveTypes.length === 1) {
    const [winnerType, winnerCount] = aliveTypes[0];
    const winner = TYPES[winnerType].label;
    statusBadge.textContent = "Partida resuelta";
    winnerBanner.hidden = false;
    winnerBanner.textContent = `${TYPES[winnerType].emoji} ${winner} domina la arena con ${winnerCount} fichas.`;
    summaryText.textContent = `La simulación ha terminado: todas las fichas se han convertido en ${winner.toLowerCase()}.`;
    running = false;
    toggleButton.textContent = "Reanudar";
    return;
  }

  const leader = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  const [leaderType, leaderCount] = leader;
  statusBadge.textContent = running ? "Simulación activa" : "Simulación pausada";
  winnerBanner.hidden = true;
  summaryText.textContent = `${TYPES[leaderType].label} va en cabeza con ${leaderCount} fichas, pero la arena sigue abierta.`;
}

function keepInsideArena(token) {
  const tokenSize = getTokenSize(token.node);

  if (token.x <= 0 || token.x >= arenaWidth - tokenSize) {
    token.vx *= -1;
    token.x = Math.min(Math.max(token.x, 0), arenaWidth - tokenSize);
  }

  if (token.y <= 0 || token.y >= arenaHeight - tokenSize) {
    token.vy *= -1;
    token.y = Math.min(Math.max(token.y, 0), arenaHeight - tokenSize);
  }
}

function moveTokens(deltaFactor) {
  for (const token of tokens) {
    token.x += token.vx * deltaFactor;
    token.y += token.vy * deltaFactor;
    keepInsideArena(token);
    drawToken(token);
  }
}

function handleCollisions() {
  for (let i = 0; i < tokens.length; i += 1) {
    for (let j = i + 1; j < tokens.length; j += 1) {
      const first = tokens[i];
      const second = tokens[j];
      const firstSize = getTokenSize(first.node);
      const secondSize = getTokenSize(second.node);
      const dx = first.x - second.x;
      const dy = first.y - second.y;
      const minDistance = ((firstSize + secondSize) / 2) * 0.72;

      if ((dx * dx) + (dy * dy) < minDistance * minDistance) {
        resolveCollision(first, second);

        const angle = Math.atan2(dy, dx) || 0;
        const push = 1.2;
        first.vx += Math.cos(angle) * push * 0.06;
        first.vy += Math.sin(angle) * push * 0.06;
        second.vx -= Math.cos(angle) * push * 0.06;
        second.vy -= Math.sin(angle) * push * 0.06;

        first.vx = Math.max(-2.4, Math.min(2.4, first.vx));
        first.vy = Math.max(-2.4, Math.min(2.4, first.vy));
        second.vx = Math.max(-2.4, Math.min(2.4, second.vx));
        second.vy = Math.max(-2.4, Math.min(2.4, second.vy));
      }
    }
  }
}

function animate(timestamp) {
  if (!running) {
    lastTimestamp = timestamp;
    animationFrameId = window.requestAnimationFrame(animate);
    return;
  }

  const delta = timestamp - (lastTimestamp || timestamp);
  lastTimestamp = timestamp;
  const deltaFactor = Math.min(2.2, delta / 16.67);

  moveTokens(deltaFactor);
  handleCollisions();
  updateCounts();

  animationFrameId = window.requestAnimationFrame(animate);
}

function clearArena() {
  if (animationFrameId) {
    window.cancelAnimationFrame(animationFrameId);
  }

  arena.innerHTML = "";
  tokens = [];
  winnerBanner.hidden = true;
  lastTimestamp = 0;
}

function initializeGame() {
  clearArena();
  setArenaBounds();

  for (let i = 0; i < TOTAL_TOKENS; i += 1) {
    const token = createToken(i);
    tokens.push(token);
    drawToken(token);
  }

  running = true;
  statusBadge.textContent = "Simulación activa";
  toggleButton.textContent = "Pausar";
  updateCounts();
  animationFrameId = window.requestAnimationFrame(animate);
}

toggleButton.addEventListener("click", () => {
  running = !running;
  statusBadge.textContent = running ? "Simulación activa" : "Simulación pausada";
  toggleButton.textContent = running ? "Pausar" : "Reanudar";
});

resetButton.addEventListener("click", () => {
  initializeGame();
});

window.addEventListener("resize", () => {
  setArenaBounds();
  for (const token of tokens) {
    const tokenSize = getTokenSize(token.node);
    token.x = Math.min(token.x, Math.max(0, arenaWidth - tokenSize));
    token.y = Math.min(token.y, Math.max(0, arenaHeight - tokenSize));
    drawToken(token);
  }
});

initializeGame();
