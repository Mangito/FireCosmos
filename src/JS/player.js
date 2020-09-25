document.addEventListener("keydown", (e) => player.changeDirection(e));
class Player {
	constructor(y) {
		this.Width = 10;
		this.Height = 10;
		this.Y = 0;
		this.X = canvasWidth / 2 + this.Width / 2;
		this.Speed = 10;
		this.Direction = "";
	}

	changeDirection(e) {
		const keyCode = e.keyCode;
		console.log(e.keyCode);
		if (keyCode === 37) this.Direction = "Left";
		if (keyCode === 39) this.Direction = "Right";

		// Exit
		if (keyCode === 27 || keyCode === 32) window.location.href = "./";
	}

	move() {
		if (this.Direction === "Left" && this.X >= 0 + this.Speed) this.X -= this.Speed;
		if (this.Direction === "Right" && this.X <= canvasWidth - this.Width - this.Speed) this.X += this.Speed;
	}
}