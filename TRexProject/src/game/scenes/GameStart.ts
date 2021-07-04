import { BtnState } from "../../engine/GameCore";
import { GameObjectImage } from "../../engine/GameObjects/GameObjectImage";
import { GameObjectRectangle } from "../../engine/GameObjects/GameOjectRectangle";
import { InputHandler } from "../../engine/InputHandler";
import { Scene } from "../../engine/SceneManager";
import { GameOver } from "./GameOver";
import { GamePlay } from "./GamePlay";

export class GameStart extends Scene {
    // other scene state
    private gameOver: GameOver | undefined;
    private gamePlay: GamePlay | undefined;
    // object in this scene
    private rect: GameObjectRectangle;
    private playBtn: GameObjectImage;
    constructor(
        isActive: Boolean,
        canvasWidth: number,
        canvasHeight: number,
    ) {
        super(isActive, canvasWidth, canvasHeight);

        // box
        let w = 400;
        let h = 200;
        this.rect = new GameObjectRectangle((this.canvasWidth - w) / 2, (this.canvasHeight - h) / 2, w, h);
        this.gameObjects.push(this.rect);

        //
        w = 200; // 1/10 image size
        h = 140;
        this.playBtn = new GameObjectImage((this.canvasWidth - w) / 2, (this.canvasHeight - h) / 2, './images/', 'playButton.png', 0.1);
        this.gameObjects.push(this.playBtn);
    }
    override update(time: number, delta: number) {
        let mouseState = InputHandler.mouseState();
        if (mouseState.state === BtnState.DOWN && this.playBtn.isInImage(mouseState.x, mouseState.y)) {
            console.log('ya')
            this.setActive(false);
            this.gamePlay?.setActive(true);
        }
    }
    setScene(gamePlay: GamePlay, gameOver: GameOver) {
        this.gamePlay = gamePlay;
        this.gameOver = gameOver;
    }
}