export class ObjectRenderer {
    _calcCamOffset(r) {
        return {
            x: (r.x - (r.w / 2)) - this.cam.x,
            y: (r.y - (r.y / 2)) - this.cam.y,
            w: r.w,
            h: r.h
        };
    }
    drawRect(r, strokeColor, fillColor = "") {
        // Stroke & Fill
        stroke(strokeColor);
        if (fillColor !== "")
            fill(fillColor);
        else
            noFill();
        // Draw
        let bounds = this._calcCamOffset(r);
        rect(bounds.x, bounds.y, bounds.w, bounds.h);
    }
    drawObj(obj) {
        let bounds = this._calcCamOffset(obj.getRect());
        image(obj.sprite.img, bounds.x, bounds.y, bounds.w, bounds.h);
    }
}
//# sourceMappingURL=ObjectRenderer.js.map