import { Renderer } from './Renderer'
import { SceneManager, Scene } from './SceneManager'
import { InputHandler } from './InputHandler'

export enum BtnState { DOWN, UP }

export class GameCore {
    private inputHandler: InputHandler;
    private sceneManager: SceneManager;
    private renderer: Renderer;

    private lastTime: number;
    private animationId: number;
    constructor(
        private canvas: HTMLCanvasElement,
        private scenes: Scene[]
    ) {
        this.inputHandler = new InputHandler(this.canvas);

        this.sceneManager = new SceneManager(this.scenes);
        this.renderer = new Renderer(this.canvas);
        this.lastTime = 0;
        this.animationId = 0;
    }
    run() {
        // run event listener in inputhandler
        this.inputHandler.run();

        this.lastTime = window.performance.now();
        this.animationId = requestAnimationFrame(this.gameLoop.bind(this));
    }
    public gameLoop() {
        this.animationId = requestAnimationFrame(this.gameLoop.bind(this));
        const time = window.performance.now();
        const delta = time - this.lastTime;
        this.processInput();
        this.update(time, delta);    // could stop the game
        this.render();
        this.lastTime = time;
    }


    private processInput() {
        this.inputHandler.processInput();
    }
    private update(time: number, delta: number) {
        this.sceneManager.update(time, delta);
    }
    private render() {
        this.renderer.clearScreen();
        this.sceneManager.render(this.renderer);
    }
}