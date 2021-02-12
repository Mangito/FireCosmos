import GlobalConfigs from "../../Config/GlobalConfigs";

import { randomNumber } from "../../Utils/Utils";

import Background from "../../Objects/Background";

export default class Survive extends Phaser.Scene {
	constructor() {
		super({ key: "Survive" });
	}

	preload() { }

	create() {
		const background = new Background(this);

		if (GlobalConfigs.debug) this.showFPSs = this.add.text(GlobalConfigs.screen.width - 55, 0, 0, TextStyle.base);
	}

	update() {
		if (GlobalConfigs.debug) this.showFPSs.setText(Number(this.game.loop.actualFps).toFixed(1));
	}
}
