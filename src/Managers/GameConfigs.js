export default class GameConfigs {
	constructor() {
		if (GameConfigs.instance instanceof GameConfigs)
			return GameConfigs.instance;

		this.numPlayers = 2;

		GameConfigs.instance = this;
	}

	reset() {

	}
}
