import GlobalConfigs from "../../Config/GlobalConfigs";
import GameConfigs from "./GameConfigs";
import { TextStyle } from "../../Managers/Theme";

import Background from "../../Components/Background";

export default class CustomizeTeamDeathmatch extends Phaser.Scene {
	constructor() {
		super({ key: "CustomizeTeamDeathmatch" });

		this.gameConfigs = GameConfigs.getInstance();
	}

	preload() { }

	create() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;

		const background = new Background(this);

		this.playersLabels = [];

		const border = this.add.graphics();
		border.clear();

		border.lineStyle(4, 0xdd0000, 1);
		border.strokeRoundedRect(middleWidth - middleWidth / 2, middleHeight - middleHeight / 4, middleWidth, middleHeight / 2, 6);

		this.drawGameConfigs();
		this.drawPlayersConfigs();
	}

	drawGameConfigs() {
		const graphics = this.add.graphics();
		graphics.fillStyle(0xdd0000, 1);

		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;
		const startX = middleWidth - middleWidth / 2 + 10;
		const startY = 230;

		// Game Mode
		const gameModeLabel = this.add.text(startX, startY, "Game Mode:", TextStyle.customizeBase);

		const modes = ["Free", "Time", "Points", "Sudden Death"];

		this.modeLabels = [];
		modes.map((mode, index) => {
			const x = startX + 100 * index;
			const y = startY + 30;

			const label = this.add.text(x, y, mode, mode !== "Free" ? TextStyle.customizeBase : TextStyle.customizeBaseSelect);
			graphics.lineBetween(x, y + label.height, x + label.width, y + label.height);

			label.setInteractive({ useHandCursor: true });
			label.on("pointerup", this.modeClick.bind(this, mode, label));
			this.modeLabels.push(label);
		});

		// Asteroids
		const asteroid = this.add.image(startX + 50, startY + 100, "Asteroid");
		asteroid.setInteractive({ useHandCursor: true });
		asteroid.on("pointerup", () => {
			this.gameConfigs.asteroids = !this.gameConfigs.asteroids;
			asteroid.alpha = this.gameConfigs.asteroids ? 1 : 0.5;
		});

		// Friction
		const friction = this.add.image(middleWidth, startY + 100, "Friction");
		friction.setInteractive({ useHandCursor: true });
		friction.alpha = 0.5;
		friction.on("pointerup", () => {
			this.gameConfigs.players.friction = !this.gameConfigs.players.friction;
			friction.alpha = this.gameConfigs.players.friction ? 1 : 0.5;
		});

		// Blocks
		const blocks = this.add.image(startX + 400, startY + 100, "Block");
		blocks.setInteractive({ useHandCursor: true });
		blocks.on("pointerup", () => {
			this.gameConfigs.blocks = !this.gameConfigs.blocks;
			blocks.alpha = this.gameConfigs.blocks ? 1 : 0.5;
		});

		const startGame = this.add.text(width - 100, height - 50, "=>", TextStyle.start);
		startGame.setInteractive({ useHandCursor: true });
		startGame.on("pointerup", () => this.gameConfigs.players.length && this.scene.start("TeamDeathmatch"));
	}

	modeClick(mode, select) {
		this.modeLabels.map(l => {
			l.setStyle(TextStyle.customizeBase);
		});
		this.gameConfigs.mode = mode;
		select.setStyle(TextStyle.customizeBaseSelect);
	}

	drawPlayersConfigs() {
		const { width, height, middleWidth, middleHeight } = GlobalConfigs.screen;
		const invaders = ["Olho", "Ravi", "Shell", "Tank"];
		const ships = ["BlackPearl", "Ceuta", "MilleniumFalcon", "Victoria"];

		invaders.map((i, index) => {
			let canBeSelected = true;
			const invader = this.add.image(middleWidth - 50 * (index + 1), 50, i);
			invader.alpha = 0.5;
			invader.setInteractive({ useHandCursor: true });

			invader.on("pointerup", () => {
				const countTeam = this.gameConfigs.players.filter(p => p.team === "Aliens").length;
				if (canBeSelected && this.gameConfigs.players.length < 4 && countTeam < 3) {
					this.addPlayer(i, "Aliens");
					invader.alpha = 1;
					this.playersLabels.push(this.add.text(invader.x, invader.y, "P" + this.gameConfigs.players.length, TextStyle.base).setOrigin(0.5));
					canBeSelected = false;
				} else if (!canBeSelected) {
					this.removePlayer(i);
					invader.alpha = 0.5;
					canBeSelected = true;
				}
			});

		});

		ships.map((s, index) => {
			let canBeSelected = true;
			const ship = this.add.image(middleWidth + 50 * (index + 1), height - 50, s);
			ship.alpha = 0.5;
			ship.setInteractive({ useHandCursor: true });

			ship.on("pointerup", () => {
				const countTeam = this.gameConfigs.players.filter(p => p.team === "Ships").length;
				if (canBeSelected && this.gameConfigs.players.length < 4 && countTeam < 3) {
					this.addPlayer(s, "Ships");
					ship.alpha = 1;
					this.playersLabels.push(this.add.text(ship.x, ship.y, "P" + this.gameConfigs.players.length, TextStyle.base).setOrigin(0.5));
					canBeSelected = false;
				} else if (!canBeSelected) {
					this.removePlayer(s);
					ship.alpha = 0.5;
					canBeSelected = true;
				}
			});

		});
	}

	addPlayer(sprite, team) {
		const index = this.gameConfigs.players.length;

		const teamCount = this.gameConfigs.players.filter(p => p.team === team);

		const config = {
			index: this.gameConfigs.players.length,
			name: "P" + (index + 1),
			ship: sprite,
			team: team,
			teamCount: teamCount.length + 1,
			controllers: GlobalConfigs.controllers[index],
		};
		this.gameConfigs.players.push(config);
	}

	removePlayer(sprite) {
		const playersConfig = this.gameConfigs.players;
		const index = playersConfig.filter(p => p.ship === sprite)[0].index;
		playersConfig.splice(index, 1);

		let teamCountShips = 0;
		let teamCountAliens = 0;
		playersConfig.forEach((p, index) => {
			p.index = index;
			p.name = "P" + (index + 1);
			if (p.team === "Aliens") {
				teamCountAliens++;
				p.teamCount = teamCountAliens;
			} else {
				teamCountShips++;
				p.teamCount = teamCountShips;
			}
			p.controllers = GlobalConfigs.controllers[index];
		});

		this.playersLabels.forEach(l => l.setVisible(false));
		this.playersLabels.splice(index, 1);
		this.playersLabels.forEach((l, index) => {
			l.setVisible(true);
			l.setText(playersConfig[index].name);
		});
	}
}
