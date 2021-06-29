import { Dino } from './classes/Dino'
import { Cactus } from './classes/Cactus'
import { Ground } from './classes/Ground'
import { ScoreCounter } from './classes/ScoreCounter'
import { GameOverScene } from './classes/GameOverScene'

// get the canvas of the screen
let canvas: HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
let c: CanvasRenderingContext2D = canvas.getContext('2d')!;

enum GameState { READY, PLAYING, OVER };

export const GRAVITY = 700; // px/s^2
// Button status
let isSpacePressed: boolean;
let gameState: GameState;

// create player
let dino: Dino;
// create ground
let ground: Ground;
// create score counter
const scoreCounter = new ScoreCounter(20, 20, 15);
// list of cactuses
let cactuses: Cactus[];
// game over box
let gameOverScene: GameOverScene;

let lastTime: number;
let animationId: number;

init(window.innerWidth, window.innerHeight);

// time to push more cactus
let cactusSpawnTime = genCacTime();

function loop() {
    animationId = requestAnimationFrame(loop);
    const time = window.performance.now();
    const delta = time - lastTime;
    processInput();
    update(time, delta);    // could stop the game
    render();
    lastTime = time;
}

function processInput() {
    // check if user press space
    dino.setJump(isSpacePressed);
}

function update(time: number, delta: number) {
    // some code put here if window resize

    // update dino state
    dino.update(delta, ground);

    // update score
    let curScore = scoreCounter.getScore();
    scoreCounter.setScore(curScore + 1);

    // update cactus state
    for (let i = 0; i < cactuses.length; i++) {
        cactuses[i].update(delta);
        // check collision

        // destroy if out of scene
        if (cactuses[i].getBotRightPosition()[0] < 0) {
            cactuses.splice(i, 1);
            i--;
            continue;
        }

        // collision happen when cactus enter the Dino area
        let cLeftX = cactuses[i].getTopLeftPosition()[0];
        let cRightX = cactuses[i].getTopRightPosition()[0];
        let cTopY = cactuses[i].getTopLeftPosition()[1];
        let cBotY = cactuses[i].getBotLeftPosition()[1];
        let dLeftX = dino.getBotLeftPosition()[0];
        let dRightX = dino.getBotRightPosition()[0];
        let dTopY = dino.getTopLeftPosition()[1];
        let dBotY = dino.getBotLeftPosition()[1];
        if (
            dLeftX < cRightX && // c in front of d
            dRightX > cLeftX && // may be a part of left c in d if not jump
            dTopY < cBotY && // may be a part of bot c in d if not couch
            dBotY > cTopY // may be a part of top c in d if not jump
        ) {
            // show game over scene
            // - stop the game (remove the newest request frame in queue)
            cancelAnimationFrame(animationId);
            // change game state
            gameState = GameState.OVER;

            //cactuses = [];
            //scoreCounter.setScore(0);
        }
    }
    // push more cactus
    cactusSpawnTime -= delta;
    if (cactusSpawnTime < 0) {
        cactuses.push(new Cactus(canvas.width + 10, canvas.height - ground.getHeight(), 200));
        cactusSpawnTime = genCacTime();
    }
}

function render() {
    // clear screen
    c.clearRect(0, 0, canvas.width, canvas.height);
    // draw score
    scoreCounter.draw(c);
    // draw ground
    ground.draw(c);
    // draw all objects
    dino.draw(c);
    for (let i = 0; i < cactuses.length; i++) {
        cactuses[i].draw(c);
    }

    if (gameState === GameState.READY) {
        // show start screen
    }
    else if (gameState == GameState.OVER) {
        // show game over screen
        gameOverScene.draw(c);
    }
}


window.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === " " || event.key === 'w') {
        isSpacePressed = true;
    }
})

window.addEventListener('keyup', (event: KeyboardEvent) => {
    if (event.key === " " || event.key === 'w') {
        isSpacePressed = false;
    }
})

canvas.addEventListener('click', (event: MouseEvent) => {
    let mousePos = getMousePosInCanvasCordinates(canvas, event);

    if (gameState === GameState.OVER) {
        if (gameOverScene.isInRestartBtn(mousePos.x, mousePos.y)) {
            init(window.innerWidth, window.innerHeight);
        }
    }
})

function init(width: number, height: number) {
    // update canvas size
    canvas.width = width - 100;
    canvas.height = height - 100;

    isSpacePressed = false;
    gameState = GameState.READY;
    ground = new Ground(canvas.width, canvas.height);
    dino = new Dino(0 + 50, canvas.height - ground.getHeight() - 100);
    cactuses = [];
    gameOverScene = new GameOverScene(canvas.width / 2, canvas.height / 2);

    scoreCounter.setScore(0);

    // something put here to init cactus position resize to screen

    lastTime = window.performance.now()
    animationId = requestAnimationFrame(loop)
}

function genCacTime() {
    return (Math.floor(Math.random() * 2) + 2) * 1000; // 1-4s
}

function isInArea(value: number, range1: number, range2: number) {
    if (value >= range1 && value <= range2)
        return true;
    return false;
}

function getMousePosInCanvasCordinates(canvas: HTMLCanvasElement, event: MouseEvent) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
}