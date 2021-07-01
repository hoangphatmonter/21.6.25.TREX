import { Dino, BtnStatus } from './classes/Dino'
import { Cactus } from './classes/Cactus'
import { Bird } from './classes/Bird'
import { Ground } from './classes/Ground'
import { ScoreCounter } from './classes/ScoreCounter'
import { GameOverScene } from './classes/GameOverScene'
import { StartScene } from './classes/StartScene'
import { BackGround } from './classes/Background'

// get the canvas of the screen
let canvas: HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
let c: CanvasRenderingContext2D = canvas.getContext('2d')!;

enum GameState { READY, PLAYING, OVER };

export const GRAVITY = 700; // px/s^2
const GAMESPEED = 200; // px/s
// Button status
let btnPressed: BtnStatus;
let gameState: GameState;

// create background
let bg: BackGround;
// create player
let dino: Dino;
// create ground
let ground: Ground;
// create score counter
const scoreCounter = new ScoreCounter(20, 20, 15);
// list of cactuses
let enemies: (Cactus | Bird)[];
// game start box
let startScene: StartScene;
// game over box
let gameOverScene: GameOverScene;

let lastTime: number;
let animationId: number;

init(window.innerWidth, window.innerHeight, GameState.READY);

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
    dino.setBtnPressed(btnPressed);
}

function update(time: number, delta: number) {
    if (gameState === GameState.PLAYING) {
        // some code put here if window resize

        // update bg
        bg.update(delta);

        // update ground
        ground.update(delta, canvas);

        // update dino state
        dino.update(delta, ground);

        // update score
        let curScore = scoreCounter.getScore();
        scoreCounter.setScore(curScore + Math.floor(GAMESPEED * delta / 1000));

        // update cactus state
        for (let i = 0; i < enemies.length; i++) {
            enemies[i].update(delta);
            // check collision

            // destroy if out of scene
            if (enemies[i].getBotRightPosition()[0] < 0) {
                enemies.splice(i, 1);
                i--;
                continue;
            }

            // collision happen when cactus enter the Dino area
            let cLeftX = enemies[i].getTopLeftPosition()[0];
            let cRightX = enemies[i].getTopRightPosition()[0];
            let cTopY = enemies[i].getTopLeftPosition()[1];
            let cBotY = enemies[i].getBotLeftPosition()[1];
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
                // stop the game (remove the newest request frame in queue)
                cancelAnimationFrame(animationId);
                // change game state
                console.log('over')
                gameState = GameState.OVER;
                // update high score if need
                scoreCounter.updateHighScore();

                //cactuses = [];
                //scoreCounter.setScore(0);
            }
        }
        // push more cactus
        cactusSpawnTime -= delta;
        if (cactusSpawnTime < 0) {
            if (Math.random() <= 0.7) {
                enemies.push(new Cactus(canvas.width + 10, canvas.height - ground.getHeight(), GAMESPEED));
            }
            else {
                let h = canvas.height - ground.getHeight() - Math.random() * canvas.height / 2;
                enemies.push(new Bird(canvas.width + 10, h, GAMESPEED));
            }
            cactusSpawnTime = genCacTime();
        }
    }
}

function render() {
    if (gameState === GameState.READY) {
        // show start screen
        startScene.draw(c);
    }
    else if (gameState === GameState.OVER) {
        // show game over screen
        gameOverScene.draw(c, scoreCounter.getScore(), scoreCounter.getHighScore());
    }
    else if (gameState === GameState.PLAYING) {
        // clear screen
        c.clearRect(0, 0, canvas.width, canvas.height);
        // draw score
        scoreCounter.draw(c);
        // draw ground
        ground.draw(c);
        // draw bg
        bg.draw(c);
        // draw all objects
        dino.draw(c);
        for (let i = 0; i < enemies.length; i++) {
            enemies[i].draw(c);
        }
    }
}


window.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === " " || event.key === 'w') {
        btnPressed = BtnStatus.JUMP;
    }
    else if (event.key == 's') {
        btnPressed = BtnStatus.COUCH;
    }
})

window.addEventListener('keyup', (event: KeyboardEvent) => {
    if (event.key === " " || event.key === 'w') {
        btnPressed = BtnStatus.NONE
    }
    else if (event.key === 's') {
        btnPressed = BtnStatus.NONE;
    }
})

canvas.addEventListener('click', (event: MouseEvent) => {
    let mousePos = getMousePosInCanvasCordinates(canvas, event);

    if (gameState === GameState.OVER) {
        if (gameOverScene.isInRestartBtn(mousePos.x, mousePos.y)) {
            init(window.innerWidth, window.innerHeight, GameState.PLAYING);
        }
    }
    else if (gameState === GameState.READY) {
        if (startScene.isInPlayBtn(mousePos.x, mousePos.y)) {
            init(window.innerWidth, window.innerHeight, GameState.PLAYING);
        }
    }
})

function init(width: number, height: number, state: GameState) {
    console.log('dlsajd')
    // update canvas size
    canvas.width = width - 100;
    canvas.height = height - 100;

    btnPressed = BtnStatus.NONE;
    gameState = state;

    if (gameState === GameState.READY) {
        startScene = new StartScene(canvas.width / 2, canvas.height / 2);
    }

    gameOverScene = new GameOverScene(canvas.width / 2, canvas.height / 2);
    ground = new Ground(0, canvas.height, GAMESPEED);
    dino = new Dino(0 + 50, canvas.height - ground.getHeight() - 100);
    enemies = [];
    bg = new BackGround(canvas.width, 100, GAMESPEED / 20);

    scoreCounter.setScore(0);
    lastTime = window.performance.now()
    animationId = requestAnimationFrame(loop)

    // something put here to init cactus position resize to screen
}

function genCacTime() {
    return (Math.floor(Math.random() * 2) + 2) * 1000; // 1-4s
}

function getMousePosInCanvasCordinates(canvas: HTMLCanvasElement, event: MouseEvent) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
}