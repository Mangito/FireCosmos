const style = {
	font: "bold 10px Arial",
	fill: "#fff",
	boundsAlignH: "center",
	boundsAlignV: "middle",
};

export default function button({ text, x, y, action }) {
	const btn = this.add.image(x, y, "Button");
	btn.setInteractive({ useHandCursor: true });
	btn.on("pointerdown", action);

	const label = this.add.text(x, y, text, style);
	label.setOrigin(0.5);
}
