// Ship
import ShipBlue from "../Assets/Sprites/Ships/Blue.png";
import ShipRed from "../Assets/Sprites/Ships/Red.png";

import Fire from "../Assets/Sprites/Fire/Fire.png";

import BolaBranca from "../Assets/Sprites/BolaBranca.png";
import BolaVerde from "../Assets/Sprites/BolaVerde.png";

import Block from "../Assets/Sprites/Block/Block.png";

// UI
import Button from "../Assets/UI/Button.png";


const assets = {
	Sprite: {
		Ships: {
			ShipBlue,
			ShipRed,
		},
		Invaders: {},
		Shoot: {
			Fire
		},
		Missil: {
			Green: BolaVerde
		},
		Block: {
			Block
		},
		Background: {},
		Asteroids: {
			BolaBranca
		},
	},
	UI: {
		Buttons: {
			Button,
		}
	},
	Sound: {}
};

export default assets;
