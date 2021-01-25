import Assets from "../Managers/Assets";
import GlobalConfigs from "../Config/GlobalConfigs";
import GameConfigs from "../Config/GameConfigs";
import { Text } from "../Managers/Theme";

import progressBar from "../Components/ProgressBar";

import Player from "../Objects/Player";
import Asteroid from "../Objects/Asteroid";

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
			this.load.image(player.ship, Assets.Player[player.ship]);
		}

		this.load.image("Fire", Assets.Shoot.Fire);

		if (this.gameConfigs.asteroids.on)
			this.load.image("Asteroid", Assets.Asteroids.BolaBranca);
	}

	create() {
		if (GlobalConfigs.debug) this.showFPSs = this.add.text(GlobalConfigs.screen.width - 55, 0, 0, Text);

		this.upPointsLabel = this.add.text(GlobalConfigs.screen.width / 2, 0, 0, Text);
		this.upPointsLabel.x = GlobalConfigs.screen.middleWidth - this.upPointsLabel.width / 2;

		this.downPointsLabel = this.add.text(GlobalConfigs.screen.width / 2, GlobalConfigs.screen.height - 20, 0, Text);
		this.downPointsLabel.x = GlobalConfigs.screen.middleWidth - this.downPointsLabel.width / 2;

		this.createGroups();

		this.createPlayers();

		this.createCollisions();
	}

	createGroups() {
		this.playersPhysics = this.physics.add.group({
			classType: Player,
			runChildUpdate: true,
		});

		if (this.gameConfigs.asteroids.on) {
			this.asteroids = this.physics.add.group({
				classType: Asteroid,
				maxSize: 20,
				runChildUpdate: true
			});
		}
	}

	createPlayers() {
		for (let i = 0; i < this.playersConfig.length; i++) {
			const config = this.playersConfig[i];
			const sprite = this.playersPhysics.get(0, 0, config);
			this.players.push(sprite);
			if (sprite) sprite.generate();
		}
	}

	createCollisions() {
		for (let i = 0; i < this.players.length; i++) {
			const player = this.players[i];
			this.physics.add.overlap(this.playersPhysics, player.shoots, this.collisionPlayerShot, null, this); // Players -> Shoots

			if (this.gameConfigs.asteroids.on) {
				// Shoots -> Asteroids
				this.physics.add.overlap(this.asteroids, player.shoots, this.collisionShootAsteroid, null, this);
			}
		}

		if (this.gameConfigs.asteroids.on) {
			// Players -> Asteroids
			this.physics.add.overlap(this.playersPhysics, this.asteroids, this.collisionPlayerAsteroid, null, this);

			// Asteroids -> Asteroids
			this.physics.add.collider(this.asteroids);
		}

	}

	collisionPlayerShot(player, shoot) {
		if (player.isAlive) {
			player.hited();
			shoot.addPoints();
			if (shoot.team === "Up") this.updatePointsUp();
			else this.updatePointsDown();
			shoot.destroy();
		}
	}

	collisionPlayerAsteroid(player, asteroid) {
		if (player.isAlive) {
			player.hited();
			if (player.team !== "Up") this.updatePointsUp();
			else this.updatePointsDown();
			asteroid.destroy();
		}
	}

	collisionShootAsteroid(asteroid, shoot) {
		asteroid.destroy();
		shoot.destroy();
	}

	updatePointsUp() {
		this.upPoints++;
		this.upPointsLabel.setText(this.upPoints);
		this.upPointsLabel.x = GlobalConfigs.screen.middleWidth - this.upPointsLabel.width / 2;
	}

	updatePointsDown() {
		this.downPoints++;
		this.downPointsLabel.setText(this.downPoints);
		this.downPointsLabel.x = GlobalConfigs.screen.middleWidth - this.downPointsLabel.width / 2;
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
