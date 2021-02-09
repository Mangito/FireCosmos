import GlobalConfigs from "../Config/GlobalConfigs";

export default class Shoot extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "Fire");
		this.team = null;
		this.speed = Phaser.Math.GetSpeed(1000, 1);
	}

	fire(x, y, team, addKill) {
		this.team = team;

		this.addKill = addKill;

		this.setPosition(x, y);
		this.setActive(true);
		this.setVisible(true);
	}

	update(time, delta) {
		if (this.team === "Aliens") this.shootTeamAliens(delta);
		if (this.team === "Ships") this.shootTeamShips(delta);
	}

	shootTeamAliens(delta) {
		this.y += this.speed * delta;
		if (this.y > GlobalConfigs.screen.height) this.remove();
	}

	shootTeamShips(delta) {
		this.y -= this.speed * delta;
		if (this.y < -50) this.remove();
	}

	remove() {
		this.setActive(false);
		this.setVisible(false);
		this.destroy();
	}
}
