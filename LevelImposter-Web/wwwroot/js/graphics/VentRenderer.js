import { SelectHandler } from "../input/SelectHandler.js";
import { MapHandler } from "../map/MapHandler.js";
export class VentRenderer {
    constructor(_renderer) {
        this.renderer = _renderer;
    }
    drawVents() {
        if (!SelectHandler.isSelected)
            return;
        let selection = SelectHandler.getSelection();
        if (!selection.type.startsWith("util-vent"))
            return;
        for (let index in selection.targetIds) {
            let target = selection.targetIds[index];
            if (target != -1) {
                let targetObj = MapHandler.getById(target);
                if (targetObj != undefined)
                    this.renderer.drawLine(selection, targetObj, "#ff0000");
            }
        }
    }
}
//# sourceMappingURL=VentRenderer.js.map