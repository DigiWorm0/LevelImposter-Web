import { MapHandler } from "../map/MapHandler.js";
import { Vector2 } from "../models/Vector2.js";
import { InputHandler } from "./InputHandler.js";
import { SelectHandler } from "./SelectHandler.js";

export class DragHandler {
	isDragging: boolean;
	dragInit: Vector2;
	index: number;
	selectHandler: SelectHandler;

	constructor(_selectHandler: SelectHandler) {
		this.isDragging = false;
		this.index = -1;
		this.selectHandler = _selectHandler;
	}

	update(): void {
		if (this.selectHandler.isSelected && InputHandler.mouse.left && !this.isDragging) {
			// Init Dragging
			let currentMouse = this.selectHandler.cam.getMouse();
			let currentObj = this.selectHandler.getSelection();
			this.dragInit = {
				x: currentObj.x - currentMouse.x,
				y: currentObj.y - currentMouse.y
			};
			this.index = this.selectHandler.selectIndex;
			this.selectHandler.freezeSelection = true;
			this.isDragging = true;
			InputHandler.mouse.setCursor("move");
		} else if (this.isDragging && InputHandler.mouse.left) {
			// Currently Dragging
			let currentMouse = this.selectHandler.cam.getMouse();
			let currentObj = MapHandler.map.objs[this.index];
			currentObj.x = currentMouse.x + this.dragInit.x;
			currentObj.y = currentMouse.y + this.dragInit.y;
			InputHandler.ui.updateItemProperties(currentObj);
		} else if (this.isDragging) {
			// End Dragging
			this.isDragging = false;
			this.selectHandler.freezeSelection = false;
			InputHandler.mouse.setCursor("default");
		}
	}
}