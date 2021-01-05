import nave1Img from "../assets/Nave1.png";
import nave2Img from "../assets/Nave2.png";

const FPSsDiv = document.getElementById("FPSs");

export default class Play extends Phaser.Scene {
	constructor() {
		super({ key: "Play" });
	}

	preload() {
		this.load.image('nave1', nave1Img);
		this.load.image('nave2', nave2Img);
		this.setVariables();
	}

	setVariables() {
		this.player = null;
	}

	create() {

		console.log("Play");

		this.cursors = this.input.keyboard.createCursorKeys();
		this.KeyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
	}

	update() {
		FPSsDiv.innerHTML = Number(this.game.loop.actualFps).toFixed(1);


		if (cursors.left.isDown) player1.setVelocityX(-200);
		else if (cursors.right.isDown) player1.setVelocityX(200);
		// else if (cursors.up.isDown) player2.setVelocityY(-350);

		if (keyA.isDown) player2.setVelocityX(-200);
		else if (keyD.isDown) player2.setVelocityX(200);
		// else if (keyW.isDown) fire();


		if (this.cursors.up.isDown) console.log("Cima");
		if (this.KeyW.isDown) console.log("W");
	}
}
