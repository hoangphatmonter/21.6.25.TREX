export class Cactus {
    constructor(
        private xBottom: number,
        private yBottom: number,
        private xVelocity: number
    ) { }

    update(delta: number) {
        this.xBottom = this.xBottom - this.xVelocity * delta / 1000;
    }

    getPosition(): [number, number] {
        return [this.xBottom, this.yBottom];
    }

    getBotLeftPosition(): [number, number] {
        return [this.xBottom - 10, this.yBottom];
    }

    getBotRightPosition(): [number, number] {
        return [this.xBottom + 10, this.yBottom];
    }

    draw(canvas: CanvasRenderingContext2D) {
        canvas.beginPath();
        canvas.rect(this.xBottom - 10, this.yBottom - 20, 20, 20);
        canvas.fillStyle = 'blue';
        canvas.fill();
    }
}