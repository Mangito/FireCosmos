import GlobalConfigs from "../../Config/GlobalConfigs";

let instance = null;

class GameConfigs {
	constructor() {
		this.players = [];
	}

	reset() {
		this.players = [];
	}

	createPlayers(n) {
		for (let i = 0; i < n; i++) {
			this.addPlayer(i);
		}
	}

	addPlayer(i) {
		const shipsName = ["BlackPearl", "Ceuta", "MilleniumFalcon", "Victoria"];

		const config = {
			index: i,
			name: "P" + i + 1,
			ship: shipsName[i],
			team: "Ships",
			teamCount: i + 1,
			controllers: GlobalConfigs.controllers[i],
		};

		this.players.push(config);
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
