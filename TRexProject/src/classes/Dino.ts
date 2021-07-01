import { Ground } from './Ground'
import { GRAVITY } from '../app';

enum DinoStatus { GROUNDED, AIR, COUCH };
export enum BtnStatus { JUMP, COUCH, NONE };

export class Dino {
    private width: number;
    private height: number;
    private velocityY = 0; // velocity
    private originalHeight: number;
    private jumpAddVelocityY = 300;  // px/s // if jump, add this velocity to velocityY
    private couchAddVelocityY = 100; // px/s // if on air, go down faster
    private curBtnPress = BtnStatus.NONE;
    private state = DinoStatus.GROUNDED;
    private image: HTMLImageElement;
    // for animation
    private path = './images/dino/';
    private noOfIdleFrames = 1;
    private noOfRunFrames = 2;
    private noOfCouchFrames = 2;
    private curIdleFrames = 0;
    private curRunFrames = 0;
    private curCouchFrames = 0;
    private sumDelta = 0;

    constructor(
        private xBottom: number,   // ground cordinates
        private yBottom: number
    ) {
        this.image = new Image();
        this.image.src = this.path + 'idle.png';
        this.width = this.image.width;
        this.height = this.image.height;
        this.originalHeight = this.height;
    }

    getPosition(): [number, number] {
        return [this.xBottom, this.yBottom];
    }

    getBotLeftPosition(): [number, number] {
        return [this.xBottom - this.width / 2, this.yBottom];
    }

    getBotRightPosition(): [number, number] {
        return [this.xBottom + this.width / 2, this.yBottom];
    }

    getTopLeftPosition(): [number, number] {
        return [this.xBottom - this.width / 2, this.yBottom - this.height];
    }

    getTopRightPosition(): [number, number] {
        return [this.xBottom + this.width / 2, this.yBottom - this.height];
    }

    setPosition(x: number, y: number) {
        this.xBottom = x;
        this.yBottom = y;
    }

    setBtnPressed(val: BtnStatus) {
        this.curBtnPress = val;
    }

    update(delta: number, ground: Ground) {
        // check for jump
        if (this.curBtnPress === BtnStatus.JUMP && this.state === DinoStatus.GROUNDED) {
            // add more v
            this.velocityY -= this.jumpAddVelocityY;
            // change state
            this.curBtnPress = BtnStatus.NONE;
            this.state = DinoStatus.AIR;
        }
        else if (this.curBtnPress === BtnStatus.COUCH) {// check for couch
            // minus v if on air
            if (DinoStatus.AIR) {
                this.velocityY += this.couchAddVelocityY;
            }
            // change state
            this.curBtnPress = BtnStatus.COUCH;
            this.state = DinoStatus.COUCH;
        }
        else if (this.curBtnPress === BtnStatus.NONE) {
            this.state = DinoStatus.AIR; // will change to ground below
        }

        // change the cordinate
        this.yBottom += this.velocityY * delta / 1000;

        // check for gravity
        let groundCorY = ground.getBotPosition()[1] - ground.getHeight();
        // - if on air
        if (this.yBottom < groundCorY) { // check on ground
            this.velocityY += GRAVITY * delta / 1000;
            this.state = DinoStatus.AIR;
        }
        else {
            this.velocityY = 0;
            if (this.state != DinoStatus.COUCH)
                this.state = DinoStatus.GROUNDED;
            this.yBottom = groundCorY;
        }

        // for animation
        this.sumDelta += delta;
        if (this.sumDelta / 1000 > 0.1125) {    // change frames every 0.1125 seconds
            this.sumDelta = 0;
            this.changeAnimation();
        }
    }

    private changeAnimation() {
        if (this.state === DinoStatus.GROUNDED) {
            this.curRunFrames = (this.curRunFrames + 1) % this.noOfRunFrames;
            this.image.src = this.path + 'run' + this.curRunFrames.toString() + '.png';
        }
        else if (this.state === DinoStatus.AIR) {
            this.image.src = this.path + 'idle.png';
        }
        else if (this.state === DinoStatus.COUCH) {
            this.curCouchFrames = (this.curCouchFrames + 1) % this.noOfCouchFrames;
            this.image.src = this.path + 'couch' + this.curCouchFrames + '.png';
        }
        // update width and height
        this.width = this.image.width;
        this.height = this.image.height;
        console.log(this.width, this.height)
    }

    draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        // context.rect(this.xBottom - this.width / 2, this.yBottom - this.height, this.width, this.height);
        context.drawImage(this.image, this.xBottom - this.width / 2, this.yBottom - this.height);
        context.fill();
    }
}