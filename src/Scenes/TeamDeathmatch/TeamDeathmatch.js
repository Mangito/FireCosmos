import GlobalConfigs from "../../Config/GlobalConfigs";
import GameConfigs from "./GameConfigs";

import { TextStyle } from "../../Managers/Theme";
import { randomNumber } from "../../Utils/Utils";

import Player from "../../Objects/Player";
import Asteroid from "../../Objects/Asteroid";
import Block from "../../Objects/Blocks";
import Background from "../../Objects/Background";

export default class TeamDeathmatch extends Phaser.Scene {
	constructor() {
		super({ key: "TeamDeathmatch" });
		this.gameConfigs = new GameConfigs();
		this.playersConfig = this.gameConfigs.players.players;

		if (this.gameConfigs.asteroids) this.lastAsteroids = 5000;

		this.players = [];

		this.upPoints = 0;
		this.downPoints = 0;

		this.pause = false;
	}

	preload() { }

	// -- Create
	create() {
		const background = new Background(this);

		if (GlobalConfigs.debug) this.showFPSs = this.add.text(GlobalConfigs.screen.width - 55, 0, 0, TextStyle.base);

		this.aliensPointsLabel = this.add.text(GlobalConfigs.screen.width / 2, 20, 0, TextStyle.points);
		this.aliensPointsLabel.setOrigin(0.5);

		this.shipsPointsLabel = this.add.text(GlobalConfigs.screen.width / 2, GlobalConfigs.screen.height - 20, 0, TextStyle.points);
		this.shipsPointsLabel.setOrigin(0.5);

		this.createGroups();
		this.createPlayers();
		if (this.gameConfigs.blocks) this.createBlocks();
		this.createCollisions();

		const keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
		const keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
		keyP.on("down", this.pauseGame, this);
		keyESC.on("down", this.pauseGame, this);
	}

	createGroups() {
		this.playersPhysics = this.physics.add.group({
			classType: Player,
			runChildUpdate: true,
		});

		if (this.gameConfigs.asteroids) {
			this.asteroids = this.physics.add.group({
				classType: Asteroid,
				maxSize: 20,
				runChildUpdate: true
			});
		};

		if (this.gameConfigs.blocks) {
			this.blocks = this.physics.add.group({
				classType: Block,
				maxSize: 5,
			});
		};
	}

	createPlayers() {
		for (let i = 0; i < this.playersConfig.length; i++) {
			const config = this.playersConfig[i];
			const sprite = this.playersPhysics.get(0, 0, config);
			this.players.push(sprite);
			if (sprite) sprite.generate();
		}
	}

	createBlocks() {
		const num = randomNumber(0, 5);
		for (let i = 0; i < num; i++) {
			const block = this.blocks.get(0, 0);
			if (block) block.generate();
		}
	}

	createCollisions() {
		for (let i = 0; i < this.players.length; i++) {
			const player = this.players[i];
			this.physics.add.overlap(this.playersPhysics, player.shoots, this.collisionPlayerShot, null, this); // Players -> Shoots

			if (this.gameConfigs.asteroids) {
				// Shoots -> Asteroids
				this.physics.add.overlap(this.asteroids, player.shoots, this.collisionShootAsteroid, null, this);
			}

			// Shoots -> Block
			if (this.gameConfigs.blocks) this.physics.add.overlap(player.shoots, this.blocks, s => s.destroy(), null, this);
		}

		// Asteroids -> ....
		if (this.gameConfigs.asteroids) {
			// Players -> Asteroids
			this.physics.add.overlap(this.playersPhysics, this.asteroids, this.collisionPlayerAsteroid, null, this);

			// Asteroids -> Asteroids
			this.physics.add.collider(this.asteroids);

			// Asteroids -> Block
			if (this.gameConfigs.blocks) this.physics.add.collider(this.asteroids, this.blocks);
		}
	}

	collisionPlayerShot(player, shoot) {
		if (player.isAlive && player.team !== shoot.team) {
			player.hited();
			shoot.addKill();
			if (shoot.team === "Aliens") this.updateAliensPoints();
			else this.updateShipsPoints();
			shoot.destroy();
		}
	}

	collisionPlayerAsteroid(player, asteroid) {
		if (player.isAlive) {
			player.hited();
			if (player.team !== "Aliens") this.updateAliensPoints();
			else this.updateShipsPoints();
			asteroid.destroy();
		}
	}

	collisionShootAsteroid(asteroid, shoot) {
		asteroid.destroy();
		shoot.destroy();
	}

	updateAliensPoints() {
		this.upPoints++;
		this.aliensPointsLabel.setText(this.upPoints);
		this.aliensPointsLabel.x = GlobalConfigs.screen.middleWidth - this.aliensPointsLabel.width / 2;
	}

	updateShipsPoints() {
		this.downPoints++;
		this.shipsPointsLabel.setText(this.downPoints);
		this.shipsPointsLabel.x = GlobalConfigs.screen.middleWidth - this.shipsPointsLabel.width / 2;
	}

	pauseGame() {
		this.pause = !this.pause;
		if (this.pause) this.physics.pause();
		else this.physics.resume();
	}

	// -- Update
	update(time) {
		if (this.pause) return;

		if (GlobalConfigs.debug) this.showFPSs.setText(Number(this.game.loop.actualFps).toFixed(1));

		if (this.gameConfigs.asteroids && this.lastAsteroids < time) this.generateAsteroids(time);
	}

	generateAsteroids(time) {
		this.lastAsteroids = time + randomNumber(500, 10000);
		const asteroid = this.asteroids.get();
		if (asteroid) asteroid.generate();
	}
}