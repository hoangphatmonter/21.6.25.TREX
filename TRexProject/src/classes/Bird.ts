export class Bird {
    private width: number;
    private height: number;
    // for animation
    private path = './images/bird/';
    private image: HTMLImageElement;
    private sumDelta = 0;
    private curFrame = 0;
    private noOfFrames = 2;
    constructor(
        private xBottom: number,
        private yBottom: number,
        private xVelocity: number
    ) {
        this.image = new Image();
        // generate a random cactus range 0-9
        this.image.src = this.path + 'fly0.png';

        this.width = 0;
        this.height = 0;
        this.image.onload = () => {
            this.width = this.image.width;
            this.height = this.image.height;
        }
    }

    addMoreVelocity(amount: number) {
        this.xVelocity += amount;
    }

    update(delta: number) {
        // change position
        this.xBottom = this.xBottom - this.xVelocity * delta / 1000;

        // animation
        this.sumDelta += delta;
        if (this.sumDelta / 1000 > 0.1125) {
            this.sumDelta = 0;
            this.changeAnimation();
        }
    }

    private changeAnimation() {
        this.curFrame = (this.curFrame + 1) % this.noOfFrames;
        this.image.src = this.path + 'fly' + this.curFrame.toString() + '.png';
        // update width and height
        this.image.onload = () => {
            this.width = this.image.width;
            this.height = this.image.height;
        }
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