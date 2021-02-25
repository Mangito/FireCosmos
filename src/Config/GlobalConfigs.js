const GlobalConfigs = {
	screen: {
		width: 1000,
		height: 600,
		middleWidth: 0,
		middleHeight: 0,
	},
	debug: false,
	language: "en",
	isMute: false,
	textureShips: ["BlackPearl", "Ceuta", "MilleniumFalcon", "Victoria"],
	textureAliens: ["Olho", "Ravi", "Shell", "Tank"],
	controllers: [
		{ // P1
			left: "LEFT",
			right: "RIGHT",
			fire: "UP",
		},
		{// P2
			left: "A",
			right: "D",
			fire: "W",
		},
		{// P3
			left: "J",
			right: "L",
			fire: "I",
		},
		{// P4
			left: "F",
			right: "H",
			fire: "T",
		}
	],
};

GlobalConfigs.screen.middleWidth = GlobalConfigs.screen.width / 2;
GlobalConfigs.screen.middleHeight = GlobalConfigs.screen.height / 2;

export default GlobalConfigs;
