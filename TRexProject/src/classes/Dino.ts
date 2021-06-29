import { Ground } from './Ground'
import { GRAVITY } from '../app';

export class Dino {
    private width = 20;
    private height = 20;
    private velocityY = 0; // velocity
    private originalHeight = this.height;
    private jumpAddVelocityY = 300;  // px/s // if jump, add this velocity to velocityY
    private isSpacePress = false;
    private grounded = true;

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
        this.isSpacePress = val;
    }

    update(delta: number, ground: Ground) {
        // check for jump
        if (this.isSpacePress && this.grounded) {
            this.velocityY -= this.jumpAddVelocityY;
            this.isSpacePress = false;
            this.grounded = false;
            console.log('jump');
        }

        this.yBottom += this.velocityY * delta / 1000;

        // check for gravity
        let groundCorY = ground.getBotPosition()[1] - ground.getHeight();
        if (this.yBottom < groundCorY) { // check on ground
            this.velocityY += GRAVITY * delta / 1000;
            this.grounded = false;
        }
        else {
            this.velocityY = 0;
            this.grounded = true;
            this.yBottom = groundCorY;
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