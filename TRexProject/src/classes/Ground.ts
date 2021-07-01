class GroundImage {
    constructor(
        public image: HTMLImageElement,
        public xBotLeft: number
    ) { }
}

export class Ground {
    private width: number;
    private height: number;
    private path = './images/ground/';
    private images: GroundImage[];
    constructor(
        private xBottomLeft: number,
        private yBottomLeft: number,
        private xVelocity: number
    ) {
        this.images = [];
        this.images.push(new GroundImage(new Image(), this.xBottomLeft));
        this.images[0].image.src = this.path + 'ground.png';
        this.width = 0;
        this.height = 0;
        this.images[0].image.onload = () => {
            this.width = this.images[0].image.width;
            this.height = this.images[0].image.height;
        }
    }

    getYBotLeftPosition() {
        return this.yBottomLeft;
    }

    getHeight() {
        return this.height;
    }

    update(delta: number, canvas: HTMLCanvasElement) {
        for (let i = 0; i < this.images.length; i++) {
            // delete ground if out of screen
            if (this.images[i].xBotLeft + this.width < 0) {
                this.images.splice(i, 1);
                i--;
                continue;
            }
            // change position
            this.images[i].xBotLeft = this.images[i].xBotLeft - this.xVelocity * delta / 1000;
            // add more ground if need
            if (i === this.images.length - 1 &&
                this.images[i].xBotLeft + this.width <= canvas.width) {
                this.images.push(new GroundImage(new Image(), this.images[i].xBotLeft + canvas.width));
                this.images[i + 1].image.src = this.path + 'ground.png';
                break;
            }
        }
    }

    draw(context: CanvasRenderingContext2D) {
        // context.beginPath();
        // canvas.rect(0, this.yBottomRight - 50, this.xBottomRight, this.yBottomRight);
        // canvas.fillStyle = 'yellow';
        // canvas.fill();
        for (let i = 0; i < this.images.length; i++) {
            context.beginPath();
            context.drawImage(this.images[i].image, this.images[i].xBotLeft, this.yBottomLeft - this.height * 2);
        }
    }
}