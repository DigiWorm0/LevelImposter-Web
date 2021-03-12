import { Point } from "./Point.js";
export class Collider {
    constructor(parent) {
        let parentRect = parent.getRect();
        this.blocksLight = true;
        this.points = [
            new Point(parentRect.w / -2, parentRect.h / -2),
            new Point(parentRect.w / 2, parentRect.h / -2),
            new Point(parentRect.w / -2, parentRect.h / 2),
            new Point(parentRect.w / 2, parentRect.h / 2)
        ];
    }
}
;
//# sourceMappingURL=Collider.js.map