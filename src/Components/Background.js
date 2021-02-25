import GlobalConfigs from "../Config/GlobalConfigs";

export default class Background extends Phaser.GameObjects.TileSprite {
	constructor(scene) {
		const { middleWidth, middleHeight, width, height } = GlobalConfigs.screen;
		super(scene, middleWidth, middleHeight, width * 2, height * 2, "Background");

		this.bgPosition = 0.1;

		scene.add.existing(this);
	}

	preUpdate() {
		this.tilePositionX = Math.cos(this.bgPosition) * 700;
		this.tilePositionY = Math.sin(this.bgPosition) * 500;
		this.rotation += 0.0001;

		this.bgPosition += 0.0005;
	}
}
