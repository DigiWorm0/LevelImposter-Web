import { MapHandler } from "../map/MapHandler.js";
export class MapRenderer {
    constructor(_renderer) {
        this.renderer = _renderer;
    }
    drawMap() {
        let arr = MapHandler.map.objs;
        for (let i = 0; i < arr.length; i++) {
            if (arr.length - 1 > i) {
                if (arr[i].z < arr[i + 1].z) {
                    let temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                    this.triggerSwapEvent(i);
                }
            }
            this.renderer.drawObj(arr[i]);
        }
    }
    triggerSwapEvent(index) {
        let evt = new CustomEvent("mapswap", {
            detail: {
                index: index
            }
        });
        document.dispatchEvent(evt);
    }
}
//# sourceMappingURL=MapRenderer.js.map