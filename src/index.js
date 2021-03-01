import Phaser from "Phaser";

import "./CSS/Reset.css";

// Configs/Infos
import packageJson from "../package.json";
import GlobalConfigs from "./Config/GlobalConfigs";
import { Banner } from "./Managers/Theme";

// Scenes
import Preload from "./Scenes/Preload";
import Home from "./Scenes/Home";
import Settings from "./Scenes/Settings";
import Info from "./Scenes/Info";
import Invasion from "./Scenes/Invasion/Invasion";
import TeamDeathmatch from "./Scenes/TeamDeathmatch/TeamDeathmatch";

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
	width: GlobalConfigs.screen.width,
	height: GlobalConfigs.screen.height,
	backgroundColor: "#383838",
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
			debug: GlobalConfigs.debug,
			gravity: { x: 0, y: 0 }
		}
	},
	scene: [
		Preload,
		Home,
		Settings,
		Info,
		Invasion,
		TeamDeathmatch,
	]
}

const game = new Phaser.Game(config);
