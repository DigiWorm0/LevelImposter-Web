import { Object as MapObj } from "../../models/Object.js";
import { InputHandler } from "../InputHandler.js";
import { SelectHandler } from "../SelectHandler.js";
import { Action } from "./Action.js";

export class ChangeAction implements Action {

    from: MapObj;
    to: MapObj;
    target: MapObj;

    constructor(_from: MapObj, _to: MapObj) {
        this.from = _from;
        this.target = _to;
        this.to = _to.clone();
    }

    undo(): void {
        Object.keys(this.target).forEach((key) => {
            this.target[key] = this.from[key];
        });

        if (SelectHandler.isSelected)
            if (SelectHandler.getSelection().id == this.target.id)
                InputHandler.ui.cards.load(this.target);
    }
    redo(): void {
        Object.keys(this.target).forEach((key) => {
            this.target[key] = this.to[key];
        });

        if (SelectHandler.isSelected)
            if (SelectHandler.getSelection().id == this.target.id)
                InputHandler.ui.cards.load(this.target);
    }
};