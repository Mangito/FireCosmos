import GlobalConfigs from "../Config/GlobalConfigs";

import button from "../Components/Button";

export default class Home extends Phaser.Scene {
	constructor() {
		super({ key: "Home" });
	}

	preload() { }

	create() {
		{
			// Team Deathmatch
			button.call(this, {
				text: "Play",
				x: GlobalConfigs.screen.middleWidth,
				y: 100,
				action: () => { this.scene.start("Play"); }
			});
		}

		// {
		// 	// Ordas
		// 	button.call(this, {
		// 		text: "Ordas",
		// 		x: GlobalConfigs.screen.middleWidth,
		// 		y: 200,
		// 		action: () => { this.scene.start("TeamDeathmatch"); }
		// 	});
		// }
	}
}
