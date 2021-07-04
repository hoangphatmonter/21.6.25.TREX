import { Scene } from "../../engine/SceneManager";
import { Bird } from "../Bird";
import { Cactus } from "../Cactus";
import { Dino } from "../Dino";
import { Ground } from "../Ground";
import { ScoreCounter } from "../ScoreCounter";
import { GameOver } from "./GameOver";
import { GameStart } from "./GameStart";

export class GamePlay extends Scene {
    // other scene state
    private gameStart: GameStart | undefined;
    private gameOver: GameOver | undefined;
    private cactusSpawnTime: number;
    // obj of this scene
    private dino: Dino;
    private ground: Ground;
    private score: ScoreCounter;
    constructor(
        isActive: Boolean,
        canvasWidth: number,
        canvasHeight: number,

        private gameSpeed: number,
    ) {
        super(isActive, canvasWidth, canvasHeight);

        this.cactusSpawnTime = this.genCacTime();

        this.ground = new Ground(0, this.canvasHeight - 50, './images/ground/', 'ground.png', 1, this.gameSpeed, this.canvasWidth);
        this.gameObjects.push(this.ground)

        // Note: y must minus more with dino image height
        this.dino = new Dino(50, this.canvasHeight - this.ground.getGround(), './images/dino/', 'idle.png', 1, this.ground);
        this.gameObjects.push(this.dino);

        this.score = new ScoreCounter(30, 30, 'Score: 0', 15, 'black', 'left', this.gameSpeed);
        this.gameObjects.push(this.score);
    }
    override update(time: number, delta: number) {
        super.update(time, delta);

        // delete gameObject if out of scene
        // update cactus state
        for (let i = 0; i < this.gameObjects.length; i++) {
            let obj = this.gameObjects[i]
            if (obj instanceof Cactus || obj instanceof Bird) {
                // destroy if out of scene
                if (obj.getBotRightPosition()[0] < 0) {
                    this.gameObjects.splice(i, 1);
                    i--;
                    continue;
                }

                // collision happen when cactus enter the Dino area
                let cLeftX = obj.getTopLeftPosition()[0];
                let cRightX = obj.getTopRightPosition()[0];
                let cTopY = obj.getTopLeftPosition()[1];
                let cBotY = obj.getBotRightPosition()[1];
                let dLeftX = this.dino.getBotLeftPosition()[0];
                let dRightX = this.dino.getBotRightPosition()[0];
                let dTopY = this.dino.getTopLeftPosition()[1];
                let dBotY = this.dino.getBotLeftPosition()[1];
                if (
                    dLeftX < cRightX && // c in front of d
                    dRightX > cLeftX && // may be a part of left c in d if not jump
                    dTopY < cBotY && // may be a part of bot c in d if not couch
                    dBotY > cTopY // may be a part of top c in d if not jump
                ) {
                    // stop the game (remove the newest request frame in queue)
                    this.setActive(false);

                    this.score.updateHighScore();
                    this.gameOver?.setActive(true);
                    this.gameOver?.updateScore(this.score.getScore(), this.score.getHighScore());
                    // change game state
                    console.log('over')
                    // update high score if need
                    // scoreCounter.updateHighScore();

                    //cactuses = [];
                    //scoreCounter.setScore(0);
                }
            }
        }
        // push more cactus
        this.cactusSpawnTime -= delta;
        if (this.cactusSpawnTime < 0) {
            if (Math.random() <= 0.7) {
                // so fail: need image size to plus
                this.gameObjects.push(new Cactus(this.canvasWidth + 50, this.ground.getGround() - 35, './images/cactus/', 'cactus0.png', 1, this.gameSpeed));
                // new Cactus(canvas.width + 10, canvas.height - ground.getHeight(), GAMESPEED)
            }
            else {
                let h = this.ground.getGround() - Math.random() * this.canvasHeight / 2;
                this.gameObjects.push(new Bird(this.canvasWidth + 50, h, './images/bird/', 'fly0.png', 1, this.gameSpeed));
            }
            this.cactusSpawnTime = this.genCacTime();
        }
    }
    setScene(gameStart: GameStart, gameOver: GameOver) {
        this.gameStart = gameStart;
        this.gameOver = gameOver;
    }
    resetScene() {
        this.gameObjects = [];

        this.cactusSpawnTime = this.genCacTime();

        this.ground = new Ground(0, this.canvasHeight - 50, './images/ground/', 'ground.png', 1, this.gameSpeed, this.canvasWidth);
        this.gameObjects.push(this.ground)

        // Note: y must minus more with dino image height
        this.dino = new Dino(50, this.canvasHeight - this.ground.getGround(), './images/dino/', 'idle.png', 1, this.ground);
        this.gameObjects.push(this.dino);

        this.score.setScore(0);

        this.gameObjects.push(this.score);
    }

    genCacTime() {
        return (Math.floor(Math.random() * 2) + 2 - this.gameSpeed / 200) * 1000; // 1-4s
    }
}