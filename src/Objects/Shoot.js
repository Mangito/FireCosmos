export default class Component extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "Fire");
		this.direction = null;
		this.speed = Phaser.Math.GetSpeed(400, 1);
	}

	fire(x, y, direction) {
		this.direction = direction;
		this.setPosition(x, y);
		this.setActive(true);
		this.setVisible(true);
	}

	update(time, delta) {
		if (this.direction === "Up") this.shootPUp(delta);
		if (this.direction === "Down") this.shootPDown(delta);
	}

	shootPUp(delta) {
		this.y += this.speed * delta;
		if (this.y > 800) {
			this.setActive(false);
			this.setVisible(false);
			this.destroy();

		}
	}

	shootPDown(delta) {
		this.y -= this.speed * delta;
		if (this.y < -50) {
			this.setActive(false);
			this.setVisible(false);
			this.destroy();
		}
	}
}