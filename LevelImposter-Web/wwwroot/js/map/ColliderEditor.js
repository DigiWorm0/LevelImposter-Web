import { InputHandler } from "../input/InputHandler.js";
import { ColliderRange } from "../models/Constants.js";
import { Point } from "../models/Point.js";
export class ColliderEditor {
    static update(cam) {
        if (!this.isEditing)
            return;
        let mouse = cam.getMouse();
        let pts = this.getPts();
        let closed = this.getClosed();
        if (!this.isEditingPt) {
            let smallestD = Number.MAX_SAFE_INTEGER; // Distance
            let smallestP = new Point(); // Point
            let smallestE = false; // On Edge
            let smallestI = -1; // Index
            for (let i = 0; i < pts.length - (closed ? 0 : 1); i++) {
                let p1 = pts[i];
                let p2 = pts[(i + 1) % pts.length];
                let isOnEdge = true;
                // Distance from Mouse to Line
                let d = ((((p2.x - p1.x) * (p1.y - mouse.y)) - ((p1.x - mouse.x) * (p2.y - p1.y))) /
                    Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)));
                if (p1.x > p2.x)
                    d *= -1;
                // Angle of Mouse to Line
                let a = Math.atan((p2.y - p1.y) / (p2.x - p1.x)) + (Math.PI / 2);
                // Point on the Line
                let p = new Point(d * Math.cos(a) + mouse.x, d * Math.sin(a) + mouse.y);
                // Keep within Domain & Range
                let ptIndex = i;
                let bgX = p1.x > p2.x ? p1 : p2;
                let bgY = p1.y > p2.y ? p1 : p2;
                let smX = p2.x > p1.x ? p1 : p2;
                let smY = p2.y > p1.y ? p1 : p2;
                if (p.x > bgX.x + ColliderRange) {
                    p = bgX;
                    ptIndex = p1.x > p2.x ? i : (i + 1) % pts.length;
                }
                else if (p.y > bgY.y + ColliderRange) {
                    p = bgY;
                    ptIndex = p1.y > p2.y ? i : (i + 1) % pts.length;
                }
                else if (p.x < smX.x - ColliderRange) {
                    p = smX;
                    ptIndex = p2.x > p1.x ? i : (i + 1) % pts.length;
                }
                else if (p.y < smY.y - ColliderRange) {
                    p = smY;
                    ptIndex = p2.y > p1.y ? i : (i + 1) % pts.length;
                }
                else {
                    isOnEdge = false;
                }
                // Check Distance
                let newD = Math.sqrt(Math.pow(mouse.x - p.x, 2) + Math.pow(mouse.y - p.y, 2));
                if (newD < smallestD) {
                    smallestD = newD;
                    smallestP = p;
                    smallestE = isOnEdge;
                    smallestI = ptIndex;
                }
            }
            if (smallestD < 1) {
                this.onEdge = smallestE;
                this.closestPt = smallestP;
                this.closestIndex = smallestI;
            }
            else {
                this.onEdge = false;
                this.closestPt = new Point();
                this.closestIndex = -1;
            }
        }
        // Controls
        this.isEditingPt = false;
        if (InputHandler.mouse.left) {
            if (this.onEdge) {
                this.isEditingPt = true;
                this.closestPt.x = cam.getMouse().x;
                this.closestPt.y = cam.getMouse().y;
                let rawPt = this.obj.colliders[this.index].points[this.closestIndex];
                rawPt.x = cam.getMouse().x - this.obj.x;
                rawPt.y = cam.getMouse().y - this.obj.y;
                if (InputHandler.key.get(16)) {
                    rawPt.x = Math.round(rawPt.x * 10) / 10;
                    rawPt.y = Math.round(rawPt.y * 10) / 10;
                }
            }
            else {
                this.isEditingPt = true;
                this.onEdge = true;
                this.obj.colliders[this.index].points.splice(this.closestIndex + 1, 0, new Point(cam.getMouse().x - this.obj.x, cam.getMouse().y - this.obj.y));
                this.closestIndex++;
            }
        }
        else if (InputHandler.mouse.right && this.onEdge) {
            InputHandler.mouse.right = false;
            this.obj.colliders[this.index].points.splice(this.closestIndex, 1);
        }
    }
    static edit(_obj, _index) {
        if (this.index == _index)
            return this.stop();
        if (this.isEditing)
            this.stop();
        $("#colliderBtn" + _index).text("Stop Editing");
        this.isEditing = true;
        this.obj = _obj;
        this.index = _index;
    }
    static getPts() {
        if (!this.isEditing)
            return;
        return this.obj.getColliderPts(this.index);
    }
    static getClosed() {
        if (!this.isEditing)
            return false;
        return this.obj.colliders[this.index].isClosed;
    }
    static stop() {
        if (!this.isEditing)
            return;
        $("#colliderBtn" + this.index).text("Edit");
        this.isEditing = false;
        this.obj = undefined;
        this.index = -1;
    }
}
ColliderEditor.isEditing = false;
ColliderEditor.index = -1;
ColliderEditor.closestIndex = -1;
ColliderEditor.allPts = new Array();
ColliderEditor.onEdge = false;
ColliderEditor.isEditingPt = false;
//# sourceMappingURL=ColliderEditor.js.map