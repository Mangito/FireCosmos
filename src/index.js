// Main file
// This file controls all the most important functions

const player = new Player();

window.onload = () => draw();
setInterval(draw, 1);
setInterval(logic, 1000 / 24);
function draw() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  ctx.fillStyle = "red";
  ctx.fillRect(player.X, player.Y, player.Width, player.Height);
}

function logic() {
  player.move();
}