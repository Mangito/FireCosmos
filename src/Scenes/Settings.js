import GlobalConfigs from "../Config/GlobalConfigs";
import GlobalState from "../Config/GlobalState";

import Player from "../Objects/Player";

import { TextStyle } from "../Managers/Theme";

export default class Settings extends Phaser.Scene {
	constructor() {
		super({ key: "Settings" });
	}

	init() {
		this.globalState = GlobalState.getInstance();
	}

	create() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;

		this.graphic = this.add.graphics();
		this.graphic.clear();

		this.drawBackground();
		this.drawBorder();

		const titleLabel = this.add.text(middleWidth, 50, "Settings", TextStyle.subScenesTitle).setOrigin(0.5);

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
		const config = {
			index: 0,
			name: this.globalState.language === "pt" ? "Definições" : "Settings",
			ship: "MilleniumFalcon",
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

		const btnsConfigs = [
			{ // Full Screen
				x: x,
				y: y,
				image: "FullScreen",
				normal: 0,
				exploded: 1,
				action: () => this.scale.isFullscreen ? this.scale.stopFullscreen() : this.scale.startFullscreen(),
			},

			{ // Language
				x: x + 100,
				y: y,
				image: "Flags",
				normal: (this.globalState.language === "pt" ? 1 : 0),
				exploded: (this.globalState.language === "pt" ? 0 : 1),
				action: () => {
					this.globalState.language = (this.globalState.language === "pt" ? "en" : "pt");
					this.player.label.setText(this.globalState.language === "pt" ? "Definições" : "Settings");
				},
			},

			{ // Sound
				x: x + 200,
				y: y,
				image: "Sound",
				normal: (this.globalState.isMute ? 1 : 0),
				exploded: (this.globalState.isMute ? 0 : 1),
				action: () => {
					this.globalState.isMute = !this.globalState.isMute;
					this.game.sound.mute = this.globalState.isMute;
				},
			},

			{ // Exit Settings
				x: x + 300,
				y: y,
				image: "Exit",
				normal: 0,
				exploded: 1,
				action: () => {
					this.quitSettings();
				},
			},
		];

		btnsConfigs.map(config => {
			const { x, y, image, normal, exploded, text, style, action } = config;
			const btn = this.physics.add.sprite(x, y, image, normal);

			const label = this.add.text(x, y, text, style).setOrigin(0.5);

			this.physics.add.overlap(this.player.shoots, btn, (b, s) => {
				s.destroy();

				btn.setFrame(btn.frame.name === exploded ? normal : exploded);
				action();
			}, null, this);
		});
	}

	quitSettings() {
		this.scene.resume("Home");
		this.scene.stop();
	}
}
