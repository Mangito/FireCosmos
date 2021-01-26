import GlobalConfigs from "../Config/GlobalConfigs";

import { randomNumber } from "../Utils/Utils";

export default class Asteroid extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "Block");
	}

	generate() {
		const size = randomNumber(16, 32) / 32;
		this.setScale(size);

		const minPosition = size + 150;
		const x = randomNumber(size, GlobalConfigs.screen.width - size);
		const y = randomNumber(minPosition, GlobalConfigs.screen.height - minPosition);
		this.setPosition(x, y);

		this.setImmovable(true);
	}
}
