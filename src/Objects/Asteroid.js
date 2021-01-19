import GlobalConfigs from "../Config/GlobalConfigs";

import { randomNumber } from "../Utils/Utils";

export default class Asteroid extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "Asteroid");
	}

	generate() {
		const x = randomNumber(0, 2);
		const y = randomNumber(150, GlobalConfigs.screen.height - 150);
		this.setPosition(x * GlobalConfigs.screen.width, y);

		const minX = x ? -100 : 50;
		const maxX = x ? -50 : 100;
		const speedX = randomNumber(minX, maxX);

		const minY = -50;
		const maxY = 50;
		const speedY = randomNumber(minY, maxY);
		this.setVelocity(speedX, speedY);

		const scale = randomNumber(8, 64) / 32;
		this.setScale(scale, scale);

		this.setBounce(1);
	}

	update() {
		if (this.x < 0 - 100 * 2 ||
			this.x > GlobalConfigs.screen.width + 100 * 2 ||
			this.y < 0 - this.height ||
			this.y > GlobalConfigs.screen.height + this.height) {
			this.destroy();
		}
	}
}