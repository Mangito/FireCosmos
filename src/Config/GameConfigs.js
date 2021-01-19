export default class GameConfigs {
	constructor() {
		if (GameConfigs.instance instanceof GameConfigs)
			return GameConfigs.instance;

		this.numPlayers = 2;
		this.fistShoot = 2000; // Time to start shooting
		this.lastShoot = 200; // Time util next shoot
		this.players = [];

		GameConfigs.instance = this;
	}

	addPlayer(player) {
		this.players.push(player);
		this.numPlayers++;
	}

	removePlayer(index) {
		this.players.splice(index, 1);
		this.numPlayers--;
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
