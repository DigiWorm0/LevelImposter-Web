import { MapHandler } from "../../map/MapHandler.js";
import { Object } from "../../models/Object.js";
import { InputHandler } from "../InputHandler.js";
import { SelectHandler } from "../SelectHandler.js";
import { Action } from "./Action.js";

export class AddAction implements Action {

    obj: Object;

    constructor(_obj: Object) {
        this.obj = _obj;
    }

    undo(): void {
        if (SelectHandler.isSelected)
            if (SelectHandler.getSelection().id == this.obj.id) {
                SelectHandler.isSelected = false;
                InputHandler.ui.cards.clear();
            }
        MapHandler.map.objs.splice(MapHandler.map.objs.indexOf(this.obj), 1);
    }
    redo(): void {
        MapHandler.map.objs.push(this.obj);
    }
};