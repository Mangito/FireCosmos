import Phaser from "Phaser";

import "./CSS/Reset.css";

// Configs/Infos
import packageJson from "../package.json";
import GConfigs from "./Managers/GConfigs";
import { Banner } from "./Managers/Theme";

// Scenes
import Customize from "./Scenes/Customize";
import Home from "./Scenes/Home";
import Play from "./Scenes/Play";

const gameContainer = document.getElementById("GameContainer");

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
	parent: "GameContainer",
	type: Phaser.AUTO,
	width: GConfigs.screen.width,
	height: GConfigs.screen.height,
	backgroundColor: "#000",
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
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
		Customize,
		Play,
	]
}

const game = new Phaser.Game(config);
