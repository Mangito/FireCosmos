import GlobalConfigs from "../Config/GlobalConfigs";
import GameConfigs from "../Scenes/TeamDeathmatch/GameConfigs";

import { TextStyle } from "../Theme";

import Shoot from "../Objects/Shoot";

export default class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, config) {
		const { name, ship, team, teamCount, controllers } = config;
		super(scene, x, y, ship);

		this.isAlive = true;
		this.reviveTime = 0;
		this.size = this.height / 4;
		this.kills = 0;
		this.deaths = 0;

		this.gameConfigs = GameConfigs.getInstance();
		this.team = team;
		this.teamCount = teamCount;

		this.shootSound = this.scene.sound.add("Shoot");
		this.explosionSound = this.scene.sound.add("Explosion");

		this.label = this.scene.add.text(x, y, name, TextStyle.base).setOrigin(0.5);

		const { left, right, fire } = controllers;
		this.keys = this.scene.input.keyboard.addKeys({
			left: left,
			right: right,
			fire: fire,
		});

		this.shoots = this.scene.physics.add.group({
			classType: Shoot,
			maxSize: 2,
			runChildUpdate: true
		});
	}

	generate() {
		const { middleWidth } = GlobalConfigs.screen;
		const teamX = this.teamCount * 50;
		const yMargin = 50;
		const marginName = 25;

		if (this.team === "Aliens") {
			this.setPosition(middleWidth - teamX, yMargin);
			this.label.y = this.y - marginName;
		} else {
			this.setPosition(middleWidth + teamX, GlobalConfigs.screen.height - yMargin);
			this.label.y = this.y + marginName;
		}

		this.setCollideWorldBounds(true);
		this.setImmovable(true);

		this.createMovement();
	}

	createMovement() {
		this.setMaxVelocity(250);

		const keys = this.keys;
		const velocity = 200;

		keys.left.on("down", () => {
			if (this.gameConfigs.friction) this.setAccelerationX(-velocity)
			else this.setVelocityX(-velocity);
		});

		keys.right.on("down", () => {
			if (this.gameConfigs.friction) this.setAccelerationX(velocity)
			else this.setVelocityX(velocity);
		});

		keys.fire.on("down", () => {
			if (!this.isAlive && this.shoots.countActive() < 1) return;

			const shoot = this.shoots.get();
			if (shoot) {
				this.shootSound.play();
				const startY = this.team === "Aliens" ? this.y + this.size : this.y - this.size;

				shoot.fire(this.x, startY, this.team, () => this.addKill());
			}
		});
	}

	addKill() {
		this.kills++;
	}

	hited() {
		this.explosionSound.play();
		this.deaths++;
		this.visible = false;
		this.reviveTime += 3000;
		this.isAlive = false;
	}

	update(time) {
		if (!this.isAlive && this.reviveTime < time) {
			this.isAlive = true;
			this.visible = true;
		}

		if (!this.isAlive) return;

		this.reviveTime = time;
		this.label.x = this.x;
	}
}
