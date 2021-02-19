import ProgressBar from "../Components/ProgressBar";

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


// Sound
import ShootSound from "../Assets/Sound/Shoot.wav";

export default class Preload extends Phaser.Scene {
	constructor() {
		super({ key: "Preload" });
	}

	preload() {
		const progressBar = new ProgressBar(this);

		this.importSprites();
		this.importUI();
		this.importSounds();
		this.importFonts();

		this.load.on('progress', (p) => progressBar.updateBar(p));
		this.load.on("fileprogress", (f) => progressBar.fileLoad(f));

		this.load.on('complete', () => {
			progressBar.complete();

			this.scene.start("Home");
			// this.scene.start("Survive");
		});
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

	importSounds() {
		this.load.audio("Shoot", ShootSound);
	}

	importFonts() { }
}
