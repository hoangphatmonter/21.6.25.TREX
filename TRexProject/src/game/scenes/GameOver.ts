import { BtnState } from "../../engine/GameCore";
import { GameObjectImage } from "../../engine/GameObjects/GameObjectImage";
import { GameObjectText } from "../../engine/GameObjects/GameObjectText";
import { GameObjectRectangle } from "../../engine/GameObjects/GameOjectRectangle";
import { InputHandler } from "../../engine/InputHandler";
import { Scene } from "../../engine/SceneManager";
import { GamePlay } from "./GamePlay";
import { GameStart } from "./GameStart";

export class GameOver extends Scene {
    // other scene state
    private gameStart: GameStart | undefined;
    private gamePlay: GamePlay | undefined;
    // obj of this scene
    private rect: GameObjectRectangle;
    private rsBtn: GameObjectImage;
    private scoreText: GameObjectText;
    private highScoreText: GameObjectText;

    private score: number;
    private highScore: number;
    constructor(
        isActive: Boolean,
        canvasWidth: number,
        canvasHeight: number,
    ) {
        super(isActive, canvasWidth, canvasHeight);

        this.score = 0;
        this.highScore = 0;

        // box
        let w = 400;
        let h = 200;
        this.rect = new GameObjectRectangle((this.canvasWidth - w) / 2, (this.canvasHeight - h) / 2, w, h);
        this.gameObjects.push(this.rect);

        // btn
        this.rsBtn = new GameObjectImage((this.canvasWidth - w) / 2, (this.canvasHeight - h) / 2, './images/', 'restartButton.png', 1);
        this.gameObjects.push(this.rsBtn);
        // score text
        this.scoreText = new GameObjectText(this.canvasWidth / 2, this.canvasHeight / 2, `Score: ${this.score}`, 50, 'white', 'center')
        this.gameObjects.push(this.scoreText);
        // highscore text
        this.highScoreText = new GameObjectText(this.canvasWidth / 2, this.canvasHeight / 2 + h / 3, `High score: ${this.highScore}`, 20, 'white', 'center');
        this.gameObjects.push(this.highScoreText);
    }
    override update(time: number, delta: number) {
        let mouseState = InputHandler.mouseState();
        if (mouseState.state === BtnState.DOWN && this.rsBtn.isInImage(mouseState.x, mouseState.y)) {
            this.setActive(false);
            this.gamePlay?.setActive(true);
            // reset game play
            this.gamePlay?.resetScene();
        }
    }
    setScene(gameStart: GameStart, gamePlay: GamePlay) {
        this.gameStart = gameStart;
        this.gamePlay = gamePlay;
    }
    updateScore(score: number, highScore: number) {
        this.score = score;
        this.highScore = highScore;
        this.scoreText.setText(`Score: ${this.score}`);
        this.highScoreText.setText(`High score: ${this.highScore}`);
    }
}