import { GameObject } from "./GameObjects/GameObject";
import { GameObjectImage } from "./GameObjects/GameObjectImage";
import { GameObjectImagesGroup, GameObjectImagesGroupEle } from "./GameObjects/GameObjectImagesGroup";
import { GameObjectText } from "./GameObjects/GameObjectText";

export class Renderer {
    private ctx: CanvasRenderingContext2D;
    constructor(
        private canvas: HTMLCanvasElement
    ) {
        this.ctx = this.canvas.getContext('2d')!;
    }
    render(gameObject: GameObject) {
        if (gameObject instanceof GameObjectImage) {
            let data = gameObject.getRenderData();
            this.ctx.beginPath();
            this.ctx.drawImage(data.image, data.xTL, data.yTL, data.w, data.h);
        }
        else if (gameObject instanceof GameObjectText) {
            let data = gameObject.getRenderData();
            this.ctx.beginPath();
            this.ctx.font = data.size + "px sans-serif";
            this.ctx.fillStyle = "blue";
            this.ctx.textAlign = "left";
            this.ctx.fillText(data.text, data.xTL, data.yTL);
            this.ctx.closePath();
        }
        else if (gameObject instanceof GameObjectImagesGroup) {
            let data = gameObject.getRenderData();
            data.forEach(d => {
                this.ctx.beginPath();
                this.ctx.drawImage(d.image, d.xTL, d.yTL, d.width, d.height);
            })
        }

    }
    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}