import GlobalConfigs from "../Config/GlobalConfigs";

// ---- Assets

// Ship
import BlackPearl from "../Assets/Sprites/Ships/BlackPearl/BlackPearl.png";
import Ceuta from "../Assets/Sprites/Ships/Ceuta/Ceuta.png";
import MilleniumFalcon from "../Assets/Sprites/Ships/MilleniumFalcon/MilleniumFalcon.png";
import Victoria from "../Assets/Sprites/Ships/Victoria/Victoria.png";

// Aliens
import Olho from "../Assets/Sprites/Aliens/Olho/Olho.png";
import Ravi from "../Assets/Sprites/Aliens/Ravi/Ravi.png";
import Shell from "../Assets/Sprites/Aliens/Shell/Shell.png";
import Tank from "../Assets/Sprites/Aliens/Tank/Tank.png";

// Fire
import Fire from "../Assets/Sprites/Fire/Fire.png";

// Asteroids
import BolaBranca from "../Assets/Sprites/BolaBranca.png";

// Blocks
import Block from "../Assets/Sprites/Block/Block.png";

// UI
import Background from "../Assets/UI/Background/Background.png";
import Button from "../Assets/UI/Button/Button.png";
import FullScreen from "../Assets/UI/Button/FullScreen.png";
import Friction from "../Assets/UI/Friction/Friction.png";

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
		//Asteroid
		this.load.image("Asteroid", BolaBranca);

		// Block
		this.load.image("Block", Block);

		// Invaders
		this.load.image("Olho", Olho);
		this.load.image("Ravi", Ravi);
		this.load.image("Shell", Shell);
		this.load.image("Tank", Tank);

		// Ship
		this.load.image("BlackPearl", BlackPearl);
		this.load.image("Ceuta", Ceuta);
		this.load.image("MilleniumFalcon", MilleniumFalcon);
		this.load.image("Victoria", Victoria);

		// Fire
		this.load.image("Fire", Fire);
	}

	importUI() {
		// Background
		this.load.image("Background", Background);

		// Buttons
		this.load.spritesheet("Button", Button, { frameWidth: 250, frameHeight: 80 });
		this.load.spritesheet("FullScreen", FullScreen, { frameWidth: 32, frameHeight: 32 });

		this.load.image("Friction", Friction);
	}

	importSounds() { }

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
		this.percentText.setOrigin(0.5);

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
	}
}
