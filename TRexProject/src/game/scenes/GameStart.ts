import { Scene } from "../../engine/SceneManager";
import { GameOver } from "./GameOver";
import { GamePlay } from "./GamePlay";

export class GameStart extends Scene {
    // other scene state
    private gameStart: GameOver | undefined;
    private gamePlay: GamePlay | undefined;
    constructor(
        isActive: Boolean,
        canvasWidth: number,
        canvasHeight: number,
    ) {
        super(isActive, canvasWidth, canvasHeight);
        this.gameObjects.push()
    }
    override update(time: number, delta: number) {

    }
}