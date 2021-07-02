import { GOImage } from "../engine/GameObject";

export class Bird extends GOImage {
    // for animation
    private sumDelta = 0;
    private curFrame = 0;
    private noOfFrames = 2;
    constructor(
        xTopLeft: number,
        yTopLeft: number,
        path: string,
        imageName: string,
        scale: number,

        private xVelocity: number
    ) {
        super(xTopLeft, yTopLeft, path, imageName, scale);
    }

    addMoreVelocity(amount: number) {
        this.xVelocity += amount;
    }

    override update(time: number, delta: number) {
        // change position
        this.xTopLeft = this.xTopLeft - this.xVelocity * delta / 1000;

        // animation
        this.sumDelta += delta;
        if (this.sumDelta / 1000 > 0.1125) {
            this.sumDelta = 0;
            this.changeAnimation();
        }
    }

    private changeAnimation() {
        this.curFrame = (this.curFrame + 1) % this.noOfFrames;
        this.updateImage('fly' + this.curFrame.toString() + '.png', 1);
    }

    getBotRightPosition(): [number, number] {
        return [this.xTopLeft + this.width, this.yTopLeft + this.height];
    }

    getTopLeftPosition(): [number, number] {
        return [this.xTopLeft, this.yTopLeft];
    }

    getTopRightPosition(): [number, number] {
        return [this.xTopLeft + this.width, this.yTopLeft];
    }
}