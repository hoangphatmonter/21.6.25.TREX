import { GameObjectImage } from "../engine/GameObjects/GameObjectImage";

export class RestartBtn extends GameObjectImage {
    constructor(
        xTopLeft: number,
        yTopLeft: number,
        path: string,
        imageName: string,
        scale: number,
    ) {
        super(xTopLeft, yTopLeft, path, imageName, scale);
    }
}