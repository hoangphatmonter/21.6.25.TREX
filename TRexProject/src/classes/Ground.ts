export class Ground {
    private height = 50;
    constructor(
        private xBottomRight: number,
        private yBottomRight: number
    ) { }

    getHeight() {
        return this.height;
    }

    getBotPosition(): [number, number] {
        return [this.xBottomRight, this.yBottomRight];
    }

    setPosition(xBR: number, yBR: number) {
        this.xBottomRight = xBR;
        this.yBottomRight = yBR;
    }

    draw(canvas: CanvasRenderingContext2D) {
        canvas.beginPath();
        // canvas.arc(this.xBottom, this.yBottom - 20, 20, 0, Math.PI * 2, true);
        canvas.rect(0, this.yBottomRight - 50, this.xBottomRight, this.yBottomRight);
        canvas.fillStyle = 'yellow';
        canvas.fill();
    }
}