import GlobalConfigs from "../../Config/GlobalConfigs";
import GameConfigs from "./GameConfigs";

import { TextStyle } from "../../Managers/Theme";

export default class Pause extends Phaser.Scene {
	constructor() {
		super({ key: "PauseTeamDeathmatch" });
	}

	init() {
		this.gameConfigs = GameConfigs.getInstance();
	}

	create() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;

		const border = this.add.graphics();
		border.clear();
		const borderStyle = {
			x: 75,
			y: 75,
			width: 850,
			height: 450,
			color: 0x1C1C1C,
			alpha: 0.9,
			border: 10,
			thickness: {
				size: 4,
				color: 0x000000,
				alpha: 1,
			},
		};
		border.fillStyle(borderStyle.color, borderStyle.alpha);
		border.lineStyle(borderStyle.thickness.size, borderStyle.thickness.color, borderStyle.thickness.alpha);
		border.fillPath(borderStyle.color);
		border.fillRoundedRect(borderStyle.x, borderStyle.y, borderStyle.width, borderStyle.height, borderStyle.border);
		border.strokeRoundedRect(borderStyle.x, borderStyle.y, borderStyle.width, borderStyle.height, borderStyle.border);

		const fireCosmos = this.add.text(middleWidth, 120, "Pause", TextStyle.pauseTitle);
		fireCosmos.setOrigin(0.5);

		const underlinedRect = {
			x: middleWidth - 100,
			y: 140,
			width: 200,
			height: 4,
		};
		const underlined = this.add.graphics();
		underlined.fillStyle(0xdd0000, 0.75);
		underlined.fillRectShape(underlinedRect);

		const resumeLabel = this.add.text(middleWidth, height - 100, "Press P to resume, or Q to quit", TextStyle.pauseFooter);
		resumeLabel.setOrigin(0.5);

		const keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
		const keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
		keyP.on("down", this.resumeGame, this);
		keyQ.on("down", this.quitGame, this);

		this.showPlayers();
	}

	resumeGame() {
		this.scene.resume("TeamDeathmatch");
		this.scene.stop();
	}

	quitGame() {
		this.gameConfigs.players = [];
		this.scene.stop("TeamDeathmatch");
		this.scene.start("Home");
		this.scene.stop();
	}

	showPlayers() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;

		const border = this.add.graphics();
		border.lineStyle(4, 0xff0000, 1);
		border.strokeRoundedRect(middleWidth - 400, middleHeight - 100, 800, 200, 10);

		const teamTitleX = 200;
		const teamTitleY = middleHeight - 100;
		const Ships = this.add.text(middleWidth + teamTitleX, teamTitleY, "Ships", TextStyle.pauseTeamTitle).setOrigin(0.5);
		const Aliens = this.add.text(middleWidth - teamTitleX, teamTitleY, "Aliens", TextStyle.pauseTeamTitle).setOrigin(0.5);

		const players = this.gameConfigs.players;

		players.forEach((player, index) => {
			const image = this.add.image(middleWidth - 225 + 150 * index, middleHeight, player.ship);
			image.setScale(1.25);

			image.x = (player.team === "Aliens") ?
				middleWidth - 100 * player.teamCount :
				middleWidth + 100 * player.teamCount;

			const nameLabel = this.add.text(image.x, image.y - 40, player.name, TextStyle.pausePlayer).setOrigin(0.5);

			const controllers = player.controllers;
			Object.keys(controllers).forEach((controller, index) => {
				const controllerLabel = this.add.text(
					image.x,
					image.y + 40 + index * 20,
					`${controller}: ${controllers[controller]}`,
					TextStyle.pausePlayer
				).setOrigin(0.5);
			});
		});
	}
}
