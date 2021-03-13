import { CanvasHandler } from './CanvasHandler.js';
import { LoopHandler } from './LoopHandler.js';
export class Graphics {
    constructor() {
        this.canvas = new CanvasHandler();
        this.loop = new LoopHandler(this.draw.bind(this));
        this.loop.start();
    }
    draw() {
        this.canvas.objRender.cam.updatePosition(); // Update Camera
        this.canvas.clear(); // Clear
        this.canvas.gridRender.drawGrid(); // Draw Grid
        this.canvas.mapRender.drawMap(); // Draw Map
        this.canvas.selRender.drawSelection(); // Draw Selection
        this.canvas.colRender.drawCollider(); // Draw Collider
    }
}
//# sourceMappingURL=GraphicsHandler.js.map