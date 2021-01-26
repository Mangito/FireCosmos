import GlobalConfigs from "../../Config/GlobalConfigs";
import { Text } from "../../Managers/Theme";
import { randomNumber } from "../../Utils/Utils";

import Player from "../../Objects/Player";
import Asteroid from "../../Objects/Asteroid";
import Block from "../../Objects/Blocks";

let _this = null;
export default function PlayCreate(t) {
	_this = t;
	if (GlobalConfigs.debug) _this.showFPSs = _this.add.text(GlobalConfigs.screen.width - 55, 0, 0, Text);

	_this.upPointsLabel = _this.add.text(GlobalConfigs.screen.width / 2, 0, 0, Text);
	_this.upPointsLabel.x = GlobalConfigs.screen.middleWidth - _this.upPointsLabel.width / 2;

	_this.downPointsLabel = _this.add.text(GlobalConfigs.screen.width / 2, GlobalConfigs.screen.height - 20, 0, Text);
	_this.downPointsLabel.x = GlobalConfigs.screen.middleWidth - _this.downPointsLabel.width / 2;

	createGroups();

	createPlayers();

	createBlocks();

	createCollisions();
}

function createGroups() {
	_this.playersPhysics = _this.physics.add.group({
		classType: Player,
		runChildUpdate: true,
	});

	if (_this.gameConfigs.asteroids.on) {
		_this.asteroids = _this.physics.add.group({
			classType: Asteroid,
			maxSize: 20,
			runChildUpdate: true
		});
	};

	_this.blocks = _this.physics.add.group({
		classType: Block,
		maxSize: 5,
	});
}

function createPlayers() {
	for (let i = 0; i < _this.playersConfig.length; i++) {
		const config = _this.playersConfig[i];
		const sprite = _this.playersPhysics.get(0, 0, config);
		_this.players.push(sprite);
		if (sprite) sprite.generate();
	}
}

function createBlocks() {
	const num = randomNumber(0, 5);
	for (let i = 0; i < num; i++) {
		const block = _this.blocks.get(0, 0);
		if (block) block.generate();
	}
}

function createCollisions() {
	for (let i = 0; i < _this.players.length; i++) {
		const player = _this.players[i];
		_this.physics.add.overlap(_this.playersPhysics, player.shoots, collisionPlayerShot, null, _this); // Players -> Shoots

		if (_this.gameConfigs.asteroids.on) {
			// Shoots -> Asteroids
			_this.physics.add.overlap(_this.asteroids, player.shoots, collisionShootAsteroid, null, _this);
		}

		// Shoots -> Block
		_this.physics.add.overlap(player.shoots, _this.blocks, (s, b) => { s.destroy(); }, null, _this);
	}

	if (_this.gameConfigs.asteroids.on) {
		// Players -> Asteroids
		_this.physics.add.overlap(_this.playersPhysics, _this.asteroids, collisionPlayerAsteroid, null, _this);

		// Asteroids -> Asteroids
		_this.physics.add.collider(_this.asteroids);
	}

	// Asteroids -> Block
	_this.physics.add.collider(_this.asteroids, _this.blocks);
}

function collisionPlayerShot(player, shoot) {
	if (player.isAlive) {
		player.hited();
		shoot.addPoints();
		if (shoot.team === "Up") updatePointsUp();
		else updatePointsDown();
		shoot.destroy();
	}
}

function collisionPlayerAsteroid(player, asteroid) {
	if (player.isAlive) {
		player.hited();
		if (player.team !== "Up") updatePointsUp();
		else updatePointsDown();
		asteroid.destroy();
	}
}

function collisionShootAsteroid(asteroid, shoot) {
	asteroid.destroy();
	shoot.destroy();
}

function updatePointsUp() {
	_this.upPoints++;
	_this.upPointsLabel.setText(_this.upPoints);
	_this.upPointsLabel.x = GlobalConfigs.screen.middleWidth - _this.upPointsLabel.width / 2;
}

function updatePointsDown() {
	_this.downPoints++;
	_this.downPointsLabel.setText(_this.downPoints);
	_this.downPointsLabel.x = GlobalConfigs.screen.middleWidth - _this.downPointsLabel.width / 2;
}
