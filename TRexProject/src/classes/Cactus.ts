export class Cactus {
    constructor(
        private xBottom: number,
        private yBottom: number,
        private velocity: number
    ) { }

    draw(canvas: CanvasRenderingContext2D) {
        canvas.beginPath();
        canvas.rect(this.xBottom - 10, this.yBottom - 10, 20, 20);
        canvas.fillStyle = 'blue';
        canvas.fill();
    }
}