import { InputHandler } from "../input/InputHandler.js";
import { Vector2 } from "./Vector2.js";
import { ArrowScale, UnityScale, ZoomDelta } from "./Constants.js";

export class Camera {
	x: number;
	y: number;
	w: number;
	h: number;
	zoom: number;

	isDragging: boolean;
	dragInit: Vector2;

	constructor(_w: number, _h: number) {
		this.x = _w / -2;
		this.y = _h / -2;
		this.w = _w;
		this.h = _h;
		this.isDragging = false;
		this.zoom = 1;

		// Scrolling (Zoom)
		document.getElementById("licanvas").addEventListener("wheel", this._updateZoom.bind(this));
	}

	_updateZoom(e: WheelEvent): void {
		if (e.deltaY > 0) {
			this.zoom *= ZoomDelta;
			this.x = ((this.x + (this.w / 2)) * ZoomDelta) - (this.w / 2);
			this.y = ((this.y + (this.h / 2)) * ZoomDelta) - (this.h / 2);

		} else if (e.deltaY < 0) {
			this.zoom /= ZoomDelta;
			this.x = ((this.x + (this.w / 2)) / ZoomDelta) - (this.w / 2);
			this.y = ((this.y + (this.h / 2)) / ZoomDelta) - (this.h / 2);
		}
	}

	updatePosition(): void {
		// Keyboard
		if (InputHandler.ui.canvasFocused) {
			if (InputHandler.key.get(40) || InputHandler.key.get(83)) {
				this.y += ArrowScale / Math.sqrt(this.zoom);
			}
			if (InputHandler.key.get(39) || InputHandler.key.get(68)) {
				this.x += ArrowScale / Math.sqrt(this.zoom);
			}
			if (InputHandler.key.get(38) || InputHandler.key.get(87)) {
				this.y -= ArrowScale / Math.sqrt(this.zoom);
			}
			if (InputHandler.key.get(37) || InputHandler.key.get(65)) {
				this.x -= ArrowScale / Math.sqrt(this.zoom);
			}
		}

		// Mouse
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
			x: ((InputHandler.mouse.x + this.x) * UnityScale) / this.zoom,
			y: ((InputHandler.mouse.y + this.y) * UnityScale) / this.zoom
		};
	}

	getUnscaledMouse(): Vector2 {
		return {
			x: InputHandler.mouse.x + this.x,
			y: InputHandler.mouse.y + this.y
		};
	}

	resize(_w: number, _h: number) {
		this.w = _w;
		this.h = _h;
	}
};