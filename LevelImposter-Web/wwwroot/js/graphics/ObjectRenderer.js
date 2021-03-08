import { Camera } from '../models/Camera.js';
import { UnityScale } from '../models/Constants.js';
export class ObjectRenderer {
    constructor(_ctx, w, h) {
        this.cam = new Camera(w, h);
        this.ctx = _ctx;
        this.canvasWidth = w;
        this.canvasHeight = h;
    }
    _calcCamOffset(r) {
        return {
            x: (((r.x * this.cam.zoom) - ((r.w * this.cam.zoom) / 2)) / UnityScale) - this.cam.x,
            y: (((r.y * this.cam.zoom) - ((r.h * this.cam.zoom) / 2)) / UnityScale) - this.cam.y,
            w: (r.w * this.cam.zoom) / UnityScale,
            h: (r.h * this.cam.zoom) / UnityScale
        };
    }
    drawLine(from, to, strokeColor) {
        let rect1 = from;
        let rect2 = to;
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
    drawRect(r, rotation, strokeColor, fillColor = "") {
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
            this.ctx.rect(-bounds.w / 2, -bounds.h / 2, bounds.w, bounds.h);
        }
        else {
            this.ctx.fillRect(-bounds.w / 2, -bounds.h / 2, bounds.w, bounds.h);
        }
        this.ctx.stroke();
        this.ctx.restore();
    }
    drawObj(obj) {
        let bounds = this._calcCamOffset(obj.getRect());
        this.ctx.save();
        this.ctx.translate(bounds.x + (bounds.w / 2), bounds.y + (bounds.h / 2));
        this.ctx.rotate(obj.rotation * (Math.PI / 180.0));
        this.ctx.drawImage(obj.sprite.img, -bounds.w / 2, -bounds.h / 2, bounds.w, bounds.h);
        this.ctx.restore();
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
}
//# sourceMappingURL=ObjectRenderer.js.map