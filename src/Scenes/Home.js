import GlobalConfigs from "../Config/GlobalConfigs";

import button from "../Components/Button";

export default class Home extends Phaser.Scene {
	constructor() {
		super({ key: "Home" });
	}

	preload() { }

	create() {
		const { middleWidth, middleHeight } = GlobalConfigs.screen;
		this.add.image(middleWidth, middleHeight, "Background");


		// Ordas
		button.call(this, {
			text: "Rounds",
			x: GlobalConfigs.screen.middleWidth,
			y: 100,
			action: () => { this.scene.start("Rounds"); }
		});


		// Team Deathmatch
		button.call(this, {
			text: "TeamDeathmatch",
			x: GlobalConfigs.screen.middleWidth,
			y: 200,
			action: () => { this.scene.start("TeamDeathmatch"); }
		});
	}
}
