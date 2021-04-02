import { MapHandler } from "../../map/MapHandler.js";
import { InputHandler } from "../InputHandler.js";
import { SelectHandler } from "../SelectHandler.js";
export class DelAction {
    constructor(_obj) {
        this.obj = _obj;
    }
    redo() {
        if (SelectHandler.isSelected)
            if (SelectHandler.getSelection().id == this.obj.id) {
                SelectHandler.isSelected = false;
                InputHandler.ui.cards.clear();
            }
        MapHandler.map.objs.splice(MapHandler.map.objs.indexOf(this.obj), 1);
    }
    undo() {
        MapHandler.map.objs.push(this.obj);
    }
}
;
//# sourceMappingURL=DelAction.js.map