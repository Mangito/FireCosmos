import { TextStyle } from "../Theme";
import { degreesToRadians } from "../Utils/Utils";

export default class Key extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "Key");
	}

	generate(configs) {
		const { x, y, text } = configs;

		this.setPosition(x, y);
		this.setFrame(0);

		if (text === "LEFT") {
			this.setRotation(degreesToRadians(-90));
			this.setFrame(1);
			return;
		} else if (text === "RIGHT") {
			this.setRotation(degreesToRadians(90));
			this.setFrame(1);
			return;
		} else if (text === "UP") {
			this.setFrame(1);
			return;
		}

		if (!text) return;
		this.label = this.scene.add.text(x, y, text, TextStyle.info.controllers).setOrigin(0.5);
	}
}
