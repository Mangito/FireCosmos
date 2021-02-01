import GlobalConfigs from "../../Config/GlobalConfigs";

import { randomNumber } from "../../Utils/Utils";

import roundsCreate from "./RoundsCreate";

export default class TeamDeathmatch extends Phaser.Scene {
	constructor() {
		super({ key: "Rounds" });
	}

	preload() { }

	create() {
		roundsCreate.call(this);
	}

	update() {
		if (GlobalConfigs.debug) this.showFPSs.setText(Number(this.game.loop.actualFps).toFixed(1));
	}
}
