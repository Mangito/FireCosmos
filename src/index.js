import Phaser from "Phaser";

import "./CSS/reset.css";

import packageJson from "../package.json";
import GConfigs from "./Managers/GConfigs";

import Home from "./Scenes/Home.js";
import UIScene from "./Scenes/UI.js";
import Play from "./Scenes/Play.js";

const config = {
	title: "Fire Cosmos",
	url: packageJson.homepage,
	version: packageJson.version,
	banner: {
		text: "#ffffff",
		background: [
			"#fff200",
			"#38f0e8",
			"#00bff3",
			"#ec008c"
		],
		hidePhaser: false
	},

	type: Phaser.AUTO,
	width: 800,
	height: 800,
	background: "#fff",
	transparent: false,
	antialias: true,
	pixelArt: false,
	roundPixels: true,
	physics: {
		default: "arcade",
		arcade: {
			debug: GConfigs.debug,
			gravity: { x: 0, y: 0 }
		}
	},
	scene: [
		Home,
		Play,
		UIScene,
	]
}

const game = new Phaser.Game(config);
