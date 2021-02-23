import GlobalConfigs from "../Config/GlobalConfigs";
import Player from "../Objects/Player";

import { TextStyle } from "../Managers/Theme";
import Background from "../Objects/Background";
export default class Home extends Phaser.Scene {
	constructor() {
		super({ key: "Home" });
	}

	preload() { }

	create() {
		const { middleWidth, middleHeight } = GlobalConfigs.screen;

		const background = new Background(this);

		this.isFullScreen = false;

		this.createTitle();
		this.createPlayer();
		this.createButtons();

		const keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
		keyP.on("down", this.pauseGame, this);
		this.pauseLabel = this.add.text(middleWidth, middleHeight, "Press P to resume", TextStyle.pauseFooter).setOrigin(0.5).setVisible(false);

		this.scene.launch("Settings");
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
		const { middleWidth, middleHeight } = GlobalConfigs.screen;

		const btnsConfigs = [
			{	// Survive
				x: middleWidth - 250,
				y: middleHeight,
				image: "Button",
				normal: 0,
				exploded: 1,
				text: "Survive",
				style: TextStyle.buttons,
				action: () => this.scene.start("Survive"),
				yoyo: false,
			},

			{ // Team Deathmatch
				x: middleWidth + 250,
				y: middleHeight,
				image: "Button",
				normal: 0,
				exploded: 1,
				text: "TeamDeathmatch",
				style: TextStyle.buttons,
				action: () => this.scene.start("CustomizeTeamDeathmatch"),
				yoyo: false,
			},

			{ // Settings
				x: 40,
				y: 40,
				image: "Settings",
				normal: 0,
				exploded: 1,
				action: () => {
					this.scene.pause();
					this.physics.pause();
					this.scene.launch("Settings");
					this.pauseLabel.setVisible(true);
				},
				yoyo: true,
			}
		];

		btnsConfigs.map(config => {
			const { x, y, image, normal, exploded, text, style, action, yoyo } = config;
			const btn = this.physics.add.sprite(x, y, image, normal);

			const label = this.add.text(x, y, text, style).setOrigin(0.5);

			this.physics.add.overlap(this.player.shoots, btn, (b, s) => {
				s.destroy();

				btn.setFrame(btn.frame.name === exploded ? normal : exploded);
				action();

				if (yoyo) setTimeout(() => btn.setFrame(normal), 1000);
			}, null, this);

		});
	}

	pauseGame() {
		this.physics.resume();
		this.pauseLabel.setVisible(false);
	}
}
