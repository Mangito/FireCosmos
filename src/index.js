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


if (GConfigs.scale) {
	onResize();
	window.addEventListener("resize", onResize);
}

function onResize() {
	console.log(gameContainer.offsetWidth);
	const scaleX = window.innerWidth / GConfigs.width - 0.030;
	const scaleY = window.innerHeight / GConfigs.height - 0.030;
	gameContainer.style.transform = `scale(${scaleX}, ${scaleY})`;
}