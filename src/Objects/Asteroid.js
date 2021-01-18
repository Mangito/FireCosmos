import GConfigs from "../Managers/GConfigs";

import { randomNumber } from "../Utils/Utils";

export default class Asteroid extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "Asteroid");
		this.size = 64;
		// this.setBounce(1);
	}

	generate(size = 32) {
		this.size = size;

		const x = randomNumber(0, GConfigs.screen.width);
		const y = randomNumber(100, GConfigs.screen.height - 100);
		this.setPosition(x, y);

		const speedX = randomNumber(-75, 75);
		const speedY = randomNumber(-75, 75);
		this.setVelocity(speedX, speedY);

		const scale = size / 32;
		this.setScale(scale, scale);
	}

	update() {
		if (this.x - this.size * 2 < 0 || this.x + this.size * 2 > GConfigs.screen.width ||
			this.y < 0 || this.y > GConfigs.screen.height) {
			this.destroy();
		}
	}
}