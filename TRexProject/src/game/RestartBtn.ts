import { GOImage } from "../engine/GameObject";

export class RestartBtn extends GOImage {
    constructor(
        xTopLeft: number,
        yTopLeft: number,
        path: string,
        imageName: string,
        scale: number,

        private xVelocity: number
    ) {
        super(xTopLeft, yTopLeft, path, imageName, scale);
    }
}