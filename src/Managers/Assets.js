import ShipBlue from "../Assets/Sprites/ShipBlue.png";
import ShipYellow from "../Assets/Sprites/ShipYellow.png";
import Fire from "../Assets/Sprites/Fire.png";
import BolaBranca from "../Assets/Sprites/BolaBranca.png";
import BolaVerde from "../Assets/Sprites/BolaVerde.png";

import Definicoes from "../Assets/UI/Definicoes.png";
import JogoCustomizado from "../Assets/UI/JogoCustomizado.png";
import JogoSimples from "../Assets/UI/JogoSimples.png";

const assets = {
	Player: {
		ShipBlue,
		ShipYellow,
	},
	Shoot: {
		Fire
	},
	Background: {},
	Asteroids: {
		BolaBranca
	},
	Balls: {
		Green: BolaVerde
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
