import GlobalConfigs from "../Config/GlobalConfigs";
import GameConfigs from "../Scenes/TeamDeathmatch/GameConfigs";

import { TextStyle } from "../Managers/Theme";

import Shoot from "../Objects/Shoot";

export default class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, config) {
		const { name, ship, team, teamCount, controllers } = config;
		super(scene, x, y, ship);


		this.isAlive = true;
		this.reviveTime = 0;
		this.thisTime = 0;
		this.size = this.height / 4;
		this.kills = 0;
		this.deaths = 0;

		this.gameConfigs = GameConfigs.getInstance();
		this.lastFire = 0;
		this.team = team;
		this.teamCount = teamCount;

		this.shootSound = this.scene.sound.add("Shoot");
		this.name = this.scene.add.text(x, y, name, TextStyle.base);
		this.name.setOrigin(0.5);

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
		const middleWidth = GlobalConfigs.screen.middleWidth;
		const teamX = this.teamCount * 50;
		const yMargin = 50;
		const marginName = 25;

		if (this.team === "Aliens") {
			this.setPosition(middleWidth - teamX, yMargin);
			this.name.y = this.y - marginName;
		} else {
			this.setPosition(middleWidth + teamX, GlobalConfigs.screen.height - yMargin);
			this.name.y = this.y + marginName;
		}

		this.setCollideWorldBounds(true);
		this.setImmovable(true);

		this.setMaxVelocity(250);
	}

	addKill() {
		this.kills++;
	}

	hited() {
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

		const keys = this.keys;
		const velocity = 200;
		if (keys.left.isDown) {
			if (this.gameConfigs.friction) this.setAccelerationX(-velocity)
			else this.setVelocityX(-velocity);
		};
		if (keys.right.isDown) {
			if (this.gameConfigs.friction) this.setAccelerationX(velocity)
			else this.setVelocityX(velocity);
		};

		if (!this.isAlive) return;
		this.reviveTime = time;

		if (keys.fire.isDown && this.lastFire < time && this.isAlive) {
			const shoot = this.shoots.get();
			if (shoot) {
				this.shootSound.play();
				const startY = this.team === "Aliens" ? this.y + this.size : this.y - this.size;

				shoot.fire(this.x, startY, this.team, () => this.addKill());
				this.lastFire = time + 200;
			}
		}

		this.name.x = this.x;
	}
}
