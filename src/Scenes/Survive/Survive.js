import GlobalConfigs from "../../Config/GlobalConfigs";

import { randomNumber } from "../../Utils/Utils";

export default class Survive extends Phaser.Scene {
	constructor() {
		super({ key: "Survive" });
	}

	preload() { }

	create() {
		const { middleWidth, middleHeight, width, height } = GlobalConfigs.screen;
		this.background = this.add.tileSprite(middleWidth, middleHeight, width * 2, height * 2, "Background");
		this.bgPosition = 0.1;

		if (GlobalConfigs.debug) this.showFPSs = this.add.text(GlobalConfigs.screen.width - 55, 0, 0, TextStyle.base);
	}

	update() {
		if (GlobalConfigs.debug) this.showFPSs.setText(Number(this.game.loop.actualFps).toFixed(1));

		this.background.tilePositionX = Math.cos(this.bgPosition) * 700;
		this.background.tilePositionY = Math.sin(this.bgPosition) * 500;
		this.background.rotation += 0.0005;

		this.bgPosition += 0.0005;
	}
}
