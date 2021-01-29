import GlobalConfigs from "../../Config/GlobalConfigs";
import { Text } from "../../Managers/Theme";
import { randomNumber } from "../../Utils/Utils";

import Player from "../../Objects/Player";
import Asteroid from "../../Objects/Asteroid";
import Block from "../../Objects/Blocks";

export default function playCreate() {
	if (GlobalConfigs.debug) this.showFPSs = this.add.text(GlobalConfigs.screen.width - 55, 0, 0, Text);

	this.upPointsLabel = this.add.text(GlobalConfigs.screen.width / 2, 0, 0, Text);
	this.upPointsLabel.setOrigin(0.5);

	this.downPointsLabel = this.add.text(GlobalConfigs.screen.width / 2, GlobalConfigs.screen.height - 20, 0, Text);
	this.downPointsLabel.setOrigin(0.5);

	createGroups.call(this);

	createPlayers.call(this);

	createBlocks.call(this);

	createCollisions.call(this);
}

function createGroups() {
	this.playersPhysics = this.physics.add.group({
		classType: Player,
		runChildUpdate: true,
	});

	if (this.gameConfigs.asteroids.on) {
		this.asteroids = this.physics.add.group({
			classType: Asteroid,
			maxSize: 20,
			runChildUpdate: true
		});
	};

	this.blocks = this.physics.add.group({
		classType: Block,
		maxSize: 5,
	});
}

function createPlayers() {
	for (let i = 0; i < this.playersConfig.length; i++) {
		const config = this.playersConfig[i];
		const sprite = this.playersPhysics.get(0, 0, config);
		this.players.push(sprite);
		if (sprite) sprite.generate();
	}
}

function createBlocks() {
	const num = randomNumber(0, 5);
	for (let i = 0; i < num; i++) {
		const block = this.blocks.get(0, 0);
		if (block) block.generate();
	}
}

function createCollisions() {
	for (let i = 0; i < this.players.length; i++) {
		const player = this.players[i];
		this.physics.add.overlap(this.playersPhysics, player.shoots, (p, s) => { collisionPlayerShot.call(this, p, s); }, null, this); // Players -> Shoots

		if (this.gameConfigs.asteroids.on) {
			// Shoots -> Asteroids
			this.physics.add.overlap(this.asteroids, player.shoots, (a, s) => { collisionShootAsteroid.call(this, a, s); }, null, this);
		}

		// Shoots -> Block
		this.physics.add.overlap(player.shoots, this.blocks, (s, b) => { s.destroy(); }, null, this);
	}

	if (this.gameConfigs.asteroids.on) {
		// Players -> Asteroids
		this.physics.add.overlap(this.playersPhysics, this.asteroids, (p, a) => { collisionPlayerAsteroid.call(this, p, a); }, null, this);

		// Asteroids -> Asteroids
		this.physics.add.collider(this.asteroids);
	}

	// Asteroids -> Block
	this.physics.add.collider(this.asteroids, this.blocks);
}

function collisionPlayerShot(player, shoot) {
	if (player.isAlive) {
		player.hited();
		shoot.addPoints();
		if (shoot.team === "Up") updatePointsUp.call(this);
		else updatePointsDown.call(this);
		shoot.destroy();
	}
}

function collisionPlayerAsteroid(player, asteroid) {
	if (player.isAlive) {
		player.hited();
		if (player.team !== "Up") updatePointsUp.call(this);
		else updatePointsDown.call(this);
		asteroid.destroy();
	}
}

function collisionShootAsteroid(asteroid, shoot) {
	asteroid.destroy();
	shoot.destroy();
}

function updatePointsUp() {
	this.upPoints++;
	this.upPointsLabel.setText(this.upPoints);
	this.upPointsLabel.x = GlobalConfigs.screen.middleWidth - this.upPointsLabel.width / 2;
}

function updatePointsDown() {
	this.downPoints++;
	this.downPointsLabel.setText(this.downPoints);
	this.downPointsLabel.x = GlobalConfigs.screen.middleWidth - this.downPointsLabel.width / 2;
}
