import { Dino } from './classes/Dino'
import { Cactus } from './classes/Cactus'
import { Ground } from './classes/Ground'
import { ScoreCounter } from './classes/ScoreCounter'

// get the canvas of the screen
let canvas: HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
let c: CanvasRenderingContext2D = canvas.getContext('2d')!;

// Button status
let isSpacePressed = false;
export const GRAVITY = 700; // px/s^2

// create player
const dino = new Dino(0, 0);
// create ground
const ground = new Ground(0, 0);
// create score counter
const scoreCounter = new ScoreCounter(20, 20, 15);

let cactuses: Cactus[] = [];

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

function init(width: number, height: number) {
    // update canvas size
    canvas.width = width - 100;
    canvas.height = height - 100;

    // update ground position
    ground.setPosition(canvas.width, canvas.height);

    // update dino state
    dino.setPosition(0 + 50, canvas.height - ground.getHeight() - 100);

    scoreCounter.setScore(0);

    // something put here to init cactus position
}

let lastTime: number = window.performance.now();
init(window.innerWidth, window.innerHeight);
requestAnimationFrame(loop);

// time to push more cactus
let cactusSpawnTime = genCacTime();

function genCacTime() {
    return (Math.floor(Math.random() * 2) + 2) * 1000; // 1-4s
}

function isInArea(value: number, range1: number, range2: number) {
    if (value >= range1 && value <= range2)
        return true;
    return false;
}

function loop() {
    const time = window.performance.now();
    const delta = time - lastTime;
    processInput();
    update(time, delta);
    render();
    lastTime = time;
    requestAnimationFrame(loop)
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
            cactuses = [];
            scoreCounter.setScore(0);
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
}