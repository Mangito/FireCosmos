import GlobalConfigs from "../../Config/GlobalConfigs";

let instance = null;
class GameConfigs {
	constructor() {
		this.mode = "Free"; // "Points", "Sudden Death", "Time"
		this.asteroids = true;
		this.blocks = true;
		this.friction = false;
		this.players = [];
	}

	default2P() {
		this.players = [];

		const configP1 = {
			index: 0,
			name: "P1",
			ship: "Victoria",
			team: "Ships",
			teamCount: 1,
			controllers: GlobalConfigs.controllers[0],
		};

		const configP2 = {
			index: 1,
			name: "P2",
			ship: "Tank",
			team: "Aliens",
			teamCount: 1,
			controllers: GlobalConfigs.controllers[1],
		};

		this.players.push(configP1);
		this.players.push(configP2);
	}

	default4P() {
		this.default2P();

		const configP3 = {
			index: 2,
			name: "P3",
			ship: "BlackPearl",
			team: "Ships",
			teamCount: 2,
			controllers: GlobalConfigs.controllers[2],
		};

		const configP4 = {
			index: 3,
			name: "P4",
			ship: "Olho",
			team: "Aliens",
			teamCount: 2,
			controllers: GlobalConfigs.controllers[3],
		};

		this.players.push(configP3);
		this.players.push(configP4);
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
