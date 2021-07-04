import { Renderer } from './Renderer'
import { GameObject } from './GameObjects/GameObject';

export class SceneManager {
    constructor(
        private scenes: Scene[]
    ) { }
    update(time: number, delta: number) {
        this.scenes.forEach(scene => {
            scene.update(time, delta);
        });
    }
    render(renderer: Renderer) {
        this.scenes.forEach(scene => {
            if (scene.isSceneActive())
                scene.render(renderer);
        });
    }
}

export class Scene {
    protected gameObjects: GameObject[];
    constructor(
        private isActive: Boolean,
        protected canvasWidth: number,
        protected canvasHeight: number
    ) {
        this.gameObjects = [];
    }
    add(gameObject: GameObject) {
        this.gameObjects.push(gameObject);
    }
    update(time: number, delta: number) {
        this.gameObjects.forEach(obj => {
            obj.update(time, delta);
        })
    }
    render(renderer: Renderer) {
        this.gameObjects.forEach(obj => {
            renderer.render(obj);
        })
    }
    isSceneActive() {
        return this.isActive;
    }
    setActive(val: boolean) {
        this.isActive = val;
    }
}