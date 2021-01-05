import progressBar from "../Components/ProgressBar";
import Assets from "../Managers/Assets";
import Shoot from "../Objects/Shoot";
import GConfigs from "../Managers/GConfigs";
export default class Play extends Phaser.Scene {
	constructor() {
		super({ key: "Play" });
	}

	preload() {
		progressBar.bind(this);

		this.load.image("Ship1", Assets.ShipBlue);
		this.load.image("Ship2", Assets.ShipYellow);
		this.load.image("Fire", Assets.Fire);

		if (GConfigs.debug) {
			const span = document.createElement("span");
			this.showFps = span;
			span.setAttribute("id", "FPSs");
		}
	}

	create() {

		this.playerUp = this.physics.add.sprite(this.scale.width / 2, 30, "Ship2");
		this.playerUp.scale = 0.5;
		this.playerUp.setCollideWorldBounds(true);
		this.playerUp.flipY = true;
		this.lastFiredUp = 0;

		this.playerDown = this.physics.add.sprite(this.scale.width / 2, this.scale.height - 30, "Ship1");
		this.playerDown.scale = 0.5;
		this.playerDown.setCollideWorldBounds(true);
		this.lastFiredDown = 0;

		this.shoots = this.physics.add.group({
			classType: Shoot,
			maxSize: 20,
			runChildUpdate: true
		});

		this.physics.add.overlap(this.playerUp, this.shoots, this.colisionDown, null, this);
		this.physics.add.overlap(this.playerDown, this.shoots, this.colisionUp, null, this);

		this.keyboardInputs();
	}

	keyboardInputs() {
		this.cursors = this.input.keyboard.createCursorKeys();
		this.KeyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		this.KeyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.KeyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
	}

	colisionUp(p, s) {
		console.log("Up");
		// p.destroy();
		s.destroy();
	}

	colisionDown(p, s) {
		console.log("Down");
		// p.destroy();
		s.destroy();
	}

	update(time) {
		if (GConfigs.debug) this.showFps.innerHTML = Number(this.game.loop.actualFps).toFixed(1);

		if (this.KeyD.isDown) this.playerUp.setVelocityX(100);
		else if (this.KeyA.isDown) this.playerUp.setVelocityX(-100);
		if (this.KeyW.isDown && this.lastFiredUp < time) {
			const shoot = this.shoots.get();
			if (shoot) {
				this.lastFiredUp = time + 200;
				shoot.fire(this.playerUp.x, this.playerUp.y + 30, "Up");
			}
		}

		if (this.cursors.right.isDown) this.playerDown.setVelocityX(100);
		else if (this.cursors.left.isDown) this.playerDown.setVelocityX(-100);
		if (this.cursors.up.isDown && this.lastFiredDown < time) {
			const shoot = this.shoots.get();
			if (shoot) {
				this.lastFiredDown = time + 200;
				shoot.fire(this.playerDown.x, this.playerDown.y - 30, "Down");
			}
		}
	}
}
