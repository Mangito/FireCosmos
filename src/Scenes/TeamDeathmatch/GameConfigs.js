let instance = null;
class GameConfigs {
	constructor() {
		this.mode = {
			mode: "Free", // "Points", "Sudden Death", "Time"
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
					team: "Ships",
					teamCount: 1,
					controllers: {
						left: "LEFT",
						right: "RIGHT",
						fire: "UP",
					},
				},
				{
					index: 1,
					name: "P2",
					ship: "Ceuta",
					team: "Aliens",
					teamCount: 1,
					controllers: {
						left: "A",
						right: "D",
						fire: "W",
					},
				},
				{
					index: 2,
					name: "P3",
					ship: "MilleniumFalcon",
					team: "Ships",
					teamCount: 2,
					controllers: {
						left: "J",
						right: "L",
						fire: "I",
					},
				},
				{
					index: 3,
					name: "P4",
					ship: "Victoria",
					team: "Aliens",
					teamCount: 2,
					controllers: {
						left: "F",
						right: "H",
						fire: "T",
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

const config = new GameConfigs();

export default {
	getInstance: () => {
		if (!instance) {
			instance = config;
		}
		return instance;
	},
};

GameConfigs.getInstance = () => {
	return instance;
};
