import GlobalConfigs from "../Managers/GlobalConfigs";
import Assets from "../Managers/Assets";
import progressBar from "../Components/ProgressBar";

export default class Home extends Phaser.Scene {
	constructor() {
		super({ key: "Home" });
	}

	preload() {
		const _this = this;
		progressBar(_this);
		this.load.image("Definicoes", Assets.UI.Buttons.Definicoes);
		this.load.image("JogoCustomizado", Assets.UI.Buttons.JogoCustomizado);
		this.load.image("JogoSimples", Assets.UI.Buttons.JogoSimples);
	}

	create() {
		this.simpleGame();
		// this.customized();
		// this.settings();
	}

	simpleGame() {
		const playBtn = this.add.image(GlobalConfigs.screen.middleWidth, 100, "JogoSimples");
		playBtn.setInteractive({ useHandCursor: true });
		playBtn.on("pointerdown", () => {
			this.scene.start("Play");
		});
	}

	customized() {
		const customizedBtn = this.add.image(GlobalConfigs.screen.middleWidth, 200, "JogoCustomizado");
		customizedBtn.setInteractive({ useHandCursor: true });
		customizedBtn.on("pointerdown", () => { });
	}

	settings() {
		const settingsBtn = this.add.image(GlobalConfigs.screen.middleWidth, 300, "Definicoes");
		settingsBtn.setInteractive({ useHandCursor: true });
		settingsBtn.on("pointerdown", () => { });
	}
}
