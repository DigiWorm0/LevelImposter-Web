import { ColliderEditor } from '../map/ColliderEditor.js';
import { MapHandler } from '../map/MapHandler.js';
import { Point } from '../models/Point.js';
import { InputHandler } from './InputHandler.js';
export class SelectHandler {
    constructor(_cam) {
        this.freezeSelection = false;
        this.isSelected = false;
        this.isHover = false;
        this.hoverIndex = -1;
        this.selectIndex = -1;
        this.cam = _cam;
        document.addEventListener("mapswap", (e) => {
            let index = e.detail.index;
            if (this.selectIndex == index)
                this.selectIndex++;
            else if (this.selectIndex == index + 1)
                this.selectIndex--;
        });
    }
    update() {
        // Deleted Object
        if (InputHandler.ui.props.toolbar.deletedSelection) {
            InputHandler.ui.props.toolbar.deletedSelection = false;
            InputHandler.ui.props.clear();
            InputHandler.ui.props.toolbar.setEnabled(false);
            this.isSelected = false;
        }
        // Follow Mouse when Adding a New Object
        if (MapHandler.isAdding) {
            let obj = MapHandler.map.objs[MapHandler.map.objs.length - 1];
            obj.x = this.cam.getMouse().x;
            obj.y = this.cam.getMouse().y;
            if (InputHandler.mouse.left) {
                MapHandler.isAdding = false;
            }
        }
        // Normal Operation
        if (InputHandler.mouse.hover && !MapHandler.isAdding) {
            this.hoverIndex = this._findMapElements();
            this.isHover = this.hoverIndex != -1;
            if (InputHandler.mouse.left && !this.freezeSelection && !ColliderEditor.isEditing) {
                this.selectIndex = this.hoverIndex;
                this.isSelected = this.selectIndex != -1;
                if (this.isSelected) {
                    InputHandler.ui.props.toolbar.setEnabled(true);
                    InputHandler.ui.props.load(this.getSelection());
                }
                else {
                    InputHandler.ui.props.toolbar.setEnabled(false);
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
            let d = Math.sqrt(Math.pow(obj.x - mouse.x, 2) + Math.pow(obj.y - mouse.y, 2));
            let a = Math.atan2(obj.y - mouse.y, obj.x - mouse.x) - (obj.rotation * (Math.PI / 180.0));
            let p = new Point(obj.x + (d * Math.cos(a)), obj.y + (d * Math.sin(a)));
            if (p.x >= rect.x - (rect.w / 2) &&
                p.y >= rect.y - (rect.h / 2) &&
                p.x <= rect.x + (rect.w / 2) &&
                p.y <= rect.y + (rect.h / 2)) {
                i = index;
            }
        });
        return i;
    }
}
//# sourceMappingURL=SelectHandler.js.map