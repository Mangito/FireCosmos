import GlobalConfigs from "../Config/GlobalConfigs";

import Assets from "../Managers/Assets";

export default class Preload extends Phaser.Scene {
	constructor() {
		super({ key: "Preload" });
	}

	preload() {
		this.drawProgress();

		this.importSprites();

		this.importUI();

		this.importSounds();

		this.load.on('progress', (p) => this.updateBar(p));
		this.load.on("fileprogress", (f) => this.fileLoad(f));
		this.load.on('complete', () => this.complete());
	}


	importSprites() {
		const sprites = Assets.Sprite;

		if (GlobalConfigs.debug) {
			for (let i = 0; i < 500; i++) {
				this.load.image("Asteroid" + i, sprites.Asteroids.BolaBranca);
			}
		}

		//Asteroid
		this.load.image("Asteroid", sprites.Asteroids.BolaBranca);

		// Background
		// this.load.image("Background", sprites.Background);

		// Block
		this.load.image("Block", sprites.Block.Block);

		// Invaders
		// this.load.image("Invaders", sprites.Invaders);

		// Missil
		this.load.image("Missil", sprites.Missil.Green);

		// Ship
		this.load.image("ShipBlue", sprites.Ships.ShipBlue);
		this.load.image("ShipRed", sprites.Ships.ShipRed);

		// Fire
		this.load.image("Fire", sprites.Shoot.Fire);
	}

	importUI() {
		const ui = Assets.UI;

		// Buttons
		this.load.image("Definicoes", ui.Buttons.Definicoes);
		this.load.image("JogoCustomizado", ui.Buttons.JogoCustomizado);
		this.load.image("JogoSimples", ui.Buttons.JogoSimples);
	}

	importSounds() {
		const sound = Assets.Sound;
	}

	drawProgress() {
		this.size = {
			width: 350,
			height: 50,
			padding: {
				x: 10,
				y: 5
			},
			border: 4,
		};

		this.position = {
			x: GlobalConfigs.screen.middleWidth - this.size.width / 2,
			y: GlobalConfigs.screen.middleHeight - this.size.height / 2
		};

		this.file = null;

		const style = {
			font: '18px monospace',
			fill: '#ffffff'
		};

		this.progressBar = this.add.graphics();
		this.progressBox = this.add.graphics();

		this.percentText = this.add.text(GlobalConfigs.screen.middleWidth, GlobalConfigs.screen.middleHeight, "0%", style);
		this.percentText.setOrigin(0.5, 0.5);

		this.progressBox.fillStyle(0xffffff, 0.2);
		this.progressBox.fillRoundedRect(
			this.position.x, this.position.y,
			this.size.width, this.size.height,
			this.size.border);
	}

	updateBar(percentage) {
		this.progressBar.clear();
		this.progressBar.fillStyle(0x00ff00, 1);
		this.progressBar.stroke();
		this.progressBar.fillRoundedRect(
			this.position.x + this.size.padding.x, this.position.y + this.size.padding.y,
			(this.size.width * percentage) - (this.size.padding.x * 2), this.size.height - (this.size.padding.y * 2),
			this.size.border);

		this.percentText.setText("Load: " + Math.round(percentage * 100) + "% - " + this?.file?.key);
	}

	fileLoad(file) {
		this.file = file;
	}

	complete() {
		this.progressBar.destroy();
		this.progressBox.destroy();
		this.percentText.destroy();

		if (GlobalConfigs.debug) this.scene.start("Play");
		else this.scene.start("Home");
	}
}
