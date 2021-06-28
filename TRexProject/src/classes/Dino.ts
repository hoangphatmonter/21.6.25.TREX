export class Dino {
    constructor(
        private xBottom: number,   // ground cordinates
        private yBottom: number,
    ) { }

    getPosition(): [number, number] {
        return [this.xBottom, this.yBottom];
    }

    setPosition(x: number, y: number) {
        this.xBottom = x;
        this.yBottom = y;
    }

    draw(canvas: CanvasRenderingContext2D) {
        canvas.beginPath();
        canvas.arc(this.xBottom + 20, this.yBottom - 20, 20, 0, Math.PI * 2, true);
        canvas.fillStyle = 'red';
        canvas.fill();
    }
}