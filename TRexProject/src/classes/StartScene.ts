export class StartScene {
    private boxWidth: number;
    private boxHeight: number;
    private playBtnWidth: number;
    private playBtnHeight: number;
    private playBtnImage: HTMLImageElement;
    constructor(
        private xCenter: number,
        private yCenter: number
    ) {
        this.playBtnImage = new Image();
        this.playBtnImage.src = "./images/playButton.png";  // need time to load in the background
        this.boxWidth = 400;
        this.boxHeight = 200;
        this.playBtnWidth = 200;
        this.playBtnHeight = 140;
    }

    isInPlayBtn(x: number, y: number): boolean {
        if (
            x > this.xCenter - this.playBtnWidth / 2 &&
            x < this.xCenter + this.playBtnWidth / 2 &&
            y > this.yCenter - this.playBtnHeight / 2 &&
            y < this.yCenter + this.playBtnHeight / 2
        )
            return true;
        return false;
    }

    draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        // context.arc(this.xBottom, this.yBottom - 20, 20, 0, Math.PI * 2, true);
        context.rect(this.xCenter - this.boxWidth / 2, this.yCenter - this.boxHeight / 2, this.boxWidth, this.boxHeight);
        context.fillStyle = 'grey';
        context.fill();
        context.beginPath();
        context.drawImage(this.playBtnImage, this.xCenter - this.playBtnWidth / 2, this.yCenter - this.playBtnHeight / 2, this.playBtnWidth, this.playBtnHeight);
    }
}