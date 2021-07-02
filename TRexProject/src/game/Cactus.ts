import { GOImage } from "../engine/GameObject";

export class Cactus extends GOImage {
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
        this.xTopLeft = this.xTopLeft - this.xVelocity * delta / 1000;
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