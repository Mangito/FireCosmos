import GlobalConfigs from "../Config/GlobalConfigs";

import { randomNumber } from "../Utils/Utils";

export default class Aliens extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, textureNumber) {
		const texture = GlobalConfigs.textureAliens[textureNumber];
		super(scene, x, y, texture);

		this.textureNumber = textureNumber;
		this.textureName = texture;

		this.life = textureNumber + 1;
		this.speed = 100;

		this.explosionSound = this.scene.sound.add("Explosion", { volume: 0.75 });
	}

	generate() {
		this.speed = 200 - (this.textureNumber * 25);
		this.setPosition(-20, 50);
		this.setVelocityX(this.speed);
	}

	removeLife() {
		this.life--;
		this.setAlpha(this.life * 0.25);
		if (this.life <= 0) {
			this.explosionSound.play();
			this.destroy();
		}
	}

	update() {
		if (this.x + 20 >= GlobalConfigs.screen.width) {
			this.setVelocityX(-this.speed);
			this.y += 50;
			this.flipX = true;
		} else if (this.x - 20 <= 0 && this.y > 50) {
			this.setVelocityX(this.speed);
			this.y += 50;
			this.flipX = false;
		}
	}
}