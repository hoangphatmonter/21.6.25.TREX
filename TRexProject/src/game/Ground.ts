import { GOImage, GOImagesGroup, GOImagesGroupEle } from "../engine/GameObject";

export class Ground extends GOImagesGroup {
    constructor(
        xTopLeft: number,
        yTopLeft: number,
        path: string,
        imageName: string,
        scale: number,

        private xVelocity: number,
        private canvasWidth: number
    ) {
        super(xTopLeft, yTopLeft, path, imageName, scale);
    }

    getYBotLeftPosition() {
        return this.yTopLeft + this.oriHeight;
    }

    getGround() {
        return this.yTopLeft + this.oriHeight / 2;
    }

    addMoreVelocity(amount: number) {
        this.xVelocity += amount;
    }

    override update(time: number, delta: number) {
        for (let i = 0; i < this.images.length; i++) {
            // delete ground if out of screen
            if (this.images[i].xTL + this.oriWidth < 0) {
                this.images.splice(i, 1);
                i--;
                continue;
            }
            // change position
            this.images[i].xTL = this.images[i].xTL - this.xVelocity * delta / 1000;
            // add more ground if need
            if (i === this.images.length - 1 &&
                this.images[i].xTL + this.oriWidth <= this.canvasWidth
            ) {
                this.pushMoreImage(this.images[i].xTL + this.oriWidth, this.images[i].yTL, 1);
                break;
            }
        }
    }
}