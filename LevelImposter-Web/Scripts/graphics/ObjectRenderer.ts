import { Camera } from '../models/Camera.js'
import { Rect } from '../models/Rect.js'
import { Object } from '../models/Object.js';

export class ObjectRenderer {
	canvasWidth: number;
	canvasHeight: number;
	ctx: CanvasRenderingContext2D;
	cam: Camera;

	constructor(_ctx: CanvasRenderingContext2D, w: number, h: number) {
		this.cam = new Camera();
		this.cam.x = w / -2;
		this.cam.y = h / -2;

		this.ctx = _ctx;
		this.canvasWidth = w;
		this.canvasHeight = h;
	}

	_calcCamOffset(r: Rect): Rect {
		return {
			x: (r.x - (r.w / 2)) - this.cam.x,
			y: (r.y - (r.h / 2)) - this.cam.y,
			w: r.w,
			h: r.h
		};
	}

	drawRect(r: Rect, strokeColor:string, fillColor: string = ""): void {
		this.ctx.beginPath();
		this.ctx.strokeStyle = strokeColor;
		this.ctx.fillStyle = fillColor;
		this.ctx.lineWidth = 1;
		let bounds = this._calcCamOffset(r);

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