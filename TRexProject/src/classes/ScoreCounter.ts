export class Score {
    constructor(
        private score: number
    ) { }

    draw(canvas: CanvasRenderingContext2D) {
        canvas.beginPath();
    }
}