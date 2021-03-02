import GlobalConfigs from "../../Config/GlobalConfigs";
import GameConfigs from "./GameConfigs";
import GlobalState from "../../Config/GlobalState";

import { TextStyle } from "../../Theme";
import { randomNumber } from "../../Utils/Utils";

import Background from "../../Components/Background";

import Player from "../../Objects/Player";
import Aliens from "../../Objects/Aliens";

export default class Invasion extends Phaser.Scene {
	constructor() {
		super({ key: "Invasion" });
	}

	init() {
		this.gameConfigs = GameConfigs.getInstance();
		this.playersConfig = this.gameConfigs.players;

		this.language = GlobalState.getInstance().output;

		this.statusLabelPauseTween = null;

		this.players = [];

		this.pause = false;

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
			runChildUpdate: true,
		});

		this.createPlayers();

		this.physics.add.overlap(this.aliensGroup, this.playersGroup, this.endGame, null, this); // Aliens -> Players

		const keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
		keyP.on("down", this.pauseGame, this);

		const keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
		keyQ.on("down", () => {
			if (!this.pause) return;
			keyP.removeAllListeners();
			this.scene.start("Home");
			this.scene.stop();
		});

		this.timerAliens = this.time.addEvent({ delay: 500, callback: this.createAlien, callbackScope: this, loop: true });

		const invasion = this.add.text(middleWidth, 30, this.language.invasion.invasion, TextStyle.invasionTitle).setOrigin(0.5);
		this.statusLabel = this.add.text(middleWidth, middleHeight, this.language.invasion.level + "1!", TextStyle.statusLabel).setOrigin(0.5).setVisible(false);

		this.currentLevelLabel = this.add.text(10, 10, this.language.invasion.currentLevel + this.currentLevel, TextStyle.points);
		this.totalAliensLabel = this.add.text(width - 250, 10, this.language.invasion.totalEnemies + this.totalAliens, TextStyle.points);

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
			this.totalAliensLabel.setText(this.language.invasion.totalEnemies + this.totalAliens);
			player.addKill();
			player.label.setText(player.kills);
		}
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
			this.timerAliens.paused = false;
			this.physics.resume();
			this.statusLabel.setVisible(false);
			this.statusLabelPauseTween.stop();
		}
	}

	endGame() {
		this.statusLabel.setVisible(true);
		this.statusLabel.setText(`${this.language.invasion.endGame} \n ${this.language.info.exit}`);
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
		this.timerAliens.paused = true;
	}

	update() {
		if (this.pause) return;

		if (GlobalConfigs.debug) this.showFPSs.setText(Number(this.game.loop.actualFps).toFixed(1));

		if (this.totalAliens <= 0) {
			this.currentLevel++;
			this.newLevel();
		}
	}

	// ----------------------------------------------------------------
	newLevel() {
		this.statusLabel.setText(this.currentLevel > 1 ? this.language.invasion.levelCompleted : this.language.invasion.invasion);
		this.statusLabel.setVisible(true);
		this.tweens.add({
			targets: this.statusLabel,
			duration: 2500,
			alpha: { from: 1, to: 0 },
		});

		this.currentLevelLabel.setText(this.language.invasion.currentLevel + this.currentLevel);

		const numPlayers = this.playersConfig.length;
		switch (this.currentLevel) {
			case 1:
				for (let i = 0; i < 4 * numPlayers; i++) {
					this.enemyLevel.push(0);
				}
				break;

			case 2:
				for (let i = 0; i < 4 * numPlayers; i++) {
					this.enemyLevel.push(0);
				}
				for (let i = 0; i < 3 * numPlayers; i++) {
					this.enemyLevel.push(1);
				}
				break;

			case 3:
				for (let i = 0; i < 2 * numPlayers; i++) {
					this.enemyLevel.push(1);
					for (let i = 0; i < 2 * numPlayers; i++) {
						this.enemyLevel.push(0);
					}
				}
				break;

			case 4:
				for (let i = 0; i < 6 * numPlayers; i++) {
					this.enemyLevel.push(0);
					for (let i = 0; i < 1 * numPlayers; i++) {
						this.enemyLevel.push(1);
					}
				}
				break;

			case 5:
				for (let i = 0; i < 20 * numPlayers; i++) {
					this.enemyLevel.push(0);
				}
				for (let i = 0; i < 10 * numPlayers; i++) {
					this.enemyLevel.push(1);
				}
				for (let i = 0; i < 5 * numPlayers; i++) {
					this.enemyLevel.push(2);
				}
				break;

			case 6:
				for (let i = 0; i < 4 * numPlayers; i++) {
					this.enemyLevel.push(2);
					for (let i = 0; i < 2; i++) {
						this.enemyLevel.push(1);
						for (let i = 0; i < 1 * numPlayers; i++) {
							this.enemyLevel.push(0);
						}
					}
				}
				break;

			case 7:
				for (let i = 0; i < 1 * numPlayers; i++) {
					this.enemyLevel.push(0);
					for (let i = 0; i < 2 * numPlayers; i++) {
						this.enemyLevel.push(1);
						for (let i = 0; i < 3 * numPlayers; i++) {
							this.enemyLevel.push(2);
						}
					}
				}
				break;

			case 8:
				for (let i = 0; i < 2 * numPlayers; i++) {
					this.enemyLevel.push(1);
					for (let i = 0; i < 4 * numPlayers; i++) {
						this.enemyLevel.push(0);
					}
					for (let i = 0; i < 4 * numPlayers; i++) {
						this.enemyLevel.push(3);
					}
				}
				break;

			case 9:
				for (let i = 0; i < 20 * numPlayers; i++) {
					this.enemyLevel.push(0);
				}
				for (let i = 0; i < 20 * numPlayers; i++) {
					this.enemyLevel.push(1);
				}
				for (let i = 0; i < 20 * numPlayers; i++) {
					this.enemyLevel.push(2);
				}
				for (let i = 0; i < 20 * numPlayers; i++) {
					this.enemyLevel.push(3);
				}
				break;

			case 10:
				for (let i = 0; i < 1 * numPlayers; i++) {
					this.enemyLevel.push(3);
					for (let i = 0; i < 1 * numPlayers; i++) {
						this.enemyLevel.push(2);
						for (let i = 0; i < 1 * numPlayers; i++) {
							this.enemyLevel.push(1);
							for (let i = 0; i < 2 * numPlayers; i++) {
								this.enemyLevel.push(0);
							}
						}
					}
				}
				break;

			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
				const randomEnemysLevel = randomNumber(this.currentLevel * numPlayers * 5, this.currentLevel * numPlayers * 15);
				for (let i = 0; i < randomEnemysLevel; i++) {
					const randomNumTexture = randomNumber(0, GlobalConfigs.textureAliens.length);
					this.enemyLevel.push(randomNumTexture);
				}
				break;

			default:
				const enemysMax = this.currentLevel * numPlayers * 15;

				for (let i = 0; i < 10; i++) {
					this.enemyLevel.push(1);
				}
				for (let i = 0; i < 10; i++) {
					this.enemyLevel.push(3);
				}
				for (let i = 0; i < 10; i++) {
					this.enemyLevel.push(0);
				}
				for (let i = 0; i < 10; i++) {
					this.enemyLevel.push(2);
				}

				for (let i = 0; i < enemysMax; i++) {
					const randomNumTexture = randomNumber(0, GlobalConfigs.textureAliens.length);
					this.enemyLevel.push(randomNumTexture);
				}

				for (let i = 0; i < 10; i++) {
					this.enemyLevel.push(3);
				}
				for (let i = 0; i < 10; i++) {
					this.enemyLevel.push(1);
				}
				break;
		}

		this.totalAliens = this.enemyLevel.length;
		this.totalAliensLabel.setText(this.language.invasion.totalEnemies + this.totalAliens);
	}
}
