import { InputHandler } from "../input/InputHandler.js";
import { Vector2 } from "./Vector2.js";
import { UnityScale, ZoomDelta } from "./Constants.js";

export class Camera {
	x: number;
	y: number;
	zoom: number;

	isDragging: boolean;
	dragInit: Vector2;

	constructor() {
		this.x = 0;
		this.y = 0;
		this.isDragging = false;
		this.zoom = 1;

		// Scrolling (Zoom)
		document.getElementById("licanvas").addEventListener("wheel", this._updateZoom.bind(this));
	}

	_updateZoom(e: WheelEvent): void {
		if (e.deltaY > 0) {
			this.zoom *= ZoomDelta;
		} else if (e.deltaY < 0) {
			this.zoom /= ZoomDelta;
		}
	}

	updatePosition(): void {
		if (InputHandler.mouse.right && !this.isDragging) {
			// Init Dragging
			this.isDragging = true;
			this.dragInit = this.getUnscaledMouse();
			InputHandler.mouse.setCursor("move");
		} else if (InputHandler.mouse.right && this.isDragging) {
			// Currently Dragging
			let current = this.getUnscaledMouse();
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
			x: (InputHandler.mouse.x + this.x) * UnityScale,
			y: (InputHandler.mouse.y + this.y) * UnityScale
		};
	}

	getUnscaledMouse(): Vector2 {
		return {
			x: InputHandler.mouse.x + this.x,
			y: InputHandler.mouse.y + this.y
		};
	}
};