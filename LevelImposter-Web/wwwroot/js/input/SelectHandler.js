import { MapHandler } from '../map/MapHandler.js';
import { InputHandler } from './InputHandler.js';
export class SelectHandler {
    constructor(_cam) {
        this.freezeSelection = false;
        this.isSelected = false;
        this.isHover = false;
        this.hoverIndex = -1;
        this.selectIndex = -1;
        this.cam = _cam;
    }
    update() {
        if (InputHandler.ui.props.toolbar.deletedSelection) {
            InputHandler.ui.props.toolbar.deletedSelection = false;
            this.isSelected = false;
        }
        if (InputHandler.mouse.hover) {
            this.hoverIndex = this._findMapElements();
            this.isHover = this.hoverIndex != -1;
            if (InputHandler.mouse.left && !this.freezeSelection) {
                this.selectIndex = this.hoverIndex;
                this.isSelected = this.selectIndex != -1;
                if (this.isSelected) {
                    InputHandler.ui.props.load(this.getSelection());
                }
                else {
                    InputHandler.ui.props.clear();
                }
            }
        }
        else {
            this.hoverIndex = -1;
            this.isHover = false;
        }
    }
    getSelection() {
        if (!this.isSelected)
            return undefined;
        return MapHandler.map.objs[this.selectIndex];
    }
    getHover() {
        if (!this.isHover)
            return undefined;
        return MapHandler.map.objs[this.hoverIndex];
    }
    _findMapElements() {
        let mouse = this.cam.getMouse();
        let i = -1;
        MapHandler.map.objs.forEach((obj, index) => {
            let rect = obj.getRect();
            if (mouse.x >= rect.x - (rect.w / 2) &&
                mouse.y >= rect.y - (rect.h / 2) &&
                mouse.x <= rect.x + (rect.w / 2) &&
                mouse.y <= rect.y + (rect.h / 2)) {
                i = index;
            }
        });
        return i;
    }
}
//# sourceMappingURL=SelectHandler.js.map