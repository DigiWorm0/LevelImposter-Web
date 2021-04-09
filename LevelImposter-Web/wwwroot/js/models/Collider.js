import { Point } from "./Point.js";
export class Collider {
    constructor(parent) {
        this.blocksLight = true;
        this.isClosed = true;
        this.points = [];
        if (parent == undefined)
            return;
        let parentRect = parent.getRect();
        this.points = [
            new Point(parentRect.w / -2, parentRect.h / -2),
            new Point(parentRect.w / 2, parentRect.h / -2),
            new Point(parentRect.w / 2, parentRect.h / 2),
            new Point(parentRect.w / -2, parentRect.h / 2),
        ];
    }
    clone() {
        let clone = new Collider();
        clone.blocksLight = this.blocksLight;
        this.points.forEach((p) => {
            clone.points.push(new Point(p.x, p.y));
        });
        return clone;
    }
}
;
//# sourceMappingURL=Collider.js.map