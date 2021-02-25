import GlobalConfigs from "../../Config/GlobalConfigs";
import GameConfigs from "./GameConfigs";

import { TextStyle } from "../../Managers/Theme";
import { randomNumber } from "../../Utils/Utils";

import Background from "../../Components/Background";

import Player from "../../Objects/Player";
import Aliens from "../../Objects/Aliens";

export default class Survive extends Phaser.Scene {
	constructor() {
		super({ key: "Survive" });
	}

	init() {
		this.gameConfigs = GameConfigs.getInstance();
		this.playersConfig = this.gameConfigs.players;

		this.players = [];

		this.currentLevel = 1;
		this.totalAliens = 0;
		this.enemyLevel = [];
	}

	create() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;

		const background = new Background(this);

		if (GlobalConfigs.debug) this.showFPSs = this.add.text(width - 55, 0, 0, TextStyle.base);

		this.aliensGroup = this.physics.add.group({
			classType: Aliens,
			// collideWorldBounds: true,
			runChildUpdate: true,
		});

		this.createPlayers();

		this.physics.add.overlap(this.aliensGroup, this.playersGroup, this.pauseGame, null, this); // Aliens -> Players
		this.physics.add.collider(this.aliensGroup); // Aliens

		const keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
		keyP.on("down", this.pauseGame, this);

		this.timerAliens = this.time.addEvent({ delay: 500, callback: this.createAlien, callbackScope: this, loop: true });

		const survive = this.add.text(middleWidth, 30, "Survive").setOrigin(0.5);
		this.statusLabel = this.add.text(middleWidth, middleHeight, "Survive").setOrigin(0.5).setVisible(false);

		this.currentLevelLabel = this.add.text(10, 10, "Currente Level: " + this.currentLevel);
		this.totalAliensLabel = this.add.text(width - 200, 10, "Total enemies: " + this.totalAliens);

		this.newLevel();
	}

	createPlayers() {
		// Create Group
		this.playersGroup = this.physics.add.group({
			classType: Player,
			runChildUpdate: true,
		});

		// Draw
		for (let i = 0; i < this.playersConfig.length; i++) {
			const config = this.playersConfig[i];
			const sprite = this.playersGroup.get(0, 0, config);
			if (sprite) {
				sprite.generate();
				this.players.push(sprite);
			}
		}

		// Collision
		for (let i = 0; i < this.players.length; i++) {
			const player = this.players[i];
			this.physics.add.overlap(this.aliensGroup, player.shoots, (a, s) => this.alienShootCollision(a, s, player)); // Shoots -> Aliens
		}
	}

	alienShootCollision(a, s, player) {
		a.removeLife();
		s.destroy();

		if (a.life <= 0) {
			this.totalAliens--;
			this.totalAliensLabel.setText("Total enemies: " + this.totalAliens);
			player.addKill();
			player.label.setText(player.kills);
		}
	}

	newLevel() {
		// const randomNumTexture = randomNumber(0, GlobalConfigs.textureAliens.length);

		this.statusLabel.setText(this.currentLevel > 1 ? "Level Completed!!" : "Survive");
		this.statusLabel.setVisible(true);
		this.tweens.add({
			targets: this.statusLabel,
			duration: 2500,
			alpha: { from: 1, to: 0 },
		});


		this.currentLevelLabel.setText("Currente Level: " + this.currentLevel);

		switch (this.currentLevel) {
			case 1:
				for (let i = 0; i < 4; i++) {
					this.enemyLevel.push(0);
					// this.createAlien(0);
				}
				break;

			case 2:
				for (let i = 0; i < 4; i++) {
					this.enemyLevel.push(0);
					// this.createAlien(0);
				}
				for (let i = 0; i < 4; i++) {
					this.enemyLevel.push(1);
					// this.createAlien(1);
				}
				break;

			case 3:
				for (let i = 0; i < 6; i++) {
					this.enemyLevel.push(0);
					// this.createAlien(0);
					for (let i = 0; i < 2; i++) {
						this.enemyLevel.push(1);
						// this.createAlien(1);
					}
				}
				break;

			default:
				break;
		}

		this.totalAliens = this.enemyLevel.length;
		this.totalAliensLabel.setText("Total enemies: " + this.totalAliens);
	}

	createAlien() {
		if (!this.enemyLevel.length) return;

		const alien = this.aliensGroup.get(0, 0, this.enemyLevel[0]);
		if (alien) {
			this.enemyLevel.shift();
			alien.generate();
		}
	}

	pauseGame() {
		this.pause = !this.pause;

		if (this.pause) {
			this.timerAliens.paused = true;
			this.physics.pause();
			// this.scene.launch("PauseTeamDeathmatch");
			// this.pauseLabel.setVisible(true);
		} else {
			this.timerAliens.paused = false;
			this.physics.resume();
			// this.pauseLabel.setVisible(false);
		}
	}

	update() {
		if (this.pause) return;

		if (GlobalConfigs.debug) this.showFPSs.setText(Number(this.game.loop.actualFps).toFixed(1));

		if (this.totalAliens <= 0) {
			this.currentLevel++;
			this.newLevel();
		}
	}
}
