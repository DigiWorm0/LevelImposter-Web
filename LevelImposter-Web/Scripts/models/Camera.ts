import { InputHandler } from "../input/InputHandler.js";
import { Vector2 } from "./Vector2.js";

export class Camera {
	x: number;
	y: number;
	isDragging: boolean;
	dragInit: Vector2;
	zoom: number;

	constructor() {
		this.x = 0;
		this.y = 0;
		this.isDragging = false;
		this.zoom = 1;
	}

	updatePosition(): void {
		if (InputHandler.mouse.right && !this.isDragging) {
			// Init Dragging
			this.isDragging = true;
			this.dragInit = this.getMouse();
			InputHandler.mouse.setCursor("move");
		} else if (InputHandler.mouse.right && this.isDragging) {
			// Currently Dragging
			let current = this.getMouse();
			this.x -= current.x - this.dragInit.x;
			this.y -= current.y - this.dragInit.y;
		} else if (this.isDragging) {
			// End Dragging
			this.isDragging = false;
			InputHandler.mouse.setCursor("default");
		}
	}

	getMouse(): Vector2 {
		return {
			x: InputHandler.mouse.x + this.x,
			y: InputHandler.mouse.y + this.y
		};
	}
};