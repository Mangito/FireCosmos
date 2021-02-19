import GlobalConfigs from "../Config/GlobalConfigs";
import { ProgressBarStyle, TextStyle } from "../Managers/Theme";

export default class ProgressBar extends Phaser.GameObjects.Graphics {
	constructor(scene, options) {
		super(scene, options);
		scene.add.existing(this);

		this.scene = scene;

		this.drawProgress();
	}

	drawProgress() {
		this.position = {
			x: GlobalConfigs.screen.middleWidth - ProgressBarStyle.width / 2,
			y: GlobalConfigs.screen.middleHeight - ProgressBarStyle.height / 2
		};

		this.lastFileLoad = null;

		this.progressBarGraphics = this.scene.add.graphics();
		this.progressBox = this.scene.add.graphics();

		this.percentText = this.scene.add.text(GlobalConfigs.screen.middleWidth, GlobalConfigs.screen.middleHeight, "0%", TextStyle.progressBar);
		this.percentText.setOrigin(0.5);

		this.progressBox.fillStyle(0xffffff, 0.2);
		this.progressBox.fillRoundedRect(
			this.position.x, this.position.y,
			ProgressBarStyle.width, ProgressBarStyle.height,
			ProgressBarStyle.border);
	}

	updateBar(percentage) {
		this.progressBarGraphics.clear();
		this.progressBarGraphics.fillStyle(0x00ff00, 1);
		this.progressBarGraphics.stroke();
		this.progressBarGraphics.fillRoundedRect(
			this.position.x + ProgressBarStyle.padding.x, this.position.y + ProgressBarStyle.padding.y,
			(ProgressBarStyle.width * percentage) - (ProgressBarStyle.padding.x * 2), ProgressBarStyle.height - (ProgressBarStyle.padding.y * 2),
			ProgressBarStyle.border);

		this.percentText.setText("Load: " + Math.round(percentage * 100) + "% - " + this?.lastFileLoad?.key);
	}

	fileLoad(file) {
		this.lastFileLoad = file;
	}

	complete() {
		this.progressBarGraphics.destroy();
		this.progressBox.destroy();
		this.percentText.destroy();
	}
}
