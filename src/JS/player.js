export default class Player {
	constructor(n) {
		this.PlayerID = n;
		this.Width = 40;
		this.Height = 30;
		this.Team = n % 2 ? "Blue" : "Yellow";
		this.Y = 5;
		this.X = canvasWidth / 2 + this.Width / 2;
		this.Speed = 10;
		this.Direction = "";
		if (this.Team != "Yellow") this.Y = canvasHeight - this.Height - 5;

		this.NumShoots = 3;
	}

	changeDirection(keyCode) {
		// console.log(keyCode);
		if (this.PlayerID === 1) {
			if (keyCode === 37) this.Direction = "Left";
			else if (keyCode === 39) this.Direction = "Right";
			if (keyCode === 38) this.fired();
		} else if (this.PlayerID === 2) {
			if (keyCode === 65) this.Direction = "Left";
			else if (keyCode === 68) this.Direction = "Right";
			if (keyCode === 83) this.fired();
		}

		// Exit
		if (keyCode === 27 || keyCode === 32) window.location.href = "./";
	}

	move() {
		if (this.Direction === "Left" && this.X >= 0 + this.Speed) this.X -= this.Speed;
		else if (this.Direction === "Right" && this.X <= canvasWidth - this.Width - this.Speed) this.X += this.Speed;
	}

	fired() {
		if (this.NumShoots) {
			let directionShoot = "Down";
			let startY = this.Height;
			if (this.Team === "Blue") {
				directionShoot = "Up";
				startY = 0;
			}
			shoots.push(new Shoot(this.X + this.Width / 2, this.Y + startY, directionShoot, this.PlayerID, this.Team));
			this.NumShoots--;
		}
	}
}

// Move Player
// setInterval(movePlayer, 1000 / 24);
// function movePlayer() {
// 	for (let i = 0; i < players.length; i++) players[i].move();
// }
