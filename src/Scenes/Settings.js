import GlobalConfigs from "../Config/GlobalConfigs";
import GlobalState from "../Config/GlobalState";
import EventManager from "../Managers/EventManager";

import Button from "../Components/Button";

import Player from "../Objects/Player";

import { TextStyle } from "../Theme";
import { randomNumber } from "../Utils/Utils";

export default class Settings extends Phaser.Scene {
	constructor() {
		super({ key: "Settings" });
	}

	init() {
		this.globalState = GlobalState.getInstance();
		this.eventManager = EventManager.getInstance();
		this.isPaused = false;
	}

	create() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;

		this.explosionSound = this.sound.add("Explosion");

		this.graphic = this.add.graphics();
		this.graphic.clear();

		this.drawBackground();
		this.drawBorder();

		this.titleLabel = this.add.text(middleWidth, 50, this.globalState.output.settings.settings, TextStyle.subScenesTitle).setOrigin(0.5);

		this.createPlayer();

		this.drawButtons();

		const keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
		keyQ.on("down", this.quitSettings, this);
	}

	drawBackground() {
		const { width, height } = GlobalConfigs.screen;
		const rect = {
			x: 0,
			y: 0,
			width: width,
			height: height,
		};

		const color = {
			color: 0x1C1C1C,
			alpha: 0.75,
		}

		this.graphic.fillStyle(color.color, color.alpha);
		this.graphic.fillRectShape(rect);
	}

	drawBorder() {
		const { middleWidth, middleHeight } = GlobalConfigs.screen;

		const width = 250;
		const height = 125;

		this.borderStyle = {
			x: middleWidth - width,
			y: middleHeight - height,
			width: width * 2,
			height: height * 2,
			color: 0x383838,
			alpha: 0.9,
			border: 10,
			thickness: {
				size: 4,
				color: 0x000000,
				alpha: 1,
			},
		};
		this.graphic.fillStyle(this.borderStyle.color, this.borderStyle.alpha);
		this.graphic.lineStyle(this.borderStyle.thickness.size, this.borderStyle.thickness.color, this.borderStyle.thickness.alpha);
		this.graphic.fillPath(this.borderStyle.color);
		this.graphic.fillRoundedRect(this.borderStyle.x, this.borderStyle.y, this.borderStyle.width, this.borderStyle.height, this.borderStyle.border);
		this.graphic.strokeRoundedRect(this.borderStyle.x, this.borderStyle.y, this.borderStyle.width, this.borderStyle.height, this.borderStyle.border);
	}

	createPlayer() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;

		this.playersPhysics = this.physics.add.group({
			classType: Player,
			runChildUpdate: true,
		});
		const textureShip = GlobalConfigs.textureShips[randomNumber(0, GlobalConfigs.textureShips.length)];
		const config = {
			index: 0,
			name: this.globalState.output.settings.settings,
			ship: textureShip,
			team: "Ships",
			teamCount: 0,
			controllers: GlobalConfigs.controllers[0],
		};

		this.player = this.playersPhysics.get(0, 0, config);
		if (this.player) {
			this.player.generate();
			this.player.y = middleHeight + 80;
			this.player.label.y = this.player.y + this.player.height;
		}
	}

	drawButtons() {
		const { middleWidth, middleHeight } = GlobalConfigs.screen;

		const x = this.borderStyle.x + 100;
		const y = this.borderStyle.y + 50;

		this.buttonsGroup = this.physics.add.group({ classType: Button });

		// --- Full Screen
		const fullScreenBtn = this.buttonsGroup.get();
		if (fullScreenBtn) {
			fullScreenBtn.generate({
				x: x,
				y: y,
				image: "FullScreen",
			});
			fullScreenBtn.action = () => {
				this.explosionSound.play();
				fullScreenBtn.changeFrame();
				this.scale.isFullscreen ? this.scale.stopFullscreen() : this.scale.startFullscreen();
			}
		}

		// --- Language
		const languageBtn = this.buttonsGroup.get();
		if (languageBtn) {
			languageBtn.generate({
				x: x + 100,
				y: y,
				image: "Flags",
				startFrame: (this.globalState.language === "pt" ? 1 : 0),
			});
			languageBtn.action = () => {
				this.explosionSound.play();
				languageBtn.changeFrame();
				this.globalState.language = (this.globalState.language === "pt" ? "en" : "pt");
				this.updateLabels();
			}
		}

		// --- Sound
		const soundBtn = this.buttonsGroup.get();
		if (soundBtn) {
			soundBtn.generate({
				x: x + 200,
				y: y,
				image: "Sound",
				startFrame: (this.globalState.isMute ? 1 : 0),
			});
			soundBtn.action = () => {
				this.explosionSound.play();
				soundBtn.changeFrame();

				this.globalState.isMute = !this.globalState.isMute;
				this.game.sound.mute = this.globalState.isMute;
			}
		}

		// --- Exit
		const exitBtn = this.buttonsGroup.get();
		if (exitBtn) {
			exitBtn.generate({
				x: x + 300,
				y: y,
				image: "Exit",
			});
			exitBtn.action = () => {
				this.explosionSound.play();
				this.quitSettings();
			}
		}

		this.physics.add.overlap(this.player.shoots, this.buttonsGroup, (s, b) => {
			s.destroy();
			b.action();
		});
	}

	updateLabels() {
		this.titleLabel.setText(this.globalState.output.settings.settings);
		this.player.label.setText(this.globalState.output.settings.settings);
		this.eventManager.dispatch("changeLanguage");
	}

	quitSettings() {
		this.scene.resume("Home");
		this.scene.stop();
	}
}
