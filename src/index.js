// Main file
// This file controls all the most important functions

const players = [];
for (let i = 0; i < 2; i++) players.push(new Player(i + 1));

let x = 1;
setInterval(() => {
  console.log(x);
  x = 1;
}, 1000);

window.onload = () => draw();
setInterval(draw, 1);
function draw() {
  x++;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  for (let i = 0; i < players.length; i++) {
    if (players[i].Team) ctx.fillStyle = "yellow";
    else ctx.fillStyle = "blue";
    ctx.fillRect(players[i].X, players[i].Y, players[i].Width, players[i].Height);
  }
}
