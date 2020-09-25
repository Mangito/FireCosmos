// Canvas
const canvas = document.getElementById("Canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Jogadores
const jogadorWidth = 10;
const jogadorHeight = 10;
const jogadorVelocidade = 5;
const jogadorX = canvasWidth / 2 + jogadorWidth / 2;
// Tiro
const tiroWidth = 5;
const tiroHeight = 5;
const tiroVelocidade = 10;

let jogadorA = {
	posicao: {
		x: canvasWidth / 2 + jogadorWidth / 2,
		y: 0,
		irDireita: false
	},
	tiro: {
		posicao: {
			x: jogadorX + tiroWidth / 2,
			y: 0 + jogadorHeight
		},
		visivel: false
	},
	pontos: 0
};

// Jogador B -> Jogador de Baixo
let jogadorB = {
	posicao: {
		x: canvasWidth / 2 + jogadorWidth / 2,
		y: canvasHeight - jogadorHeight,
		irDireita: true
	},
	tiro: {
		posicao: {
			x: jogadorX + tiroWidth / 2,
			y: canvasHeight - jogadorHeight
		},
		visivel: false
	},
	pontos: 0
};



// Volta a apresentar os objetos do jogo
// Move o tiro se for visivel
let interval = setInterval(() => {
	moverTiro();
	desenhar();
}, 1000 / 60); // 60 frames per second (fps)

// Desenha os objetos do jogo
function desenhar() {
	// Limpar Mapa
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

	// Pontos
	ctx.textAlign = "center";
	ctx.font = "20px monospace";
	ctx.fillStyle = "rgb(255, 255, 0, 0.5)";
	ctx.fillText(`Pontos: ${jogadorA.pontos}`, canvasWidth / 2, 50);

	ctx.fillStyle = "rgb(0, 255, 255, 0.5)";
	ctx.fillText(`Pontos: ${jogadorB.pontos}`, canvasWidth / 2, canvasHeight - 50);

	// Mover Jogador
	if (jogadorA.posicao.irDireita &&
		jogadorA.posicao.x <= canvasWidth - jogadorWidth - jogadorVelocidade) jogadorA.posicao.x += jogadorVelocidade;
	if (jogadorA.posicao.irDireita == false &&
		jogadorA.posicao.x >= jogadorWidth) jogadorA.posicao.x -= jogadorVelocidade;

	if (jogadorB.posicao.irDireita &&
		jogadorB.posicao.x <= canvasWidth - jogadorWidth - jogadorVelocidade) jogadorB.posicao.x += jogadorVelocidade;
	if (jogadorB.posicao.irDireita == false &&
		jogadorB.posicao.x >= jogadorWidth) jogadorB.posicao.x -= jogadorVelocidade;

	// Jogador A
	ctx.fillStyle = "yellow";
	ctx.fillRect(jogadorA.posicao.x, jogadorA.posicao.y, jogadorWidth, jogadorHeight);

	// Jogador B
	ctx.fillStyle = "blue";
	ctx.fillRect(jogadorB.posicao.x, jogadorB.posicao.y, jogadorWidth, jogadorHeight);

	// Tiro
	if (jogadorA.tiro.visivel) {
		ctx.fillStyle = "#b1ff52";
		ctx.fillRect(jogadorA.tiro.posicao.x, jogadorA.tiro.posicao.y, tiroWidth, tiroHeight);
	} else jogadorA.tiro.posicao.x = jogadorA.posicao.x + tiroWidth / 2;

	if (jogadorB.tiro.visivel) {
		ctx.fillStyle = "#00ffff";
		ctx.fillRect(jogadorB.tiro.posicao.x, jogadorB.tiro.posicao.y, tiroWidth, tiroHeight);
	} else jogadorB.tiro.posicao.x = jogadorB.posicao.x + tiroWidth / 2;
	inavasorColisao();
}


// Detetar click das teclas
document.addEventListener("keydown", (e) => moverJogador(e));
function moverJogador(e) {
	const keyCode = e.keyCode;

	// Jogador A
	if (keyCode === 65) jogadorA.posicao.irDireita = false; // A
	if (keyCode === 68) jogadorA.posicao.irDireita = true; // D
	if (keyCode === 87) jogadorA.tiro.visivel = true; // W

	// Jogador B
	if (keyCode === 37) jogadorB.posicao.irDireita = false;
	if (keyCode === 39) jogadorB.posicao.irDireita = true;
	if (keyCode === 38) jogadorB.tiro.visivel = true;
	desenhar();
}

function moverTiro() {
	if (jogadorA.tiro.visivel) {
		jogadorA.tiro.posicao.y += tiroVelocidade;
		if (jogadorA.tiro.posicao.y > canvasHeight) {
			jogadorA.tiro.visivel = false;
			jogadorA.tiro.posicao.y = jogadorA.posicao.y + jogadorHeight;
		}
	}

	if (jogadorB.tiro.visivel) {
		jogadorB.tiro.posicao.y -= tiroVelocidade;
		if (jogadorB.tiro.posicao.y < 0) {
			jogadorB.tiro.visivel = false;
			jogadorB.tiro.posicao.y = jogadorB.posicao.y;
		}
	}
}

function inavasorColisao() {
	// Tiro A mata jogador B
	if (jogadorA.tiro.posicao.x > jogadorB.posicao.x &&
		jogadorA.tiro.posicao.x < jogadorB.posicao.x + jogadorWidth &&
		jogadorA.tiro.posicao.y > jogadorB.posicao.y - jogadorHeight &&
		jogadorA.tiro.visivel) {
		jogadorA.tiro.visivel = false;
		jogadorA.tiro.posicao.y = jogadorA.posicao.y + jogadorHeight;
		jogadorA.pontos++;
	}

	// Tiro B mata jogador A
	if (jogadorB.tiro.posicao.x > jogadorA.posicao.x &&
		jogadorB.tiro.posicao.x < jogadorA.posicao.x + jogadorWidth &&
		jogadorB.tiro.posicao.y < jogadorA.posicao.y + jogadorHeight &&
		jogadorB.tiro.visivel) {
		jogadorB.tiro.visivel = false;
		jogadorB.tiro.posicao.y = jogadorB.posicao.y;
		jogadorB.pontos++;
	}
}