export class Cactus {
    private width: number;
    private height: number;
    // for animation
    private path = './images/cactus/';
    private image: HTMLImageElement;
    constructor(
        private xBottom: number,
        private yBottom: number,
        private xVelocity: number
    ) {
        this.image = new Image();
        // generate a random cactus range 0-9
        this.image.src = this.path + 'cactus' + Math.floor(Math.random() * 10) + '.png';

        this.width = 0;
        this.height = 0;
        this.image.onload = () => {
            this.width = this.image.width;
            this.height = this.image.height;
        }
    }

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

    draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        // context.rect(this.xBottom - this.width / 2, this.yBottom - this.height, 20, 20);
        // context.fillStyle = 'blue';
        // context.fill();
        context.drawImage(this.image, this.xBottom - this.width / 2, this.yBottom - this.height);
    }
}