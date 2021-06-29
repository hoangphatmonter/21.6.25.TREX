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

    draw(canvas: CanvasRenderingContext2D) {
        canvas.beginPath();
        canvas.font = this.textSize + "px sans-serif";
        canvas.fillStyle = "blue";
        canvas.fillText('Score: ' + this.score.toString(), this.xBotLeft, this.yBotLeft);
        canvas.textAlign = "start";
        canvas.closePath();
    }
}