import GlobalConfigs from "../Config/GlobalConfigs";

import { randomNumber } from "../Utils/Utils";

export default class Aliens extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, textureNumber) {
		const texture = GlobalConfigs.textureAliens[textureNumber];
		super(scene, x, y, texture);

		this.textureName = texture;

		this.life = textureNumber + 1;
	}

	generate() {
		this.setPosition(-20, 50);
		this.setVelocityX(100);
	}

	removeLife() {
		this.life--;
		this.setAlpha(this.life * 0.25);
		if (this.life <= 0) this.destroy();
	}

	update() {
		if (this.x + 20 >= GlobalConfigs.screen.width) {
			this.setVelocityX(-100);
			this.y += 50;
		} else if (this.x - 20 <= 0 && this.y > 50) {
			this.setVelocityX(100);
			this.y += 50;
		}
	}
}