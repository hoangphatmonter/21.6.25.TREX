import { Scene } from "../../engine/SceneManager";
import { GamePlay } from "./GamePlay";
import { GameStart } from "./GameStart";

export class GameOver extends Scene {
    // other scene state
    private gameStart: GameStart | undefined;
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