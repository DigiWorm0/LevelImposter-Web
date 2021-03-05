import { MapHandler } from "../map/MapHandler.js";
import { InputHandler } from "./InputHandler.js";
export class DragHandler {
    constructor(_selectHandler) {
        this.isDragging = false;
        this.index = -1;
        this.selectHandler = _selectHandler;
    }
    update() {
        if (this.selectHandler.isSelected && InputHandler.mouse.left && !this.isDragging) {
            // Init Dragging
            let currentMouse = this.selectHandler.cam.getMouse();
            let currentObj = this.selectHandler.getSelection();
            this.dragInit = {
                x: currentObj.x - currentMouse.x,
                y: currentObj.y - currentMouse.y
            };
            this.index = this.selectHandler.selectIndex;
            this.isDragging = true;
            InputHandler.mouse.setCursor("move");
        }
        else if (this.isDragging && InputHandler.mouse.left) {
            let currentMouse = this.selectHandler.cam.getMouse();
            let currentObj = MapHandler.map.objs[this.index];
            currentObj.x = currentMouse.x + this.dragInit.x;
            currentObj.y = currentMouse.y + this.dragInit.y;
        }
        else if (this.isDragging) {
            this.isDragging = false;
            InputHandler.mouse.setCursor("default");
        }
    }
}
//# sourceMappingURL=DragHandler.js.map