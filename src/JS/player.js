document.addEventListener("keydown", (e) => changePlayersDirection(e));
function changePlayersDirection(e) {
	const keyCode = e.keyCode;
	for (let i = 0; i < players.length; i++)  players[i].changeDirection(keyCode);
}

class Player {
	constructor(n) {
		this.Width = 10;
		this.Height = 10;
		this.Team = n % 2;
		this.Y = 0;
		this.X = canvasWidth / 2 + this.Width / 2;
		this.Speed = 10;
		this.Direction = "";
		this.Number = n;
		if (!this.Team) this.Y = canvasHeight - this.Height;
	}

	changeDirection(keyCode) {
		console.log(keyCode);
		if (this.Number === 1) {
			if (keyCode === 37) this.Direction = "Left";
			if (keyCode === 39) this.Direction = "Right";
		} else if (this.Number === 2) {
			if (keyCode === 65) this.Direction = "Left";
			if (keyCode === 68) this.Direction = "Right";
		}

		// Exit
		if (keyCode === 27 || keyCode === 32) window.location.href = "./";
	}

	move() {
		if (this.Direction === "Left" && this.X >= 0 + this.Speed) this.X -= this.Speed;
		if (this.Direction === "Right" && this.X <= canvasWidth - this.Width - this.Speed) this.X += this.Speed;
	}
}

// Move Player
setInterval(movePlayer, 1000 / 24);
function movePlayer() {
	for (let i = 0; i < players.length; i++) players[i].move();
}
