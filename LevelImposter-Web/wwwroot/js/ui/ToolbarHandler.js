import { MapHandler } from '../map/MapHandler.js';
export class ToolbarHandler {
    constructor(_currentItem) {
        this.currentItem = _currentItem;
        $("#trash").click(this.trash.bind(this));
    }
    trash() {
        MapHandler.delete(this.currentItem);
        this.deletedSelection = true;
    }
}
//# sourceMappingURL=ToolbarHandler.js.map