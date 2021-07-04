import { GameObject } from "./GameObject";

export class GameObjectText extends GameObject {
    constructor(
        xTopLeft: number,
        yTopLeft: number,

        private text: string,
        private textSize: number,
        private color: string,
        private textAlign: CanvasTextAlign
    ) {
        super(xTopLeft, yTopLeft);
    }
    getRenderData() {
        return { text: this.text, size: this.textSize, color: this.color, xTL: this.xTopLeft, yTL: this.yTopLeft, align: this.textAlign };
    }
    setText(text: string) {
        this.text = text;
    }
    override update(time: number, delta: number) {
    }
}