import { InputHandler } from "../input/InputHandler.js";
import { UnityScale, ZoomDelta } from "./Constants.js";
export class Camera {
    constructor(_w, _h) {
        this.x = _w / -2;
        this.y = _h / -2;
        this.w = _w;
        this.h = _h;
        this.isDragging = false;
        this.zoom = 1;
        // Scrolling (Zoom)
        document.getElementById("licanvas").addEventListener("wheel", this._updateZoom.bind(this));
    }
    _updateZoom(e) {
        if (e.deltaY > 0) {
            this.zoom *= ZoomDelta;
            this.x = ((this.x + (this.w / 2)) * ZoomDelta) - (this.w / 2);
            this.y = ((this.y + (this.h / 2)) * ZoomDelta) - (this.h / 2);
        }
        else if (e.deltaY < 0) {
            this.zoom /= ZoomDelta;
            this.x = ((this.x + (this.w / 2)) / ZoomDelta) - (this.w / 2);
            this.y = ((this.y + (this.h / 2)) / ZoomDelta) - (this.h / 2);
        }
    }
    updatePosition() {
        if (InputHandler.mouse.right && !this.isDragging) {
            // Init Dragging
            this.isDragging = true;
            this.dragInit = this.getUnscaledMouse();
            InputHandler.mouse.setCursor("move");
        }
        else if (InputHandler.mouse.right && this.isDragging) {
            // Currently Dragging
            let current = this.getUnscaledMouse();
            this.x -= current.x - this.dragInit.x;
            this.y -= current.y - this.dragInit.y;
        }
        else if (this.isDragging) {
            // End Dragging
            this.isDragging = false;
            InputHandler.mouse.setCursor("default");
        }
    }
    getMouse() {
        return {
            x: ((InputHandler.mouse.x + this.x) * UnityScale) / this.zoom,
            y: ((InputHandler.mouse.y + this.y) * UnityScale) / this.zoom
        };
    }
    getUnscaledMouse() {
        return {
            x: InputHandler.mouse.x + this.x,
            y: InputHandler.mouse.y + this.y
        };
    }
}
;
//# sourceMappingURL=Camera.js.map