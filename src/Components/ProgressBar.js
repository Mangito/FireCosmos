export default function progressBar() {

	console.log("progressBar");

	const progressBar = this.add.graphics();
	const progressBox = this.add.graphics();

	progressBox.fillStyle(0xffffff, 0.5);
	progressBox.fillRoundedRect(240, 270, 320, 50, 4);

	this.load.on("progress", value => {
		console.log(value);
		progressBar.clear();
		progressBar.fillStyle(0xff0000, 1);
		progressBar.fillRoundedRect(250, 280, 300 * value, 30, 4);
	});

	this.load.on("complete", () => {
		console.log("Complete");
		progressBar.destroy();
		progressBox.destroy();
	});
}
