import { Camera } from '../models/Camera.js';
export class ObjectRenderer {
    constructor(_ctx, w, h) {
        this.cam = new Camera();
        this.cam.x = w / -2;
        this.cam.y = h / -2;
        this.ctx = _ctx;
        this.canvasWidth = w;
        this.canvasHeight = h;
    }
    _calcCamOffset(r) {
        return {
            x: (r.x - (r.w / 2)) - this.cam.x,
            y: (r.y - (r.h / 2)) - this.cam.y,
            w: r.w * this.cam.zoom,
            h: r.h * this.cam.zoom
        };
    }
    drawRect(r, strokeColor, fillColor = "") {
        this.ctx.beginPath();
        this.ctx.strokeStyle = strokeColor;
        this.ctx.fillStyle = fillColor;
        this.ctx.lineWidth = 1;
        let bounds = this._calcCamOffset(r);
        if (fillColor === "") {
            this.ctx.rect(bounds.x, bounds.y, bounds.w, bounds.h);
        }
        else {
            this.ctx.fillRect(bounds.x, bounds.y, bounds.w, bounds.h);
        }
        this.ctx.stroke();
    }
    drawObj(obj) {
        let bounds = this._calcCamOffset(obj.getRect());
        this.ctx.drawImage(obj.sprite.img, bounds.x, bounds.y, bounds.w, bounds.h);
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
}
//# sourceMappingURL=ObjectRenderer.js.map