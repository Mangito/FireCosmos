import Assets from "../../Managers/Assets";
import GlobalConfigs from "../../Config/GlobalConfigs";
import GameConfigs from "../../Config/GameConfigs";

import PlayCreate from "./PlayCreate";
// import Create from "./Create";

import progressBar from "../../Components/ProgressBar";

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

	preload() {
		const _this = this;
		progressBar(_this);

		for (let i = 0; i < this.playersConfig.length; i++) {
			const player = this.playersConfig[i];
			this.load.image(player.ship, Assets.Ships[player.ship]);
		}

		this.load.image("Fire", Assets.Shoot.Fire);

		if (this.gameConfigs.asteroids.on)
			this.load.image("Asteroid", Assets.Asteroids.BolaBranca);

		this.load.image("Block", Assets.Block.Block);
	}

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
