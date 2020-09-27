
class Shoot {
	constructor(x, y, direction, PlayerID, Team) {
		this.Width = 10;
		this.Height = 10;
		this.X = x - this.Width / 2;
		this.Y = y;
		this.Direction = direction;
		this.Speed = 10;

		this.Team = Team;
		this.PlayerID = PlayerID;
	}

	move(s) {
		console.log(this.Direction);
		if (this.Direction === "Up" && this.Y >= 0 + this.Speed) this.Y -= this.Speed;
		else if (this.Direction === "Down" && this.Y <= canvasHeight - this.Width - this.Speed) this.Y += this.Speed;
		else {
			for (let i = 0; i < players.length; i++) {
				if (players[i].PlayerID === this.PlayerID) players[i].NumShoots++;
				break;
			}
			shoots.splice(s, 1);
		}
	}
}

// Move Shoot
setInterval(moveShoot, 1000 / 24);
function moveShoot() {
	for (let i = 0; i < shoots.length; i++) shoots[i].move(i);
}