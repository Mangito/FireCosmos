// Main file
// This file controls all the most important functions

const players = [], shoots = [];
for (let i = 0; i < 2; i++) players.push(new Player(i + 1));

let fps = 0, lastFPS = 0;
setInterval(() => {
  lastFPS = fps;
  fps = 0;
}, 1000);

window.onload = () => draw();
setInterval(draw, 1);
function draw() {
  // Clear
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // FPS
  fps++;
  ctx.fillStyle = "green";
  ctx.textAlign = "center";
  ctx.fillText(`FPS: ${lastFPS}`, canvasWidth - 50, 20);

  // Players
  for (let i = 0; i < players.length; i++) {
    if (players[i].Team === "Yellow") ctx.fillStyle = "yellow";
    else ctx.fillStyle = "blue";
    ctx.fillRect(players[i].X, players[i].Y, players[i].Width, players[i].Height);
  }

  for (let i = 0; i < shoots.length; i++) {
    if (shoots[i].Team === "Yellow") ctx.fillStyle = "yellow";
    else ctx.fillStyle = "blue";
    ctx.fillRect(shoots[i].X, shoots[i].Y, shoots[i].Width, shoots[i].Height);
  }
}
