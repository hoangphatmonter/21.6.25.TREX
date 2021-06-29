export class GameOverScene {
    private boxWidth: number;
    private boxHeight: number;
    private restartBtnWidth: number;
    private restartBtnHeight: number;
    private restartBtnImage: HTMLImageElement;
    constructor(
        private xCenter: number,
        private yCenter: number
    ) {
        this.restartBtnImage = new Image();
        this.restartBtnImage.src = "./images/restartButton.png";  // need time to load in the background
        this.boxWidth = 400;
        this.boxHeight = 200;
        this.restartBtnWidth = this.restartBtnImage.width;
        this.restartBtnHeight = this.restartBtnImage.height;
    }

    getRestartBtnPos(): { xTopLeft: number, yTopLeft: number, width: number, height: number } {
        return {
            xTopLeft: this.xCenter - this.boxWidth / 2,
            yTopLeft: this.yCenter - this.boxHeight / 2,
            width: this.restartBtnWidth,
            height: this.restartBtnHeight
        }
    }

    isInRestartBtn(x: number, y: number): boolean {
        if (
            x > this.xCenter - this.boxWidth / 2 &&
            x < this.xCenter - this.boxWidth / 2 + this.restartBtnWidth &&
            y > this.yCenter - this.boxHeight / 2 &&
            y < this.yCenter - this.boxHeight / 2 + this.restartBtnHeight
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
        context.drawImage(this.restartBtnImage, this.xCenter - this.boxWidth / 2, this.yCenter - this.boxHeight / 2);
        console.log('show gameover')
    }
}