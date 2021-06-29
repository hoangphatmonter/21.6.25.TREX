export class ScoreCounter {
    private score = 0;
    private highscore = 0;
    constructor(
        private xBotLeft: number,
        private yBotLeft: number,
        private textSize: number
    ) { }

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

    draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.font = this.textSize + "px sans-serif";
        context.fillStyle = "blue";
        context.textAlign = "left";
        context.fillText('Score: ' + this.score.toString(), this.xBotLeft, this.yBotLeft);
        context.closePath();
        context.beginPath();
        context.textAlign = "right";
        context.fillText('HighScore: ' + this.highscore.toString(), this.xBotLeft + 300, this.yBotLeft);
        context.closePath();
    }
}