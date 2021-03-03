import GlobalConfigs from "../Config/GlobalConfigs";
import GlobalState from "../Config/GlobalState";

import Key from "../Components/Key";

import { TextStyle } from "../Theme";
import { randomNumber } from "../Utils/Utils";

export default class Info extends Phaser.Scene {
	constructor() {
		super({ key: "Info" });
	}

	init() {
		this.language = GlobalState.getInstance().output;
	}

	create() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;

		this.graphic = this.add.graphics();
		this.graphic.clear();

		this.drawBackground();
		this.drawBorder();
		this.drawPlayers();

		const infoLabel = this.add.text(middleWidth, 50, this.language.info.info, TextStyle.subScenesTitle).setOrigin(0.5);

		this.animationTipsLabel();

		const keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
		keyQ.on("down", this.quitInfo, this);
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
		const height = 200;

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
				color: 0xdd0000,
				alpha: 1,
			},
		};
		this.graphic.fillStyle(this.borderStyle.color, this.borderStyle.alpha);
		this.graphic.lineStyle(this.borderStyle.thickness.size, this.borderStyle.thickness.color, this.borderStyle.thickness.alpha);
		this.graphic.fillPath(this.borderStyle.color);
		this.graphic.fillRoundedRect(this.borderStyle.x, this.borderStyle.y, this.borderStyle.width, this.borderStyle.height, this.borderStyle.border);
		this.graphic.strokeRoundedRect(this.borderStyle.x, this.borderStyle.y, this.borderStyle.width, this.borderStyle.height, this.borderStyle.border);
	}

	drawPlayers() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;

		// Players
		const playerMarginX = 180;
		const playerMarginY = 150;
		const marginName = 26;
		const marginControllersX = 40;
		const marginControllersY = 40;

		{ // P1
			const controllers = GlobalConfigs.controllers[0];
			const p1 = this.add.image(middleWidth - playerMarginX, middleHeight + playerMarginY, "BlackPearl");
			this.add.text(p1.x, p1.y + marginName, "P1", TextStyle.base).setOrigin(0.5);

			this.createImage({ x: p1.x, y: p1.y - marginControllersY, text: controllers.fire });
			this.createImage({ x: p1.x - marginControllersX, y: p1.y, text: controllers.left });
			this.createImage({ x: p1.x + marginControllersX, y: p1.y, text: controllers.right });
		}

		{ // P2
			const controllers = GlobalConfigs.controllers[1];
			const p2 = this.add.image(middleWidth - playerMarginX, middleHeight - playerMarginY, "Olho");
			this.add.text(p2.x, p2.y - marginName, "P2", TextStyle.base).setOrigin(0.5);


			this.createImage({ x: p2.x, y: p2.y + marginControllersY, text: controllers.fire });
			this.createImage({ x: p2.x - marginControllersX, y: p2.y, text: controllers.left });
			this.createImage({ x: p2.x + marginControllersX, y: p2.y, text: controllers.right });
		}

		{ // P3
			const controllers = GlobalConfigs.controllers[2];
			const p3 = this.add.image(middleWidth + playerMarginX, middleHeight + playerMarginY, "Ceuta");
			this.add.text(p3.x, p3.y + marginName, "P3", TextStyle.base).setOrigin(0.5);

			this.createImage({ x: p3.x, y: p3.y - marginControllersY, text: controllers.fire });
			this.createImage({ x: p3.x - marginControllersX, y: p3.y, text: controllers.left });
			this.createImage({ x: p3.x + marginControllersX, y: p3.y, text: controllers.right });
		}

		{ // P4
			const controllers = GlobalConfigs.controllers[3];
			const p4 = this.add.image(middleWidth + playerMarginX, middleHeight - playerMarginY, "Ravi");
			this.add.text(p4.x, p4.y - marginName, "P4", TextStyle.base).setOrigin(0.5);

			this.createImage({ x: p4.x, y: p4.y + marginControllersY, text: controllers.fire });
			this.createImage({ x: p4.x - marginControllersX, y: p4.y, text: controllers.left });
			this.createImage({ x: p4.x + marginControllersX, y: p4.y, text: controllers.right });
		}

		{	// Fire
			const fireImage = this.add.image(middleWidth + playerMarginX, middleHeight + playerMarginY - 100, "Fire");  // P3 Position
			this.add.text(fireImage.x, fireImage.y + marginName, this.language.info.fire, TextStyle.base).setOrigin(0.5);
		}

		{	// Asteroid
			const asteroidImage = this.add.image(middleWidth + 100, middleHeight - 100, "Asteroid");
			this.add.text(asteroidImage.x, asteroidImage.y + marginName, this.language.info.asteroid, TextStyle.base).setOrigin(0.5);
		}

		{	// Block
			const blockImage = this.add.image(middleWidth - 100, middleHeight + 50, "Block");
			this.add.text(blockImage.x, blockImage.y + marginName, this.language.info.block, TextStyle.base).setOrigin(0.5);
		}

		// Keyboard shortcuts
		{	// Pause
			const config = { x: middleWidth - 300, y: middleHeight - 100, text: "P" };
			this.createImage(config);
			this.add.text(config.x, config.y + marginName, this.language.info.pauseKey, TextStyle.base).setOrigin(0.5);
		}

		{	// Restart
			const config = { x: middleWidth - 300, y: middleHeight + 100, text: "R" };
			this.createImage(config);
			this.add.text(config.x, config.y + marginName, this.language.info.restartKey, TextStyle.base).setOrigin(0.5);
		}

		{	// Exit
			const config = { x: middleWidth + 300, y: middleHeight, text: "Q" };
			this.createImage(config);
			this.add.text(config.x, config.y + marginName, this.language.info.exitKey, TextStyle.base).setOrigin(0.5);
		}
	}

	createImage(configs) {
		const key = this.add.existing(new Key(this, configs.x, configs.y));
		key.generate(configs);
	}

	animationTipsLabel() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;

		this.tipsLabel = this.add.text(middleWidth, middleHeight, this.language.info.exit, TextStyle.info.tips).setOrigin(0.5);
		this.tweens.add({
			targets: this.tipsLabel,
			alpha: { start: 1, to: 0 },
			ease: "Linear",
			duration: 5000,
			repeat: -1,
			yoyo: true,
			onYoyo: () => {
				const randomTip = this.language.types[randomNumber(0, this.language.types.length)];
				this.tipsLabel.setText(randomTip);
			},
		});
	}

	quitInfo() {
		this.scene.resume("Home");
		this.scene.stop();
	}
}
