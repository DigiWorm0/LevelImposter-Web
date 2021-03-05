import { InputHandler } from "../input/InputHandler.js";
export class Camera {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.isDragging = false;
        this.zoom = 1;
    }
    updatePosition() {
        if (InputHandler.mouse.right && !this.isDragging) {
            // Init Dragging
            this.isDragging = true;
            this.dragInit = this.getMouse();
        }
        else if (InputHandler.mouse.right) {
            // Currently Dragging
            let current = this.getMouse();
            this.x -= current.x - this.dragInit.x;
            this.y -= current.y - this.dragInit.y;
        }
        else {
            // End Dragging
            this.isDragging = false;
        }
    }
    getMouse() {
        return {
            x: InputHandler.mouse.x + this.x,
            y: InputHandler.mouse.y + this.y
        };
    }
}
;
//# sourceMappingURL=Camera.js.map