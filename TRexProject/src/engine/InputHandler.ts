import { BtnState } from "./GameCore";

export class InputHandler {
    private btnStates: { w: BtnState, s: BtnState };
    private mouseState: { state: BtnState, x: number, y: number };

    private static curFrameBtnStates: { w: BtnState, s: BtnState };
    private static curFrameMouseState: { state: BtnState, x: number, y: number }

    constructor(
        private canvas: HTMLCanvasElement
    ) {
        this.btnStates = { w: BtnState.UP, s: BtnState.UP };
        this.mouseState = { state: BtnState.UP, x: 0, y: 0 };
        InputHandler.curFrameBtnStates = { w: BtnState.UP, s: BtnState.UP };
        InputHandler.curFrameMouseState = { state: BtnState.UP, x: 0, y: 0 };
    }
    run() {
        window.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === " " || event.key === 'w') {
                this.btnStates.w = BtnState.DOWN;
            }
            else if (event.key == 's') {
                this.btnStates.s = BtnState.DOWN;
            }
        })

        window.addEventListener('keyup', (event: KeyboardEvent) => {
            if (event.key === " " || event.key === 'w') {
                this.btnStates.w = BtnState.UP;
            }
            else if (event.key === 's') {
                this.btnStates.s = BtnState.UP;
            }
        })

        this.canvas.addEventListener('click', (event: MouseEvent) => {
            this.mouseState = this.getMousePosInCanvasCordinates(event);
        })
    }
    processInput() {
        // lock the current input state
        InputHandler.curFrameBtnStates = JSON.parse(JSON.stringify(this.btnStates));
        InputHandler.curFrameMouseState = JSON.parse(JSON.stringify(this.mouseState));
    }

    static isBtnDown(btn: 'w' | 's') {
        if (btn === 'w' && InputHandler.curFrameBtnStates.w === BtnState.DOWN)
            return true;
        else if (btn === 's' && InputHandler.curFrameBtnStates.s === BtnState.DOWN)
            return true;
        return false;
    }

    static mouseState() {
        return InputHandler.curFrameMouseState;
    }

    private getMousePosInCanvasCordinates(event: MouseEvent) {
        let rect = this.canvas.getBoundingClientRect();
        return {
            state: BtnState.DOWN,
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        }
    }
}