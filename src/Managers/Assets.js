// Ship
import ShipBlue from "../Assets/Sprites/Ships/Blue.png";
import ShipRed from "../Assets/Sprites/Ships/Red.png";

import Fire from "../Assets/Sprites/Fire/Fire.png";

import BolaBranca from "../Assets/Sprites/BolaBranca.png";
import BolaVerde from "../Assets/Sprites/BolaVerde.png";

import Block from "../Assets/Sprites/Block/Block.png";

// UI
import Definicoes from "../Assets/UI/Definicoes.png";
import JogoCustomizado from "../Assets/UI/JogoCustomizado.png";
import JogoSimples from "../Assets/UI/JogoSimples.png";


const assets = {
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
	UI: {
		Buttons: {
			Definicoes,
			JogoCustomizado,
			JogoSimples,
		}
	}
};

export default assets;
