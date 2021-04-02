import { InputHandler } from "../InputHandler.js";
import { SelectHandler } from "../SelectHandler.js";
export class ChangeAction {
    constructor(_from, _to) {
        this.from = _from;
        this.target = _to;
        this.to = _to.clone();
    }
    undo() {
        Object.keys(this.target).forEach((key) => {
            this.target[key] = this.from[key];
        });
        if (SelectHandler.isSelected)
            if (SelectHandler.getSelection().id == this.target.id)
                InputHandler.ui.cards.load(this.target);
    }
    redo() {
        Object.keys(this.target).forEach((key) => {
            this.target[key] = this.to[key];
        });
        if (SelectHandler.isSelected)
            if (SelectHandler.getSelection().id == this.target.id)
                InputHandler.ui.cards.load(this.target);
    }
}
;
//# sourceMappingURL=ChangeAction.js.map