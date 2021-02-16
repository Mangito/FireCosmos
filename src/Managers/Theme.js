const PressStart2P = "'Press Start 2P'";

export const Banner = {
	Text: "#ffffff",
	Background: [
		"#000000",
		"#ff0000",
		"#ff8000",
		"#ffff00",
		"#00ff00",
		"#00ffff",
		"#0000ff",
		"#ffffff",
		"#bb0000"
	],
};

export const TextStyle = {
	fireCosmos: {
		fontFamily: PressStart2P,
		fontSize: 50,
		fill: "#000",
		stroke: '#fff',
		strokeThickness: 2,
		boundsAlignH: "center",
		boundsAlignV: "middle",
		shadow: {
			offsetX: 5,
			offsetY: 5,
			color: "#f00",
			blur: 2,
			stroke: true,
			fill: true
		},
	},
	base: {
		fontFamily: PressStart2P,
		fontSize: 8,
		color: '#fff',
		stroke: '#f00',
		strokeThickness: 2,
	},
	points: {
		fontFamily: PressStart2P,
		fontSize: 10,
		color: '#fff',
		stroke: '#f00',
		strokeThickness: 2,
	},
	buttons: {
		fontFamily: PressStart2P,
		fontSize: 16,
		fill: "#000",
		stroke: '#fff',
		strokeThickness: 2,
		boundsAlignH: "center",
		boundsAlignV: "middle",
		shadow: {
			offsetX: 0,
			offsetY: 0,
			color: "#f00",
			blur: 10,
			stroke: true,
			fill: true
		},
	},
	pauseTitle: {
		fontFamily: PressStart2P,
		fontSize: 40,
		fill: "#000",
		stroke: '#fff',
		strokeThickness: 1,
		boundsAlignH: "center",
		boundsAlignV: "middle",
		shadow: {
			offsetX: 2,
			offsetY: 2,
			color: "#b00",
			blur: 2,
			stroke: true,
			fill: true
		},
	},
	pauseTeamTitle: {
		fontFamily: PressStart2P,
		fontSize: 16,
		fill: "#fff",
		boundsAlignH: "center",
		boundsAlignV: "middle",
		shadow: {
			offsetX: 0,
			offsetY: 0,
			color: "#d00",
			blur: 5,
			fill: true
		},
	},
	pausePlayer: {
		fontFamily: "monospace",
		fontSize: 14,
		fill: "#fff",
		boundsAlignH: "center",
		boundsAlignV: "middle",
	},
	pauseFooter: {
		fontFamily: "monospace",
		fontSize: 16,
		fill: "#000",
		boundsAlignH: "center",
		boundsAlignV: "middle",
		shadow: {
			offsetX: 0,
			offsetY: 0,
			color: "#d00",
			blur: 5,
			fill: true
		},
	}
};
