export class GameObject {
    constructor(
        protected xTopLeft: number,
        protected yTopLeft: number
    ) { }

    update(time: number, delta: number) {

    }
}

export class GOImage extends GameObject {
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

export class GOImagesGroupEle {
    constructor(
        public image: HTMLImageElement,
        public width: number,
        public height: number,
        public xTL: number,
        public yTL: number
    ) { }
}

export class GOImagesGroup extends GameObject {
    protected images: GOImagesGroupEle[];
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
        this.images.push(new GOImagesGroupEle(new Image(), 0, 0, this.xTopLeft, this.yTopLeft));
        this.images[0].image.onload = () => {
            this.images[0].width = this.images[0].image.width * scale;
            this.images[0].height = this.images[0].image.height * scale;
            this.oriWidth = this.images[0].image.width * scale;
            this.oriHeight = this.images[0].image.height * scale;
        }
        let p = this.path + imageName;
        this.images[0].image.src = p;
    }
    pushMoreImage(xTL: number, yTL: number, scale: number) {
        this.images.push(new GOImagesGroupEle(new Image(), 0, 0, xTL, yTL));
        this.images[this.images.length - 1].image.onload = () => {
            this.images[this.images.length - 1].width = this.images[this.images.length - 1].image.width * scale;
            this.images[this.images.length - 1].height = this.images[this.images.length - 1].image.height * scale;
        }
        this.images[this.images.length - 1].image.src = this.path + this.imageName;
    }
    getRenderData() {
        return this.images;
    }
    override update(time: number, delta: number) {
    }
}

export class GOText extends GameObject {
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