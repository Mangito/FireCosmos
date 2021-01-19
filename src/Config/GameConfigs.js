export default class GameConfigs {
	constructor() {
		if (GameConfigs.instance instanceof GameConfigs)
			return GameConfigs.instance;

		this.game = {
			mode: "Points",
			endPoint: 10,
		}

		this.players = {
			number: 2,
			players: [],
		}

		this.fire = {
			first: 5000,
			next: 200,
		}

		this.asteroids = {
			on: true,
			next: 5000,
			first: 10000,
		}

		GameConfigs.instance = this;
	}

	addPlayer(player) {
		this.players.players.push(player);
		this.players.number++;
	}

	removePlayer(index) {
		this.players.players.splice(index, 1);
		this.players.number--;
	}

	reset() {

	}

	testGame() {
		const config = [
			{
				index: 0,
				name: "P1",
				ship: "ShipYellow",
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
