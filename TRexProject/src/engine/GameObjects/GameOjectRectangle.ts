import { GameObject } from "./GameObject";

export class GameObjectRectangle extends GameObject {
    constructor(
        xTopLeft: number,
        yTopLeft: number,

        private width: number,
        private height: number
    ) {
        super(xTopLeft, yTopLeft);
    }
    getRenderData() {
        return { w: this.width, h: this.height, xTL: this.xTopLeft, yTL: this.yTopLeft };
    }
    override update(time: number, delta: number) {
    }
    isInRect(x: number, y: number): boolean {
        if (
            x > this.xTopLeft &&
            x < this.xTopLeft + this.width &&
            y > this.yTopLeft &&
            y < this.yTopLeft + this.height
        )
            return true;
        return false;
    }
}