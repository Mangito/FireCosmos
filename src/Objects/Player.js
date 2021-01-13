import GConfigs from "../Managers/GConfigs";

import { randomNumber } from "../Utils/Utils";

export default class Component extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "Asteroid");
	}

	generate(size = 64) {
		this.size = size;

		const x = randomNumber(0, GConfigs.width);
		const y = randomNumber(100, GConfigs.height - 100);
		this.setPosition(x, y);

		const speedX = randomNumber(-75, 75);
		const speedY = randomNumber(-75, 75);
		this.setVelocity(speedX, speedY);

		const scale = size / 32;
		this.setScale(scale, scale);
	}

	update() {
		if (this.x < 0 || this.x > GConfigs.width ||
			this.y < 0 || this.y > GConfigs.height) {
			this.destroy();
		}
	}
}