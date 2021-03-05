import { CanvasHandler } from './CanvasHandler.js';
import { LoopHandler } from './LoopHandler.js';
export class Graphics {
    constructor() {
        this.canvas = new CanvasHandler();
        this.loop = new LoopHandler(this.draw.bind(this));
        this.loop.start();
    }
    draw() {
        this.canvas.renderer.clear(); // Clear
        this.canvas.renderer.cam.updatePosition(); // Update Camera
        this.canvas.renderer.drawRect(// Draw Rectangle
        {
            x: 0,
            y: 0,
            w: 100,
            h: 100,
        }, "red", "red");
    }
}
//# sourceMappingURL=Graphics.js.map