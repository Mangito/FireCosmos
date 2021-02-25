import GlobalConfigs from "../../Config/GlobalConfigs";
import GameConfigs from "./GameConfigs";

import { TextStyle } from "../../Managers/Theme";
import { randomNumber } from "../../Utils/Utils";

import Player from "../../Objects/Player";
import Asteroid from "../../Objects/Asteroid";
import Block from "../../Objects/Blocks";
import Background from "../../Components/Background";

export default class TeamDeathmatch extends Phaser.Scene {
	constructor() {
		super({ key: "TeamDeathmatch" });
	}

	init() {
		this.gameConfigs = GameConfigs.getInstance();
		this.playersConfig = this.gameConfigs.players;

		this.players = [];

		this.upPoints = 0;
		this.downPoints = 0;

		this.pause = false;
	}

	create() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;

		const background = new Background(this);

		if (GlobalConfigs.debug) this.showFPSs = this.add.text(width - 55, 0, 0, TextStyle.base);

		this.aliensPointsLabel = this.add.text(middleWidth, 20, 0, TextStyle.points).setOrigin(0.5);
		this.shipsPointsLabel = this.add.text(middleWidth, height - 20, 0, TextStyle.points).setOrigin(0.5);

		this.createGroups();
		this.createPlayers();
		if (this.gameConfigs.blocks) this.createBlocks();
		this.createCollisions();

		this.timerAsteroids = this.time.addEvent({ delay: randomNumber(750, 2500), callback: this.generateAsteroids, callbackScope: this, loop: true });

		const keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
		keyP.on("down", this.pauseGame, this);

		this.pauseLabel = this.add.text(middleWidth, middleHeight, "Press P to resume/pause", TextStyle.pauseFooter).setOrigin(0.5);
		setTimeout(() => {
			this.pauseLabel.setVisible(false);
		}, 1000);
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

	generateAsteroids() {
		const asteroid = this.asteroids.get();
		if (asteroid) asteroid.generate();
	}

	pauseGame() {
		this.pause = !this.pause;

		if (this.pause) {
			this.timerAsteroids.paused = true;
			this.scene.pause();
			this.physics.pause();
			this.scene.launch("PauseTeamDeathmatch");
			this.pauseLabel.setVisible(true);
		} else {
			this.timerAsteroids.paused = false;
			this.scene.resume();
			this.physics.resume();
			this.pauseLabel.setVisible(false);
		}
	}

	update() {
		if (this.pause) return;
		if (GlobalConfigs.debug) this.showFPSs.setText(Number(this.game.loop.actualFps).toFixed(1));
	}
}
