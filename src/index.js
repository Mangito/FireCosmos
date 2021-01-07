import Phaser from "Phaser";

import "./CSS/Reset.css";

// Configs/Infos
import packageJson from "../package.json";
import GConfigs from "./Managers/GConfigs";
import { Banner } from "./Managers/Theme";

// Scenes
import Home from "./Scenes/Home.js";
import UIScene from "./Scenes/UI.js";
import Play from "./Scenes/Play.js";

const config = {
	title: "Fire Cosmos",
	url: packageJson.homepage,
	version: packageJson.version,
	banner: {
		text: Banner.Text,
		background: Banner.Background,
		hidePhaser: false
	},
	// Game
	type: Phaser.AUTO,
	width: GConfigs.width,
	height: GConfigs.height,
	backgroundColor: "#000",
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
