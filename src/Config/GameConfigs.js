let instance = null;
export default class GameConfigs {
	constructor() {
		if (instance) return instance;


		this.mode = {
			mode: "Points", // "Infinite", "Sudden Death", "Time"
		};

		this.asteroids = true;
		this.blocks = true;

		this.players = {
			friction: false,
			players: [
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
			],
		};


		instance = this;
	}

	addPlayer(player) {
		this.players.players.push(player);
		this.players.number++;
	}

	removePlayer(index) {
		this.players.players.splice(index, 1);
		this.players.number--;
	}
}
