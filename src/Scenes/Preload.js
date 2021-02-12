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
		this.importFonts();

		this.load.on('progress', (p) => this.updateBar(p));
		this.load.on("fileprogress", (f) => this.fileLoad(f));
		this.load.on('complete', () => this.complete());
	}

	importSprites() {
		const sprites = Assets.Sprite;

		//Asteroid
		this.load.image("Asteroid", sprites.Asteroids.BolaBranca);

		// Block
		this.load.image("Block", sprites.Block.Block);

		// Invaders
		this.load.image("Olho", sprites.Aliens.Olho);
		this.load.image("Ravi", sprites.Aliens.Ravi);
		this.load.image("Shell", sprites.Aliens.Shell);
		this.load.image("Tank", sprites.Aliens.Tank);

		// Ship
		this.load.image("BlackPearl", sprites.Ships.BlackPearl);
		this.load.image("Ceuta", sprites.Ships.Ceuta);
		this.load.image("MilleniumFalcon", sprites.Ships.MilleniumFalcon);
		this.load.image("Victoria", sprites.Ships.Victoria);

		// Fire
		this.load.image("Fire", sprites.Shoot.Fire);
	}

	importUI() {
		const ui = Assets.UI;

		// Background
		this.load.image("Background", ui.Background);

		// Buttons
		this.load.spritesheet("Button", ui.Buttons.Button, { frameWidth: 250, frameHeight: 80 });
		this.load.spritesheet("FullScreen", ui.Buttons.FullScreen, { frameWidth: 32, frameHeight: 32 });
	}

	importSounds() {
		const sound = Assets.Sound;
	}

	importFonts() { }

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

		this.lastFileLoad = null;

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

		this.percentText.setText("Load: " + Math.round(percentage * 100) + "% - " + this?.lastFileLoad?.key);
	}

	fileLoad(file) {
		this.lastFileLoad = file;
	}

	complete() {
		this.progressBar.destroy();
		this.progressBox.destroy();
		this.percentText.destroy();

		this.scene.start("Home");
		// this.scene.start("Survive");
		// this.scene.start("TeamDeathmatch");
	}
}
