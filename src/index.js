import Phaser from "Phaser";

import Home from "./Scenes/Home.js";
import UIScene from "./Scenes/UI.js";
import Play from "./Scenes/Play.js";

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 800,
	background: "#fff",
	physics: {
		default: "arcade",
		arcade: {
			fps: 60,
			debug: true,
			gravity: { x: 0, y: 0 }
		}
	},
	scene: [Home, UIScene, Play]
}

const game = new Phaser.Game(config);
