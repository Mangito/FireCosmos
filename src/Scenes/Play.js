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

		this.load.image("Ship1", Assets.player.ShipBlue);
		this.load.image("Ship2", Assets.player.ShipYellow);
		this.load.image("Fire", Assets.Shoot.Fire);

		if (GConfigs.debug) this.showFps();
	}

	showFps() {
		const span = document.createElement("span");
		this.showFps = span;
		span.classList.add("FPSs");
		document.body.appendChild(span);
	}

	create() {
		const style = {
			fontFamily: "monospace",
			fontSize: "20px",
			color: '#fff',
			stroke: '#0f0',
			strokeThickness: 2,
			shadow: {
				offsetX: 1,
				offsetY: 1,
				color: '#0ff',
				blur: 2,
				stroke: true
			}
		};

		const middleScreen = this.scale.width / 2;

		this.playerUp = this.physics.add.sprite(middleScreen, 50, "Ship2");
		this.playerUp.scale = 0.5;
		this.playerUp.setCollideWorldBounds(true);
		this.playerUp.flipY = true;
		this.lastFiredUp = 5000;
		this.upPoints = 0;
		this.upText = this.add.text(middleScreen - 10, 0, this.upPoints, style);

		this.playerDown = this.physics.add.sprite(middleScreen, this.scale.height - 50, "Ship1");
		this.playerDown.scale = 0.5;
		this.playerDown.setCollideWorldBounds(true);
		this.lastFiredDown = 5000;
		this.downPoints = 0;
		this.downText = this.add.text(middleScreen - 10, this.scale.height - 20, this.downPoints, style);

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
		s.destroy();
		this.upPoints++;
		this.upText.setText(this.upPoints);
	}

	colisionDown(p, s) {
		s.destroy();
		this.downPoints++;
		this.downText.setText(this.downPoints);
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
