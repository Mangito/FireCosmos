import GlobalConfigs from "../../Config/GlobalConfigs";
import GameConfigs from "../../Config/GameConfigs";

import { randomNumber } from "../../Utils/Utils";

import playCreate from "./PlayCreate";

export default class Play extends Phaser.Scene {
	constructor() {
		super({ key: "Play" });
		this.gameConfigs = new GameConfigs();
		this.playersConfig = this.gameConfigs.players.players;

		if (this.gameConfigs.asteroids) this.lastAsteroids = 5000;

		this.players = [];

		this.upPoints = 0;
		this.downPoints = 0;
	}

	preload() { }

	create() {
		playCreate.call(this);
	}

	update(time) {
		if (GlobalConfigs.debug) this.showFPSs.setText(Number(this.game.loop.actualFps).toFixed(1));

		if (this.gameConfigs.asteroids && this.lastAsteroids < time) {
			this.lastAsteroids = time + randomNumber(500, 10000);
			this.generateAsteroids();
		}
	}

	generateAsteroids() {
		const asteroid = this.asteroids.get();
		if (asteroid) asteroid.generate();
	}
}
