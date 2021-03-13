import { InputHandler } from '../input/InputHandler.js';
import { MapHandler } from '../map/MapHandler.js';
export class ToolbarHandler {
    constructor(_currentItem) {
        this.currentItem = _currentItem;
        $("#trash").click(this.trash.bind(this));
        document.addEventListener("LIKeyDown", this.update.bind(this));
    }
    update() {
        if (InputHandler.key.get(46)) {
            this.trash();
        }
    }
    setEnabled(enabled = true) {
        $("#trash").prop('disabled', !enabled);
    }
    trash() {
        if (this.currentItem) {
            MapHandler.delete(this.currentItem);
            this.deletedSelection = true;
        }
    }
}
//# sourceMappingURL=ToolbarHandler.js.map