import GlobalConfigs from "../../Config/GlobalConfigs";
import GameConfigs from "./GameConfigs";
import GlobalState from "../../Config/GlobalState";

import { TextStyle } from "../../Theme";
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

		this.language = GlobalState.getInstance().output;

		this.players = [];

		this.upPoints = 0;
		this.downPoints = 0;
		this.endGamePoints = 5; // Game ends on some team get this points

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

		this.createKeys();

		const howWinText = this.language.teamDeathmatch.howWin;
		this.statusLabel = this.add.text(middleWidth, middleHeight,
			howWinText[0] + this.endGamePoints + howWinText[1],
			TextStyle.statusLabelLittle).setOrigin(0.5);

		this.statusLabelPauseTween = this.tweens.add({
			targets: this.statusLabel,
			duration: 3000,
			alpha: { from: 1, to: 0 },
			onComplete: () => {
				this.statusLabel.setVisible(this.pause);
				this.statusLabel.setAlpha(1);
				this.statusLabel.setText(this.language.invasion.pause);
			},
		});
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

			// Players -> Shoots
			this.physics.add.overlap(
				this.playersPhysics, player.shoots,
				(dead, shoot) => { this.collisionPlayerShot(dead, shoot, player); },
				null, this);

			// Shoots -> Asteroids
			if (this.gameConfigs.asteroids) {
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

	collisionPlayerShot(dead, shoot, killer) {
		if (dead.isAlive && dead.team !== shoot.team) {
			dead.hited();
			if (shoot.team === "Aliens") this.updateAliensPoints();
			else this.updateShipsPoints();
			shoot.destroy();

			killer.addKill();
			killer.label.setText(killer.kills);
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

		if (this.upPoints >= this.endGamePoints) this.endGame();
	}

	updateShipsPoints() {
		this.downPoints++;
		this.shipsPointsLabel.setText(this.downPoints);
		this.shipsPointsLabel.x = GlobalConfigs.screen.middleWidth - this.shipsPointsLabel.width / 2;

		if (this.downPoints >= this.endGamePoints) this.endGame();
	}

	generateAsteroids() {
		const asteroid = this.asteroids.get();
		if (asteroid) asteroid.generate();
	}

	createKeys() {
		// Get Keys
		const keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
		const keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
		const keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

		// Remove  Listeners
		removeKeysListener();

		// Add Listeners
		keyP.on("down", this.pauseGame, this);
		keyQ.on("down", () => {
			if (!this.pause) return;
			removeKeysListener();
			this.scene.start("Home");
			this.scene.stop();
		});
		keyR.on("down", () => {
			if (!this.pause) return;
			removeKeysListener();
			this.scene.restart();
		});

		function removeKeysListener() {
			keyQ.removeAllListeners();
			keyP.removeAllListeners();
			keyR.removeAllListeners();
		}
	}

	pauseGame() {
		this.pause = !this.pause;

		if (this.pause) {
			this.timerAsteroids.paused = true;
			this.physics.pause();
			this.statusLabel.setVisible(true);
			this.statusLabel.setText(this.language.invasion.pause);

			this.statusLabelPauseTween = this.tweens.add({
				targets: this.statusLabel,
				repeat: -1,
				duration: 1500,
				yoyo: true,
				alpha: { from: 1, to: 0.25 },
			});

		} else {
			this.timerAsteroids.paused = false;
			this.physics.resume();
			this.statusLabel.setVisible(false);
			this.statusLabelPauseTween.stop();
		}
	}

	endGame() {
		const output = this.upPoints > this.downPoints ? this.language.teamDeathmatch.aliensWin : this.language.teamDeathmatch.shipsWin;
		this.statusLabel.setVisible(true);
		this.statusLabel.setText(`${output[0]} \n ${output[1]} \n ${this.language.teamDeathmatch.exit}`);
		this.statusLabel.setStyle(TextStyle.loseGame);

		this.statusLabelPauseTween = this.tweens.add({
			targets: this.statusLabel,
			repeat: -1,
			duration: 1500,
			yoyo: true,
			alpha: { from: 1, to: 0.5 },
		});

		this.pause = true;
		this.physics.pause();
		this.keyP.removeAllListeners();
		this.timerAsteroids.paused = true;
	}

	update() {
		if (this.pause) return;
		if (GlobalConfigs.debug) this.showFPSs.setText(Number(this.game.loop.actualFps).toFixed(1));
	}
}
