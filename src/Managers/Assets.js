// Ship
import BlackPearl from "../Assets/Sprites/Ships/BlackPearl/BlackPearl.png";
import Ceuta from "../Assets/Sprites/Ships/Ceuta/Ceuta.png";
import MilleniumFalcon from "../Assets/Sprites/Ships/MilleniumFalcon/MilleniumFalcon.png";
import Victoria from "../Assets/Sprites/Ships/Victoria/Victoria.png";

import Fire from "../Assets/Sprites/Fire/Fire.png";

import BolaBranca from "../Assets/Sprites/BolaBranca.png";
import BolaVerde from "../Assets/Sprites/BolaVerde.png";

import Block from "../Assets/Sprites/Block/Block.png";

// UI
import Button from "../Assets/UI/Button.png";


const assets = {
	Sprite: {
		Ships: {
			BlackPearl,
			Ceuta,
			MilleniumFalcon,
			Victoria,
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
