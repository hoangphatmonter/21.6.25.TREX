import { GameObject } from "./GameObject";

export class GameObjectText extends GameObject {
    constructor(
        xTopLeft: number,
        yTopLeft: number,

        private text: string,
        private textSize: number,
        private color: string
    ) {
        super(xTopLeft, yTopLeft);
    }
    getRenderData() {
        return { text: this.text, size: this.textSize, color: this.color, xTL: this.xTopLeft, yTL: this.yTopLeft };
    }
    setText(text: string) {
        this.text = text;
    }
    override update(time: number, delta: number) {
    }
}