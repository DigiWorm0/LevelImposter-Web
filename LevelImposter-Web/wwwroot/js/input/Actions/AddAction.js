import { MapHandler } from "../../map/MapHandler.js";
import { InputHandler } from "../InputHandler.js";
import { SelectHandler } from "../SelectHandler.js";
export class AddAction {
    constructor(_obj) {
        this.obj = _obj;
    }
    undo() {
        if (SelectHandler.isSelected)
            if (SelectHandler.getSelection().id == this.obj.id) {
                SelectHandler.isSelected = false;
                InputHandler.ui.cards.clear();
            }
        MapHandler.map.objs.splice(MapHandler.map.objs.indexOf(this.obj), 1);
    }
    redo() {
        MapHandler.map.objs.push(this.obj);
    }
}
;
//# sourceMappingURL=AddAction.js.map