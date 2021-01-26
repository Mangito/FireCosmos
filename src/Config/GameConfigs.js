let instance = null;
export default class GameConfigs {
	constructor() {
		if (instance) return instance;

		this.game = {};
		this.players = {};
		this.fire = {};
		this.asteroids = {};
		this.block = {};

		this.reset();

		instance = this;
	}

	reset() {
		this.game = {
			mode: "Points",
			endPoint: 10,
		};

		this.players = {
			number: 0,
			friction: false,
			players: [],
		};

		this.fire = {
			first: 5000,
			next: 200,
		};

		this.asteroids = {
			on: true,
			next: 5000,
			first: 10000,
		};

		this.block = {
			min: 0,
			max: 10,
		};
	}

	addPlayer(player) {
		this.players.players.push(player);
		this.players.number++;
	}

	removePlayer(index) {
		this.players.players.splice(index, 1);
		this.players.number--;
	}

	testGame() {
		const config = [
			{
				index: 0,
				name: "P1",
				ship: "ShipRed",
				team: "Down",
				points: 0,
				lastShoot: 2000,
				controllers: {
					left: "LEFT",
					right: "RIGHT",
					fire: "UP",
					missile: "DOWN",
				},
			},
			{
				index: 1,
				name: "P2",
				ship: "ShipBlue",
				team: "Up",
				points: 0,
				lastShoot: 2000,
				controllers: {
					left: "A",
					right: "D",
					fire: "W",
					missile: "S",
				},
			},
		];

		return config;
	}
}
