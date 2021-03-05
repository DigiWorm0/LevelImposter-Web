import { MapHandler } from "../map/MapHandler.js";
export class MapRenderer {
    constructor(_renderer) {
        this.renderer = _renderer;
    }
    drawMap() {
        MapHandler.map.objs.forEach((obj) => {
            this.renderer.drawObj(obj);
        });
    }
}
//# sourceMappingURL=MapRenderer.js.map