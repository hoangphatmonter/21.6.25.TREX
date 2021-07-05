enum Status { UP, DOWN }

export class InputHandler {

    private inputQueue: { key: string, status?: Status, x?: number, y?: number }[];
    private static registrationDownFuncMap: Function[] = [];
    private static registrationUpFuncMap: Function[] = [];
    private static registrationClickFuncMap: Function[] = [];

    constructor(
        private canvas: HTMLCanvasElement
    ) {
        this.inputQueue = [];
    }
    run() {
        window.addEventListener('keydown', (event: KeyboardEvent) => {
            this.inputQueue.push({ key: event.key, status: Status.DOWN });
        })

        window.addEventListener('keyup', (event: KeyboardEvent) => {
            this.inputQueue.push({ key: event.key, status: Status.UP });
        })

        this.canvas.addEventListener('click', (event: MouseEvent) => {
            this.inputQueue.push(this.getMousePosInCanvasCordinates(event))
        })
    }
    processInput() {
        while (this.inputQueue.length > 0) {
            let ele = this.inputQueue.shift();
            if (ele?.key == 'click') {
                InputHandler.registrationClickFuncMap.forEach(func => {
                    func(ele?.x, ele?.y);
                })
            }
            else {
                if (ele?.status == Status.DOWN)
                    InputHandler.registrationDownFuncMap.forEach(func => {
                        func(ele?.key);
                    })
                else
                    InputHandler.registrationUpFuncMap.forEach(func => {
                        func(ele?.key);
                    })
            }
        }
    }

    static register(state: 'keydown' | 'keyup' | 'click', callback: (key: string) => void) {
        if (state === 'keydown')
            InputHandler.registrationDownFuncMap.push(callback);
        else if (state === 'keyup')
            InputHandler.registrationUpFuncMap.push(callback);
    }
    static registerMouse(state: 'click', callback: (x: number, y: number) => void) {
        if (state === 'click')
            InputHandler.registrationClickFuncMap.push(callback);
    }

    private getMousePosInCanvasCordinates(event: MouseEvent) {
        let rect = this.canvas.getBoundingClientRect();
        return {
            key: 'click',
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        }
    }
}