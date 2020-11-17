//  Antigo Código em Canvas

const players = [], shoots = [];
for (let i = 0; i < 2; i++) players.push(new Player(i + 1));
window.onload = () => draw();
setInterval(draw, 1);
function draw() {
	// Clear
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

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


document.addEventListener("keydown", (e) => changePlayersDirection(e));
function changePlayersDirection(e) {
	const keyCode = e.keyCode;
	for (let i = 0; i < players.length; i++)  players[i].changeDirection(keyCode);
}