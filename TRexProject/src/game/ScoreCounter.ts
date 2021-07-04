import { GameObjectText } from "../engine/GameObjects/GameObjectText";

export class ScoreCounter extends GameObjectText {
    private score: number;
    private highscore: number;
    constructor(
        xTopLeft: number,
        yTopLeft: number,
        text: string,
        textSize: number,
        color: string,
        textAlign: CanvasTextAlign,

        private gameSpeed: number
    ) {
        super(xTopLeft, yTopLeft, text, textSize, color, textAlign);
        this.score = 0;
        this.highscore = 0;
    }

    setScore(val: number) {
        this.score = val;
    }

    getScore() {
        return this.score;
    }

    getHighScore() {
        return this.highscore;
    }

    updateHighScore() {
        if (this.highscore < this.score)
            this.highscore = this.score;
    }
    override update(time: number, delta: number) {
        this.score += Math.floor(this.gameSpeed * delta / 1000)
        this.setText(`Score: ${this.score} HighScore: ${this.highscore}`);
    }
}