import { DragHandler } from "../input/DragHandler.js";
import { SelectHandler } from "../input/SelectHandler.js";
import { ColliderEditor } from "../map/ColliderEditor.js";
export class SelectRenderer {
    constructor(_renderer) {
        this.renderer = _renderer;
        new SelectHandler(_renderer.cam);
        this.dragger = new DragHandler();
    }
    drawSelection() {
        SelectHandler.update();
        this.dragger.update();
        if (ColliderEditor.isEditing)
            return;
        let select = SelectHandler.getSelection();
        let hover = SelectHandler.getHover();
        if (SelectHandler.isSelected && SelectHandler.hoverIndex != SelectHandler.selectIndex) {
            this.renderer.drawRect(select.getRect(), select.rotation, "#1772e8");
        }
        else if (SelectHandler.isSelected) {
            this.renderer.drawRect(select.getRect(), select.rotation, "#74aaf1");
        }
        if (SelectHandler.isHover && SelectHandler.hoverIndex != SelectHandler.selectIndex) {
            this.renderer.drawRect(hover.getRect(), hover.rotation, "#b9b9b9");
        }
    }
}
//# sourceMappingURL=SelectRenderer.js.map