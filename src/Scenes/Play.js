import Assets from "../Managers/Assets";
import GConfigs from "../Managers/GConfigs"
import { randomNumber } from "../Utils/Utils";;
import { Text } from "../Managers/Theme";

import progressBar from "../Components/ProgressBar";

import Shoot from "../Objects/Shoot";
import Asteroid from "../Objects/Asteroid";
export default class Play extends Phaser.Scene {
	constructor() {
		super({ key: "Play" });
	}

	// Preload
	preload() {
		progressBar.bind(this);

		this.load.image("Ship1", Assets.Player.ShipBlue);
		this.load.image("Ship2", Assets.Player.ShipYellow);
		this.load.image("Fire", Assets.Shoot.Fire);
		this.load.image("Asteroid", Assets.Asteroids.BolaBranca);

		if (GConfigs.debug) this.showFps();
	}

	showFps() {
		const span = document.createElement("span");
		this.showFps = span;
		span.classList.add("FPSs");
		document.body.appendChild(span);
	}

	// Create
	create() {
		this.createPlayerUp();
		this.createPlayerDown();

		this.shoots = this.physics.add.group({
			classType: Shoot,
			maxSize: 20,
			runChildUpdate: true
		});

		this.lastAsteroids = 20000;
		this.asteroids = this.physics.add.group({
			classType: Asteroid,
			maxSize: 20,
			runChildUpdate: true
		});

		this.createCollisions();
		this.keyboardInputs();
	}

	createPlayerUp() {
		const middleScreen = this.scale.width / 2;

		this.playerUp = this.physics.add.sprite(middleScreen, 50, "Ship2");
		this.playerUp.scale = 0.5;
		this.playerUp.setCollideWorldBounds(true);
		this.playerUp.setImmovable(true);

		this.playerUp.flipY = true;
		this.lastFiredUp = 5000;
		this.upPoints = 0;
		this.upText = this.add.text(middleScreen - 10, 0, this.upPoints, Text);
	}

	createPlayerDown() {
		const middleScreen = this.scale.width / 2;

		this.playerDown = this.physics.add.sprite(middleScreen, this.scale.height - 50, "Ship1");
		this.playerDown.scale = 0.5;
		this.playerDown.setCollideWorldBounds(true);
		this.playerDown.setImmovable(true);

		this.lastFiredDown = 5000;
		this.downPoints = 0;
		this.downText = this.add.text(middleScreen - 10, this.scale.height - 20, this.downPoints, Text);
	}

	createCollisions() {
		// Players -> Shoots
		this.physics.add.overlap(this.playerUp, this.shoots, this.colisionDown, null, this);
		this.physics.add.overlap(this.playerDown, this.shoots, this.colisionUp, null, this);

		// Players -> Asteroids
		this.physics.add.overlap(this.playerUp, this.asteroids, this.colisionDown, null, this);
		this.physics.add.overlap(this.playerDown, this.asteroids, this.colisionUp, null, this);

		// Shoots -> Asteroids
		this.physics.add.overlap(this.asteroids, this.shoots, this.colisionShootAsteroid, null, this);

		// Asteroids -> Asteroids
		this.physics.add.collider(this.asteroids);
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

	colisionShootAsteroid(a, s) {
		const newSize = a.size / 1.5;
		const newAsteroids = 3;
		if (a.size > 20) {
			for (let i = 0; i < newAsteroids; i++) this.generateAsteroids(newSize);
		}
		a.destroy();
		s.destroy();
	}

	keyboardInputs() {
		this.cursors = this.input.keyboard.createCursorKeys();
		this.KeyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		this.KeyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.KeyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
	}


	// Update
	update(time) {
		if (GConfigs.debug) this.showFps.innerHTML = Number(this.game.loop.actualFps).toFixed(1);

		this.movePlayerUp(time);
		this.movePlayerDown(time);

		if (this.lastAsteroids < time) {
			this.lastAsteroids = time + 20000;
			this.generateAsteroids(64);
		}
	}

	movePlayerUp(time) {
		if (this.KeyD.isDown) this.playerUp.setVelocityX(100);
		else if (this.KeyA.isDown) this.playerUp.setVelocityX(-100);
		if (this.KeyW.isDown && this.lastFiredUp < time) {
			const shoot = this.shoots.get();
			if (shoot) {
				shoot.fire(this.playerUp.x, this.playerUp.y + 30, "Up");
				this.lastFiredUp = time + 200;
			}
		}
	}

	movePlayerDown(time) {
		if (this.cursors.right.isDown) this.playerDown.setVelocityX(100);
		else if (this.cursors.left.isDown) this.playerDown.setVelocityX(-100);
		if (this.cursors.up.isDown && this.lastFiredDown < time) {
			const shoot = this.shoots.get();
			if (shoot) {
				shoot.fire(this.playerDown.x, this.playerDown.y - 30, "Down");
				this.lastFiredDown = time + 200;
			}
		}
	}

	generateAsteroids(newSize) {
		const asteroid = this.asteroids.get();
		if (asteroid) asteroid.generate(newSize);
	}
}
