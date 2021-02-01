import GlobalConfigs from "../Config/GlobalConfigs";

import { randomNumber } from "../Utils/Utils";

export default class Asteroid extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "Block");
	}

	generate() {
		const size = randomNumber(16, 64) / 32;
		this.setScale(size, 1);
		const margin = 10;

		const x = randomNumber(size + margin, GlobalConfigs.screen.width - size - margin);
		const y = GlobalConfigs.screen.middleHeight;
		this.setPosition(x, y);

		this.setImmovable(true);
	}
}
