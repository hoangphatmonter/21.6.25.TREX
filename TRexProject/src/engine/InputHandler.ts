export class InputHandler {

    private inputQueue: { key: string, x?: number, y?: number }[];
    private static registrationFuncMap: Map<string, Function[]> = new Map();

    constructor(
        private canvas: HTMLCanvasElement
    ) {
        this.inputQueue = [];
    }
    run() {
        window.addEventListener('keydown', (event: KeyboardEvent) => {
            this.inputQueue.push({ key: event.key + 'D' });
        })

        window.addEventListener('keyup', (event: KeyboardEvent) => {
            this.inputQueue.push({ key: event.key + 'U' });
        })

        this.canvas.addEventListener('click', (event: MouseEvent) => {
            this.inputQueue.push(this.getMousePosInCanvasCordinates(event))
        })
    }
    processInput() {
        while (this.inputQueue.length > 0) {
            let ele = this.inputQueue.shift();
            if (ele?.key == 'click')
                InputHandler.registrationFuncMap.get('click')?.forEach(func => {
                    func(ele?.x, ele?.y);
                })

            else {
                if (ele)
                    InputHandler.registrationFuncMap.get(ele.key)?.forEach(func => {
                        func();
                    })
            }
        }
    }

    static registerKeyDown(key: string, callback: () => void) {
        if (InputHandler.registrationFuncMap.has(key + 'D'))
            InputHandler.registrationFuncMap.get(key + 'D')?.push(callback);
        else
            InputHandler.registrationFuncMap.set(key + 'D', [callback]);
    }

    static registerKeyUp(key: string, callback: () => void) {
        if (InputHandler.registrationFuncMap.has(key + 'U'))
            InputHandler.registrationFuncMap.get(key + 'U')?.push(callback);
        else
            InputHandler.registrationFuncMap.set(key + 'U', [callback]);
    }

    static registerClick(callback: (x: number, y: number) => void) {
        if (InputHandler.registrationFuncMap.has('click'))
            InputHandler.registrationFuncMap.get('click')?.push(callback);
        else
            InputHandler.registrationFuncMap.set('click', [callback]);
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