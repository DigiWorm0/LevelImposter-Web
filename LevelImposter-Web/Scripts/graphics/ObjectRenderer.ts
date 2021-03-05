import { Camera } from '../models/Camera.js'
import { Rect } from '../models/Rect.js'
import { Object } from '../models/Object.js';
import { Vector2 } from '../models/Vector2.js';
import { UnityScale } from '../models/Constants.js';

export class ObjectRenderer {
	canvasWidth: number;
	canvasHeight: number;
	ctx: CanvasRenderingContext2D;
	cam: Camera;

	constructor(_ctx: CanvasRenderingContext2D, w: number, h: number) {
		this.cam = new Camera();
		this.cam.x = (w / -2);
		this.cam.y = (h / -2);

		this.ctx = _ctx;
		this.canvasWidth = w;
		this.canvasHeight = h;
	}

	_calcCamOffset(r: Rect): Rect {
		return {
			x: (((r.x * this.cam.zoom) - ((r.w * this.cam.zoom) / 2)) / UnityScale) - this.cam.x,
			y: (((r.y * this.cam.zoom) - ((r.h * this.cam.zoom) / 2)) / UnityScale) - this.cam.y,
			w: (r.w * this.cam.zoom) / UnityScale,
			h: (r.h * this.cam.zoom) / UnityScale
		};
	}

	drawLine(from: Vector2, to: Vector2, strokeColor: string) {
		let rect1 = from as Rect;
		let rect2 = to as Rect;
		rect1.w = 0;
		rect1.h = 0;
		rect2.w = 0;
		rect2.h = 0;
		let bounds1 = this._calcCamOffset(rect1);
		let bounds2 = this._calcCamOffset(rect2);
		this.ctx.strokeStyle = strokeColor;
		this.ctx.lineWidth = 1;

		// Draw
		this.ctx.beginPath();
		this.ctx.moveTo(bounds1.x, bounds1.y);
		this.ctx.lineTo(bounds2.x, bounds2.y);
		this.ctx.stroke();
	}

	drawRect(r: Rect, strokeColor: string, fillColor: string = ""): void {
		this.ctx.beginPath();
		this.ctx.strokeStyle = strokeColor;
		this.ctx.fillStyle = fillColor;
		this.ctx.lineWidth = 1;
		let bounds = this._calcCamOffset(r);

		// Draw
		if (fillColor === "") {
			this.ctx.rect(
				bounds.x,
				bounds.y,
				bounds.w,
				bounds.h
			);
		} else {
			this.ctx.fillRect(
				bounds.x,
				bounds.y,
				bounds.w,
				bounds.h
			);
		}
		this.ctx.stroke();
	}

	drawObj(obj: Object): void {
		let bounds = this._calcCamOffset(obj.getRect());
		this.ctx.drawImage(
			obj.sprite.img,
			bounds.x,
			bounds.y,
			bounds.w,
			bounds.h
		);
	}

	clear(): void {
		this.ctx.clearRect(
			0,
			0,
			this.canvasWidth,
			this.canvasHeight
		);
	}
}