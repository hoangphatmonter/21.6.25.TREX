import { Ground } from './Ground'
import { GRAVITY } from '../app';

enum DinoStatus { GROUNDED, AIR, COUCH };

export class Dino {
    private width: number;
    private height: number;
    private velocityY = 0; // velocity
    private originalHeight: number;
    private jumpAddVelocityY = 300;  // px/s // if jump, add this velocity to velocityY
    private isJumpButtonPress = false;
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

    setJump(val: boolean) {
        this.isJumpButtonPress = val;
    }

    update(delta: number, ground: Ground) {
        // check for jump
        if (this.isJumpButtonPress && this.state === DinoStatus.GROUNDED) {
            // add more v
            this.velocityY -= this.jumpAddVelocityY;
            // change state
            this.isJumpButtonPress = false;
            this.state = DinoStatus.AIR;
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
            this.state = DinoStatus.GROUNDED;
            this.yBottom = groundCorY;
        }

        // for animation
        this.sumDelta += delta;
        if (this.sumDelta / 1000 > 0.1125) {
            this.sumDelta = 0;
            this.changeAnimation();
        }
    }

    changeAnimation() {
        if (this.state === DinoStatus.GROUNDED) {
            this.curRunFrames = (this.curRunFrames + 1) % this.noOfRunFrames;
            this.image.src = this.path + 'run' + this.curRunFrames.toString() + '.png';
            this.image.onload = function () {
                console.log('load');
            }
        }
        else if (this.state === DinoStatus.AIR) {
            this.image.src = this.path + 'idle.png';
        }
        else if (this.state === DinoStatus.COUCH) {
            this.curCouchFrames = (this.curCouchFrames + 1) % this.noOfCouchFrames;
            this.image.src === this.path + 'couch' + this.curCouchFrames + '.png';
        }
        // update width and height
        this.width = this.image.width;
        this.height = this.image.height;
    }

    draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        // context.rect(this.xBottom - this.width / 2, this.yBottom - this.height, this.width, this.height);
        context.drawImage(this.image, this.xBottom - this.width / 2, this.yBottom - this.height);
        context.fill();
    }
}