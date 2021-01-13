import progressBar from "../Components/ProgressBar";
import Assets from "../Managers/Assets";
export default class Home extends Phaser.Scene {
	constructor() {
		super({ key: "Home" });
	}

	init() {
		this.playBtn = null;
	}

	preload() {
		const _this = this;
		progressBar(_this);

	}

	create() {
		this.playBtn = this.add.text(100, 100, "Jogar", { fill: "#0f0" });
		this.playBtn.setInteractive({ useHandCursor: true });
		this.playBtn.on("pointerdown", () => {
			this.scene.start("Play");
		});
	}
}
