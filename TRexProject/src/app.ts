import { Dino } from "./game/Dino";
import { Ground } from "./game/Ground";
import { GameCore } from "./engine/GameCore";
import { Scene } from "./engine/SceneManager";
import { GameStart } from "./game/scenes/GameStart";
import { Cactus } from "./game/Cactus";
import { GamePlay } from "./game/scenes/GamePlay";
import { ScoreCounter } from "./game/ScoreCounter";
import { GameOver } from "./game/scenes/GameOver";

// get the canvas of the screen
let canvas: HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
let ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

let GAMESPEED = 200; // px/s
export const GRAVITY = 5000; // px/s^2

// list of game object
console.log(canvas.height - 50);
let ground = new Ground(0, canvas.height - 50, './images/ground/', 'ground.png', 1, GAMESPEED, canvas.width);

// Note: y must minus more with dino image height
let dino = new Dino(50, canvas.height - ground.getGround(), './images/dino/', 'idle.png', 1, ground);

let score = new ScoreCounter(30, 30, 'Score: 0', 15, 'green', GAMESPEED);

// list of scene, add game object to scene
let s1 = new GamePlay(true, canvas.width, canvas.height, dino, ground, GAMESPEED);
s1.add(dino);
s1.add(ground);
s1.add(score)

let s2 = new GameStart(false, canvas.width, canvas.height);
let s3 = new GameOver(false, canvas.width, canvas.height);

s1.setScene(s2, s3);

// start the game
let game = new GameCore(canvas, [s1])
game.run();