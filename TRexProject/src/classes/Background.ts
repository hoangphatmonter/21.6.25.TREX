class CloudImage {
    constructor(
        public image: HTMLImageElement,
        public xBotLeft: number,
        public yBotLeft: number,
        public width: number,
        public height: number
    ) { }
}

export class BackGround {
    private path = './images/cloud/';
    private images: CloudImage[];
    private timeToAddMoreCloud: number;
    constructor(
        private xBottomLeft: number,
        private yBottomLeft: number,
        private xVelocity: number
    ) {
        this.timeToAddMoreCloud = Math.random() * 5000;
        this.images = [];
        this.images.push(new CloudImage(new Image(), this.xBottomLeft, this.yBottomLeft + Math.random() * 100, 0, 0));
        this.images[0].image.src = this.path + 'cloud.png';
        this.images[0].image.onload = () => {
            let scale = Math.random() * 2;
            this.images[0].width = this.images[0].image.width * scale;
            this.images[0].height = this.images[0].image.height * scale;
        }
    }

    update(delta: number) {
        for (let i = 0; i < this.images.length; i++) {
            // delete ground if out of screen
            if (this.images[i].xBotLeft + this.images[i].width < 0) {
                this.images.splice(i, 1);
                i--;
                continue;
            }
            // change position
            this.images[i].xBotLeft = this.images[i].xBotLeft - this.xVelocity * delta / 1000;
        }

        // add more cloud
        this.timeToAddMoreCloud -= delta;
        if (this.timeToAddMoreCloud < 0) {
            this.images.push(new CloudImage(new Image(), this.xBottomLeft, this.yBottomLeft + Math.random() * 100, 0, 0));
            this.images[this.images.length - 1].image.src = this.path + 'cloud.png';
            this.images[this.images.length - 1].image.onload = () => {
                let scale = Math.random() * 2;
                this.images[this.images.length - 1].width = this.images[this.images.length - 1].image.width * scale;
                this.images[this.images.length - 1].height = this.images[this.images.length - 1].image.height * scale;
            }
            this.timeToAddMoreCloud = Math.random() * 5000;
        }
    }

    draw(context: CanvasRenderingContext2D) {
        // context.beginPath();
        // canvas.rect(0, this.yBottomRight - 50, this.xBottomRight, this.yBottomRight);
        // canvas.fillStyle = 'yellow';
        // canvas.fill();
        for (let i = 0; i < this.images.length; i++) {
            context.beginPath();
            context.drawImage(this.images[i].image, this.images[i].xBotLeft, this.images[i].yBotLeft - this.images[i].height, this.images[i].width, this.images[i].height);
        }
    }
}