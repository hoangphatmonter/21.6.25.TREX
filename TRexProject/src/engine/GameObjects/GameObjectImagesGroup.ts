import { GameObject } from "./GameObject";

export class GameObjectImagesGroupEle {
    constructor(
        public image: HTMLImageElement,
        public width: number,
        public height: number,
        public xTL: number,
        public yTL: number
    ) {
    }
}

export class GameObjectImagesGroup extends GameObject {
    protected images: GameObjectImagesGroupEle[];
    public oriWidth: number;
    public oriHeight: number;
    constructor(
        xTopLeft: number,
        yTopLeft: number,
        private path: string,
        private imageName: string,
        scale: number, // > 0
    ) {
        super(xTopLeft, yTopLeft);
        this.images = [];
        this.oriWidth = 0;
        this.oriHeight = 0;
        console.log(this.images.length)
        let image = new Image();
        image.onload = () => {
            let width = image.width * scale;
            let height = image.height * scale;
            this.oriWidth = image.width * scale;
            this.oriHeight = image.height * scale;
            this.images.push(new GameObjectImagesGroupEle(image, width, height, this.xTopLeft, this.yTopLeft));
        }
        image.src = this.path + imageName;
    }
    pushMoreImage(xTL: number, yTL: number, scale: number) {
        let image = new Image();
        image.onload = () => {
            let width = image.width * scale;
            let height = image.height * scale;
            this.oriWidth = image.width * scale;
            this.oriHeight = image.height * scale;
            this.images.push(new GameObjectImagesGroupEle(image, width, height, xTL, yTL));
        }
        image.src = this.path + this.imageName;
    }
    getRenderData() {
        return this.images;
    }
    override update(time: number, delta: number) {
    }
}