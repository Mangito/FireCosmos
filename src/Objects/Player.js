import GConfigs from "../Managers/GConfigs";

import Shoot from "../Objects/Shoot";

export default class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, config) {
		super(scene, x, y, config.ship);
		this.config = config;
		this.isAlive = true;

		// this.lastFire = 5000;
		this.lastFire = 2000;
		this.points = config.points;

		const { letf, right, fire, missile } = config.controllers;
		this.keys = this.scene.input.keyboard.addKeys({
			left: letf,
			right: right,
			fire: fire,
			missile: missile,
		});

		this.shoots = this.scene.physics.add.group({
			classType: Shoot,
			maxSize: 10,
			runChildUpdate: true
		});
	}

	generate() {
		const middleScreen = GConfigs.screen.width / 2;
		const yMargin = 50;

		this.setScale(0.5);
		this.size = this.height / 4;

		if (this.config.team === "Up") {
			this.flipY = true;
			this.setPosition(middleScreen, yMargin);
		} else {
			this.setPosition(middleScreen, GConfigs.screen.height - yMargin);
		}

		this.setCollideWorldBounds(true);
		this.setImmovable(true);
	}

	addPoints() {
		this.points++;
	}

	update(time) {
		const keys = this.keys;

		if (keys.left.isDown) this.setVelocityX(-200);
		if (keys.right.isDown) this.setVelocityX(200);

		if (keys.fire.isDown && this.lastFire < time) {
			const shoot = this.shoots.get();
			if (shoot) {
				const startY = this.config.team === "Up" ? this.y + this.size : this.y - this.size;

				const _this = this;
				shoot.fire(this.x, startY, this.config, () => this.addPoints());
				this.lastFire = time + 200;
			}
		}
	}
}