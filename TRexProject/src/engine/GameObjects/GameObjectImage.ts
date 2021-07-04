import { GameObject } from "./GameObject";

export class GameObjectImage extends GameObject {
    private image: HTMLImageElement;
    protected width: number;
    protected height: number;
    constructor(
        xTopLeft: number,
        yTopLeft: number,
        private path: string,
        imageName: string,
        scale: number, // > 0
    ) {
        super(xTopLeft, yTopLeft);
        this.image = new Image();
        this.width = 0;
        this.height = 0;
        this.image.onload = () => {
            this.width = this.image.width * scale;
            this.height = this.image.height * scale;
        }
        this.image.src = this.path + imageName;
    }
    getRenderData() {
        return { image: this.image, w: this.width, h: this.height, xTL: this.xTopLeft, yTL: this.yTopLeft };
    }
    updateImage(imageName: string, scale: number, path?: string) {
        if (path)
            this.path = path;
        this.image.onload = () => {
            this.width = this.image.width * scale;
            this.height = this.image.height * scale;
        }
        this.image.src = this.path + imageName;
    }
    override update(time: number, delta: number) {
    }
}