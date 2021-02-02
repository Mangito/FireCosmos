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
					ship: "BlackPearl",
					team: "Down",
					teamCount: 1,
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
					ship: "Ceuta",
					team: "Up",
					teamCount: 1,
					controllers: {
						left: "A",
						right: "D",
						fire: "W",
						missile: "S",
					},
				},
				{
					index: 2,
					name: "P3",
					ship: "MilleniumFalcon",
					team: "Down",
					teamCount: 2,
					controllers: {
						left: "J",
						right: "L",
						fire: "I",
						missile: "K",
					},
				},
				{
					index: 3,
					name: "P4",
					ship: "Victoria",
					team: "Up",
					teamCount: 2,
					controllers: {
						left: "F",
						right: "H",
						fire: "T",
						missile: "G",
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
