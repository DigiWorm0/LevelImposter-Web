import { GridScale } from "../models/Constants.js";
export class GridRenderer {
    constructor(_renderer) {
        this.renderer = _renderer;
    }
    drawGrid() {
        for (var x = -100; x < 100; x += GridScale) {
            let color = "#696969"; // nice
            if (x === 0)
                color = "blue";
            this.renderer.drawLine({ x: x, y: -100 }, { x: x, y: 100 }, color);
        }
        for (var y = -100; y < 100; y += GridScale) {
            let color = "#696969"; // nice
            if (y === 0)
                color = "red";
            this.renderer.drawLine({ x: -100, y: y }, { x: 100, y: y }, color);
        }
    }
}
//# sourceMappingURL=GridRenderer.js.map