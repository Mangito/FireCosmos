import Phaser from "phaser";
import naveImg from "./assets/Nave.png";

import Player from "./JS/Player";
import Shoot from "./JS/Shoot";

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
let player;
let cursors;

let keyA;
let keyD;
let keyW;

function preload() {
  this.load.image('nave', naveImg);
}

function create() {
  player = this.physics.add.image(ecraWidth, ecraHeight, 'nave');
  cursors = this.input.keyboard.createCursorKeys();
  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

  player.setCollideWorldBounds(true); // Debug
  player.y -= (player.height / 4) * 3;
  player.x -= (player.width / 4) * 3;
}

function update() {
  fpsSpan.innerHTML = Number(game.loop.actualFps).toFixed(2);
  if (cursors.left.isDown || keyA.isDown) player.setVelocityX(-200);
  else if (cursors.right.isDown || keyD.isDown) player.setVelocityX(200);
  // else if (cursors.up.isDown || keyW.isDown) player.setVelocityY(-350);
}
