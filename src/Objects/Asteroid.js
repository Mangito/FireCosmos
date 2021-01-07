import GConfigs from "../Managers/GConfigs";

import { randomNumber } from "../Utils/Utils";

export default class Component extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "Asteroid");
		this.speedX = randomNumber(-75, 75);
		this.speedY = randomNumber(-75, 75);
	}

	generate() {
		this.setPosition(randomNumber(0, GConfigs.width), randomNumber(100, GConfigs.height - 100));
		this.setVelocity(this.speedX, this.speedY);
	}

	update() {
		if (this.x < 0 || this.x > GConfigs.width ||
			this.y < 0 || this.y > GConfigs.height) {
			this.destroy();
		}
	}
}