import GlobalConfigs from "../Config/GlobalConfigs";

import Button from "../Components/Button";

import Player from "../Objects/Player";

import TDGameConfigs from "./TeamDeathmatch/GameConfigs";
import SurviveGameConfigs from "./Survive/GameConfigs";

import { TextStyle } from "../Managers/Theme";
import Background from "../Components/Background";
export default class Home extends Phaser.Scene {
	constructor() {
		super({ key: "Home" });
	}

	create() {
		const { middleWidth, middleHeight } = GlobalConfigs.screen;

		const background = new Background(this);

		this.createTitle();
		this.createPlayer();
		this.createButtons();

		const keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
		keyP.on("down", this.pauseGame, this);

		const text = `  Move in arrows left and right; \n
		Select in arrow up;`;
		this.statusLabel = this.add.text(middleWidth, middleHeight + 150, text, TextStyle.statusLabelLittle).setOrigin(0.5);
		this.tweens.add({
			targets: this.statusLabel,
			duration: 10000,
			alpha: { from: 1, to: 0 },
			onComplete: () => {
				this.statusLabel.setText("Press P to resume");
				this.statusLabel.setVisible(false);
			}
		});
	}

	createTitle() {
		const { middleWidth } = GlobalConfigs.screen;

		const fireCosmos = this.add.text(middleWidth, 100, "Fire Cosmos", TextStyle.fireCosmos);
		fireCosmos.setOrigin(0.5, 0.5);
		this.tweens.add({
			targets: fireCosmos,
			duration: 5000,
			scale: { from: 0.5, to: 1 },
			onComplete: () => {
				this.tweens.add({
					targets: fireCosmos,
					duration: 500,
					scale: { from: 1, to: 2 },
					yoyo: true,
				});
			}
		});
		this.tweens.add({
			targets: fireCosmos,
			duration: 100,
			repeat: 20,
			x: { from: middleWidth - 10, to: middleWidth + 10 },
			yoyo: true,
			onComplete: () => {
				fireCosmos.x = middleWidth;
			}
		});
	}

	createPlayer() {
		this.playersPhysics = this.physics.add.group({
			classType: Player,
			runChildUpdate: true,
		});
		const config = {
			index: 0,
			name: "Home",
			ship: "Victoria",
			team: "Ships",
			teamCount: 0,
			controllers: GlobalConfigs.controllers[0],
		};

		this.player = this.playersPhysics.get(0, 0, config);
		if (this.player) this.player.generate();
	}

	createButtons() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;
		const tDGameConfigs = TDGameConfigs.getInstance();
		const surviveGameConfigs = SurviveGameConfigs.getInstance();

		this.buttonsGroup = this.physics.add.group({ classType: Button });

		// --- Settings
		const settingsBtn = this.buttonsGroup.get();
		if (settingsBtn) {
			settingsBtn.generate({
				x: 40,
				y: 40,
				image: "Settings",
			});
			settingsBtn.action = () => {
				settingsBtn.changeFrame(true);
				this.scene.pause();
				this.physics.pause();
				this.scene.launch("Settings");
				this.statusLabel.setVisible(true);
			}
		}

		// --- Info
		const infoBtn = this.buttonsGroup.get();
		if (infoBtn) {
			infoBtn.generate({
				x: width - 40,
				y: 40,
				image: "QuestionMark",
			});
			infoBtn.action = () => {
				infoBtn.changeFrame(true);
				this.scene.pause();
				this.physics.pause();
				this.scene.launch("Info");
				this.statusLabel.setVisible(true);
			}
		}

		{ // --- Survive
			const startX = middleWidth - 250;
			const scale = 0.25;

			const _1P = this.buttonsGroup.get();
			if (_1P) {
				_1P.generate({
					x: startX - 150,
					y: middleHeight + 70,
					image: "Button",
					text: "1P",
					style: TextStyle.buttons,
				});

				_1P.action = () => {
					_1P.changeFrame();
					surviveGameConfigs.createPlayers(1);
					this.scene.start("Survive");
				};

				_1P.setScale(scale);
				_1P.changeVisible(false);
			}

			const _2P = this.buttonsGroup.get();
			if (_2P) {
				_2P.generate({
					x: startX - 50,
					y: middleHeight + 70,
					image: "Button",
					text: "2P",
					style: TextStyle.buttons,
				});
				_2P.action = () => {
					_2P.changeFrame();
					surviveGameConfigs.createPlayers(2);
					this.scene.start("Survive");
				};

				_2P.setScale(scale);
				_2P.changeVisible(false);
			}

			const _3P = this.buttonsGroup.get();
			if (_3P) {
				_3P.generate({
					x: startX + 50,
					y: middleHeight + 70,
					image: "Button",
					text: "3P",
					style: TextStyle.buttons,
				});
				_3P.action = () => {
					_3P.changeFrame();
					surviveGameConfigs.createPlayers(3);
					this.scene.start("Survive");
				};

				_3P.setScale(scale);
				_3P.changeVisible(false);
			}

			const _4P = this.buttonsGroup.get();
			if (_4P) {
				_4P.generate({
					x: startX + 150,
					y: middleHeight + 70,
					image: "Button",
					text: "4P",
					style: TextStyle.buttons,
				});
				_4P.action = () => {
					_4P.changeFrame();
					surviveGameConfigs.createPlayers(4);
					this.scene.start("Survive");
				};

				_4P.setScale(scale);
				_4P.changeVisible(false);
			}

			const surviveBtn = this.buttonsGroup.get();
			if (surviveBtn) {
				surviveBtn.generate({
					x: startX,
					y: middleHeight,
					image: "Button",
					text: "Survive",
					style: TextStyle.buttons,
				});
				surviveBtn.action = () => {
					surviveBtn.changeFrame();

					const visible = !_1P.visible;
					_1P.changeVisible(visible);
					_2P.changeVisible(visible);
					_3P.changeVisible(visible);
					_4P.changeVisible(visible);
				};
			}
		}

		{// --- Team Deathmatch
			const startX = middleWidth + 250;

			const _2P = this.buttonsGroup.get();
			if (_2P) {
				_2P.generate({
					x: startX - 50,
					y: middleHeight + 70,
					image: "Button",
					text: "2P",
					style: TextStyle.buttons,
				});
				_2P.action = () => {
					_2P.changeFrame();
					tDGameConfigs.default2P();
					this.scene.start("TeamDeathmatch");
				};

				_2P.setScale(0.35);
				_2P.changeVisible(false);
			}

			const _4P = this.buttonsGroup.get();
			if (_4P) {
				_4P.generate({
					x: startX + 50,
					y: middleHeight + 70,
					image: "Button",
					text: "4P",
					style: TextStyle.buttons,
				});
				_4P.action = () => {
					_4P.changeFrame();
					tDGameConfigs.default4P();
					this.scene.start("TeamDeathmatch");
				};

				_4P.setScale(0.35);
				_4P.changeVisible(false);
			}

			const teamDeathmatch = this.buttonsGroup.get();
			if (teamDeathmatch) {
				teamDeathmatch.generate({
					x: startX,
					y: middleHeight,
					image: "Button",
					text: "TeamDeathmatch",
					style: TextStyle.buttons,
				});
				teamDeathmatch.action = () => {
					teamDeathmatch.changeFrame();

					const visible = !_2P.visible;
					_2P.changeVisible(visible);
					_4P.changeVisible(visible);
				};
			}
		}

		this.physics.add.overlap(this.player.shoots, this.buttonsGroup, (s, b) => {
			s.destroy();
			b.action();
		});
	}

	pauseGame() {
		this.physics.resume();
		this.statusLabel.setVisible(false);
	}
}
