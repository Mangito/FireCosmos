import GlobalConfigs from "../Config/GlobalConfigs";

export default class Button extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y);
	}

	generate(configs) {
		const { x, y, image, text, style } = configs;
		const { middleWidth, middleHeight } = GlobalConfigs.screen;

		this.realX = x;
		this.setPosition(x, y);
		this.setTexture(image);
		this.setFrame(0);

		this.body.setSize(0, 0, this.frame.width, this.frame.height); // Change HitBox

		this.label = this.scene.add.text(x, y, text, style).setOrigin(0.5);
	}

	changeFrame(isYoyo = false) {
		this.setFrame(this.frame.name === 1 ? 0 : 1);

		if (isYoyo) setTimeout(() => this.changeFrame(), 1000);
	}

	changeVisible(visible = true) {
		this.setVisible(visible);
		this.label.setVisible(visible);
		this.setX(visible ? this.realX : -this.width);
	}

	action() {
		console.log("Coisão");
	}
}
