import { ColliderEditor } from "../map/ColliderEditor.js";
export class ColliderRenderer {
    constructor(_renderer) {
        this.renderer = _renderer;
    }
    drawCollider() {
        if (!ColliderEditor.isEditing)
            return;
        // Draw Lines
        let colliderPts = ColliderEditor.getPts();
        for (let i = 0; i < colliderPts.length; i++) {
            let p1 = colliderPts[i];
            let p2 = colliderPts[(i + 1) % colliderPts.length];
            this.renderer.drawLine(p1, p2, "green");
        }
        // Draw Point
        ColliderEditor.update(this.renderer.cam);
        let pt = ColliderEditor.closestPt;
        let color = ColliderEditor.onEdge ? "red" : "green";
        this.renderer.drawRect({
            x: pt.x,
            y: pt.y,
            w: .1,
            h: .1
        }, 0, color, color);
    }
}
//# sourceMappingURL=ColliderRenderer.js.map