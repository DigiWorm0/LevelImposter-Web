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
		this.cam = new Camera(w, h);

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

	drawCircle(pos: Vector2, radius: number, strokeColor: string, semiCircle = false) {
		let rect = {
			x: pos.x,
			y: pos.y,
			w: radius,
			h: radius
		};

		let bounds = this._calcCamOffset(rect);
		this.ctx.strokeStyle = strokeColor;
		this.ctx.lineWidth = 1;

		// Draw
		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.translate(bounds.x + (bounds.w / 2), bounds.y + (bounds.h / 2));
		this.ctx.arc(0, 0, bounds.w, 0, semiCircle ? Math.PI : Math.PI * 2);
		this.ctx.stroke();
		this.ctx.restore();

		if (semiCircle) {
			this.drawLine({ x: pos.x - radius, y: pos.y }, { x: pos.x + radius, y: pos.y }, strokeColor);
		}
	}

	drawRect(r: Rect, rotation: number, strokeColor: string, fillColor: string = ""): void {
		this.ctx.beginPath();
		this.ctx.strokeStyle = strokeColor;
		this.ctx.fillStyle = fillColor;
		this.ctx.lineWidth = 1;
		let bounds = this._calcCamOffset(r);

		// Draw
		this.ctx.save();
		this.ctx.translate(bounds.x + (bounds.w / 2), bounds.y + (bounds.h / 2));
		this.ctx.rotate(rotation * (Math.PI / 180.0));
		if (fillColor === "") {
			this.ctx.rect(
				-bounds.w / 2,
				-bounds.h / 2,
				bounds.w,
				bounds.h
			);
		} else {
			this.ctx.fillRect(
				-bounds.w / 2,
				-bounds.h / 2,
				bounds.w,
				bounds.h
			);
		}
		this.ctx.stroke();
		this.ctx.restore();
	}

	drawTxt(txt: string, x: number, y: number): void {
		this.ctx.font = "bold 30px Bahnschrift";
		this.ctx.fillStyle = "white";
		this.ctx.strokeStyle = "black";
		this.ctx.lineWidth = 2;
		this.ctx.strokeText(txt, x - this.ctx.measureText(txt).width / 2, y);
		this.ctx.fillText(txt, x - this.ctx.measureText(txt).width / 2, y);
	}

	drawObj(obj: Object): void {
		let bounds = this._calcCamOffset(obj.getRect());
		this.ctx.save();
		this.ctx.translate(bounds.x + (bounds.w / 2), bounds.y + (bounds.h / 2));
		this.ctx.rotate(obj.rotation * (Math.PI / 180.0));
		this.ctx.scale(
			obj.flipX ? -1 : 1,
			obj.flipY ? -1 : 1
		);
		this.ctx.drawImage(
			obj.sprite.img,
			-bounds.w / 2,
			-bounds.h / 2,
			bounds.w,
			bounds.h
		);
		if (obj.type == "util-room") {
			this.drawTxt(obj.name, 0, bounds.h / -2);
		}
		this.ctx.restore();
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