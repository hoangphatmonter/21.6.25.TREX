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

// list of scene, add game object to scene
let s1 = new GamePlay(false, canvas.width, canvas.height, GAMESPEED);

let s2 = new GameStart(true, canvas.width, canvas.height);
let s3 = new GameOver(false, canvas.width, canvas.height);

s1.setScene(s2, s3);
s2.setScene(s1, s3);
s3.setScene(s2, s1);

// start the game
let game = new GameCore(canvas, [s1, s2, s3])
game.run();