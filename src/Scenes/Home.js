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
		const background = new Background(this);

		this.isFullScreen = false;

		this.createTitle();
		this.createPlayer();
		this.createButtons();
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
			name: "Player",
			ship: "Victoria",
			team: "Ships",
			teamCount: 0,
			controllers: {
				left: "LEFT",
				right: "RIGHT",
				fire: "UP",
				missile: "DOWN",
			},
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
			},
			{// Team Deathmatch
				x: middleWidth + 250,
				y: middleHeight,
				image: "Button",
				normal: 0,
				exploded: 1,
				text: "TeamDeathmatch",
				style: TextStyle.buttons,
				action: () => this.scene.start("TeamDeathmatch"),
			},

			{// Full Screen
				x: 40,
				y: 40,
				image: "FullScreen",
				normal: 0,
				exploded: 1,
				action: () => this.checkFull(),
			}
		];

		btnsConfigs.map(config => {
			const { x, y, image, normal, exploded, text, style, action } = config;
			const btn = this.physics.add.sprite(x, y, image, normal);

			const label = this.add.text(x, y, text, style);
			label.setOrigin(0.5);

			this.physics.add.overlap(this.player.shoots, btn, (s, b) => {
				b.destroy();
				btn.setFrame(btn.frame.name === exploded ? normal : exploded);
				action();
			}, null, this);
		});
	}

	checkFull() {
		const body = document.body;

		this.isFullScreen ? closeFullscreen() : openFullscreen();
		this.isFullScreen = !this.isFullScreen;

		function openFullscreen() {
			if (body.requestFullscreen) body.requestFullscreen();
			else if (body.webkitRequestFullscreen) body.webkitRequestFullscreen();/* Safari */
			else if (body.msRequestFullscreen) body.msRequestFullscreen();/* IE11 */
			else this.isFullScreen = !this.isFullScreen;
		};

		function closeFullscreen() {
			if (document.exitFullscreen) document.exitFullscreen();
			else if (document.webkitExitFullscreen) document.webkitExitFullscreen(); /* Safari */
			else if (document.msExitFullscreen) document.msExitFullscreen(); /* IE11 */
			else this.isFullScreen = !this.isFullScreen;
		};
	}

	update() {
		// this.background.tilePositionX = Math.cos(this.bgPosition) * 700;
		// this.background.tilePositionY = Math.sin(this.bgPosition) * 500;
		// this.background.rotation += 0.0001;

		// this.bgPosition += 0.0005;
	}
}
