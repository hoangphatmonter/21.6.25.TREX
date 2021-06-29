export class Cactus {
    private width = 20;
    private height = 20;
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
        return [this.xBottom - this.width / 2, this.yBottom];
    }

    getBotRightPosition(): [number, number] {
        return [this.xBottom + this.width / 2, this.yBottom];
    }

    getTopLeftPosition(): [number, number] {
        return [this.xBottom - this.width / 2, this.yBottom - this.height];
    }

    getTopRightPosition(): [number, number] {
        return [this.xBottom + this.width / 2, this.yBottom - this.height];
    }

    draw(canvas: CanvasRenderingContext2D) {
        canvas.beginPath();
        canvas.rect(this.xBottom - this.width / 2, this.yBottom - this.height, 20, 20);
        canvas.fillStyle = 'blue';
        canvas.fill();
    }
}