import GlobalConfigs from "../Config/GlobalConfigs";
import Player from "../Objects/Player";

// import PhysicsButton from "../Components/Button";
import { TextStyle } from "../Managers/Theme";

export default class Home extends Phaser.Scene {
	constructor() {
		super({ key: "Home" });
	}

	preload() { }

	create() {
		const { middleWidth, middleHeight, width, height } = GlobalConfigs.screen;
		this.background = this.add.tileSprite(middleWidth, middleHeight, width * 2, height * 2, "Background");
		this.iter = 0.1;

		this.createPlayer();
		this.createButtons();
	}

	createPlayer() {
		this.playersPhysics = this.physics.add.group({
			classType: Player,
			runChildUpdate: true,
		});
		const config = {
			index: 0,
			name: "Player",
			ship: "Victoria",
			team: "Ships",
			teamCount: 0,
			controllers: {
				left: "LEFT",
				right: "RIGHT",
				fire: "UP",
				missile: "DOWN",
			},
		};

		this.player = this.playersPhysics.get(0, 0, config);
		if (this.player) this.player.generate();
	}

	createButtons() {
		const { middleWidth, middleHeight } = GlobalConfigs.screen;

		const btnsConfigs = [
			{	// Survive
				x: middleWidth - 250,
				y: middleHeight,
				image: "Button",
				normal: 0,
				exploded: 1,
				text: "Survive",
				style: TextStyle.buttons,
				action: () => this.scene.start("TeamDeathmatch"),
			},
			{// Team Deathmatch
				x: middleWidth + 250,
				y: middleHeight,
				image: "Button",
				normal: 0,
				exploded: 1,
				text: "TeamDeathmatch",
				style: TextStyle.buttons,
				action: () => this.scene.start("TeamDeathmatch"),
			}
		];


		btnsConfigs.map(config => {
			const { x, y, image, normal, exploded, text, style, action } = config;
			const btn = this.physics.add.sprite(x, y, image, normal);

			const label = this.add.text(x, y, text, style);
			label.setOrigin(0.5);

			this.physics.add.overlap(this.player.shoots, btn, action, null, this);
		})
	}

	update() {
		this.background.tilePositionX = Math.cos(this.iter) * 700;
		this.background.tilePositionY = Math.sin(this.iter) * 500;
		this.background.rotation += 0.0005;

		this.iter += 0.0005;
	}
}
