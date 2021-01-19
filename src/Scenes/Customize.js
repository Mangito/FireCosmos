import GlobalConfigs from "../Config/GlobalConfigs";
import Assets from "../Managers/Assets";
import progressBar from "../Components/ProgressBar";

export default class Customize extends Phaser.Scene {
	constructor() {
		super({ key: "Customize" });
	}

	preload() {
		const _this = this;
		progressBar(_this);
	}

	create() {
	}
}
