import { Dino } from './classes/Dino'
import { Cactus } from './classes/Cactus'

let canvas: HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
let c: CanvasRenderingContext2D = canvas.getContext('2d')!;

const dino = new Dino(0, 0);

window.addEventListener('click', (event: MouseEvent) => {
    console.log('go');
    const cactus = new Cactus(event.clientX, event.clientY, 0);
    cactus.draw(c);
});
window.addEventListener('keypress', (event: KeyboardEvent) => {
    if (event.key == " ") {
        console.log('space');
    }
})

let lastTime: number = window.performance.now();
requestAnimationFrame(loop)

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
}

function update(time: number, delta: number) {
    dino.setPosition(0, canvas.height);
}

function render() {
    dino.draw(c);
}