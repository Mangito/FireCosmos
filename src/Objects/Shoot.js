import GlobalConfigs from "../Config/GlobalConfigs";

export default class Shoot extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "Fire");
		this.team = null;
		this.speed = 600;
	}

	fire(x, y, team) {
		this.team = team;

		if (team === "Aliens") {
			this.setVelocityY(this.speed);
			this.setFlipY(true);
		} else {
			this.setVelocityY(-this.speed);
		}

		this.setPosition(x, y);
		this.setActive(true);
		this.setVisible(true);
	}

	update() {
		if (this.y > GlobalConfigs.screen.height || this.y < -50) this.remove();
	}

	remove() {
		this.setActive(false);
		this.setVisible(false);
		this.destroy();
	}
}
