import { Ground } from './Ground'
import { GRAVITY } from '../app';
import { GOImage } from '../engine/GameObject';
import { InputHandler } from '../engine/InputHandler';

enum DinoStatus { GROUNDED, AIR, COUCH };
export enum BtnStatus { JUMP, COUCH, NONE };

export class Dino extends GOImage {
    private velocityY = 0; // velocity
    private jumpAddVelocityY = 1500;  // px/s // if jump, add this velocity to velocityY
    private couchAddVelocityY = 100; // px/s // if on air, go down faster
    private curBtnPress = BtnStatus.NONE;
    private state = DinoStatus.GROUNDED;
    // for animation
    private noOfRunFrames = 2;
    private noOfCouchFrames = 2;
    private curRunFrames = 0;
    private curCouchFrames = 0;
    private sumDelta = 0;

    constructor(
        xTopLeft: number,
        yTopLeft: number,
        path: string,
        imageName: string,
        scale: number,

        private ground: Ground
    ) {
        super(xTopLeft, yTopLeft, path, imageName, scale);
    }

    getBotLeftPosition(): [number, number] {
        return [this.xTopLeft, this.yTopLeft + this.height];
    }

    getBotRightPosition(): [number, number] {
        return [this.xTopLeft + this.width, this.yTopLeft + this.height];
    }

    getTopLeftPosition(): [number, number] {
        return [this.xTopLeft, this.yTopLeft];
    }

    setBtnPressed(val: BtnStatus) {
        this.curBtnPress = val;
    }

    override update(time: number, delta: number) {
        if (InputHandler.isBtnDown('w'))
            this.curBtnPress = BtnStatus.JUMP;
        else if (InputHandler.isBtnDown('s'))
            this.curBtnPress = BtnStatus.COUCH;
        else
            this.curBtnPress = BtnStatus.NONE;

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
        this.yTopLeft += this.velocityY * delta / 1000;

        // check for gravity
        let groundCorY = this.ground.getGround();
        // - if on air
        if (this.yTopLeft + this.height < groundCorY) { // check on ground
            this.velocityY += GRAVITY * delta / 1000;
            this.state = DinoStatus.AIR;
        }
        else {
            this.velocityY = 0;
            if (this.state != DinoStatus.COUCH)
                this.state = DinoStatus.GROUNDED;
            this.yTopLeft = groundCorY - this.height;
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
            this.updateImage('run' + this.curRunFrames.toString() + '.png', 1);
        }
        else if (this.state === DinoStatus.AIR) {
            this.updateImage('idle.png', 1);
        }
        else if (this.state === DinoStatus.COUCH) {
            this.curCouchFrames = (this.curCouchFrames + 1) % this.noOfCouchFrames;
            this.updateImage('couch' + this.curCouchFrames.toString() + '.png', 1);
        }
    }
}