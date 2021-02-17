let instance = null;
class GameConfigs {
	constructor() {
		this.mode = "Free"; // "Points", "Sudden Death", "Time"
		this.asteroids = true;
		this.blocks = true;
		this.friction = false;
		this.players = [];
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
