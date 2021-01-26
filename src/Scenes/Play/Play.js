import GlobalConfigs from "../../Config/GlobalConfigs";
import GameConfigs from "../../Config/GameConfigs";

import PlayCreate from "./PlayCreate";
// import Create from "./Create";

export default class Play extends Phaser.Scene {
	constructor() {
		super({ key: "Play" });
		this.gameConfigs = new GameConfigs();
		this.playersConfig = this.gameConfigs.testGame();

		if (this.gameConfigs.asteroids.on)
			this.lastAsteroids = this.gameConfigs.asteroids.first;

		this.players = [];

		this.upPoints = 0;
		this.downPoints = 0;
	}

	preload() { }

	create() {
		const _this = this;
		PlayCreate(_this);

		// this.c = new Create();
		// this.c.create.bind(this);
		// console.log(this.c);
	}

	update(time) {
		if (GlobalConfigs.debug) this.showFPSs.setText(Number(this.game.loop.actualFps).toFixed(1));

		if (this.gameConfigs.asteroids.on && this.lastAsteroids < time) {
			this.lastAsteroids = time + this.gameConfigs.asteroids.next;
			this.generateAsteroids();
		}

	}

	generateAsteroids() {
		const asteroid = this.asteroids.get();
		if (asteroid) asteroid.generate();
	}
}
