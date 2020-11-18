import Phaser from "phaser";
import nave1Img from "./assets/Nave1.png";
import nave2Img from "./assets/Nave2.png";

let ecraWidth = window.innerWidth - 50;
let ecraHeight = window.innerHeight - 50;
const config = {
  type: Phaser.AUTO,
  parent: "Fire Cosmos",
  width: ecraWidth,
  height: ecraHeight,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const fpsSpan = document.getElementById("FPS");

const game = new Phaser.Game(config);

let player1, player2;

let cursors;

let keyA, keyD, keyW;

function preload() {
  this.load.image('nave1', nave1Img);
  this.load.image('nave2', nave2Img);
}

function create() {
  // Teclas
  cursors = this.input.keyboard.createCursorKeys();
  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

  // Player 1
  player1 = this.physics.add.image(ecraWidth, ecraHeight, 'nave1');
  player1.setCollideWorldBounds(true); // Debug
  player1.y -= (player1.height / 2) + 10;
  player1.x -= (player1.width / 2) + 10;

  // Player 2
  player2 = this.physics.add.image(0, 0, 'nave2');
  player2.setCollideWorldBounds(true); // Debug
  player2.y += (player2.height / 2) + 10;
  player2.x += (player2.width / 2) + 10;
  player2.flipY = true;
}

function update() {
  fpsSpan.innerHTML = Number(game.loop.actualFps).toFixed(2);
  if (cursors.left.isDown) player1.setVelocityX(-200);
  else if (cursors.right.isDown) player1.setVelocityX(200);
  // else if (cursors.up.isDown) player2.setVelocityY(-350);

  if (keyA.isDown) player2.setVelocityX(-200);
  else if (keyD.isDown) player2.setVelocityX(200);
  // else if (keyW.isDown) fire();

}
