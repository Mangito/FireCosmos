import GlobalConfigs from "../Config/GlobalConfigs";
import GameConfigs from "../Config/GameConfigs";

import Shoot from "../Objects/Shoot";

export default class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, config) {
		super(scene, x, y, config.ship);
		this.config = config;
		this.isAlive = true;
		this.reviveTime = 0;
		this.thisTime = 0;
		this.size = this.height / 4;

		// this.lastFire = 5000;
		this.gameConfigs = new GameConfigs();
		this.lastFire = this.gameConfigs.fire.first;
		this.points = config.points;
		this.team = config.team;

		const { left, right, fire, missile } = config.controllers;
		this.keys = this.scene.input.keyboard.addKeys({
			left: left,
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
		const middleScreen = GlobalConfigs.screen.width / 2;
		const yMargin = 50;

		if (this.team === "Up") {
			this.flipY = true;
			this.setPosition(middleScreen, yMargin);
		} else {
			this.setPosition(middleScreen, GlobalConfigs.screen.height - yMargin);
		}

		this.setCollideWorldBounds(true);
		this.setImmovable(true);

		this.setMaxVelocity(250);
	}

	addPoints() {
		this.points++;
	}

	hited() {
		this.visible = false;
		this.reviveTime += 3000;
		this.isAlive = false;
	}

	update(time) {

		if (!this.isAlive && this.reviveTime < time) {
			this.isAlive = true;
			this.visible = true;
		}

		const keys = this.keys;
		const maxVelocity = 200;
		if (keys.left.isDown) {
			if (this.gameConfigs.players.friction) this.setAccelerationX(-maxVelocity)
			else this.setVelocityX(-maxVelocity);
		};
		if (keys.right.isDown) {
			if (this.gameConfigs.players.friction) this.setAccelerationX(maxVelocity)
			else this.setVelocityX(maxVelocity);
		};

		if (!this.isAlive) return;
		this.reviveTime = time;

		if (keys.fire.isDown && this.lastFire < time && this.isAlive) {
			const shoot = this.shoots.get();
			if (shoot) {
				const startY = this.team === "Up" ? this.y + this.size : this.y - this.size;

				shoot.fire(this.x, startY, this.config, () => this.addPoints());
				this.lastFire = time + this.gameConfigs.fire.next;
			}
		}

	}
}
