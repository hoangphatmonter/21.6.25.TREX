import { Ground } from './Ground'
import { GRAVITY } from '../app';

export class Dino {
    private width = 20;
    private height = 20;
    private velocityY = 0; // velocity
    private originalHeight = this.height;
    private jumpForce = 15;
    private isSpacePress = false;
    private grounded = false;

    constructor(
        private xBottom: number,   // ground cordinates
        private yBottom: number
    ) { }

    getPosition(): [number, number] {
        return [this.xBottom, this.yBottom];
    }

    getBotLeftPosition(): [number, number] {
        return [this.xBottom - 20, this.yBottom];
    }

    getBotRightPosition(): [number, number] {
        return [this.xBottom + 20, this.yBottom];
    }

    setPosition(x: number, y: number) {
        this.xBottom = x;
        this.yBottom = y;
    }

    setJump(val: boolean) {
        this.isSpacePress = true;
    }

    update(delta: number, ground: Ground) {
        // check for jump
        if (this.isSpacePress) {

        }

        // check for gravity
        if (this.yBottom < ground.getBotPosition()[1] - ground.getHeight()) { // check on ground
            this.velocityY += GRAVITY;
        }
    }

    draw(canvas: CanvasRenderingContext2D) {
        canvas.beginPath();
        // canvas.arc(this.xBottom, this.yBottom - 20, 20, 0, Math.PI * 2, true);
        canvas.rect(this.xBottom - this.width / 2, this.yBottom - this.height, this.width, this.height);
        canvas.fillStyle = 'red';
        canvas.fill();
    }
}