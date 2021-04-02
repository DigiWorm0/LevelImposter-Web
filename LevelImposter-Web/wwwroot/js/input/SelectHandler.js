import { ColliderEditor } from '../map/ColliderEditor.js';
import { MapHandler } from '../map/MapHandler.js';
import { Point } from '../models/Point.js';
import { InputHandler } from './InputHandler.js';
export class SelectHandler {
    constructor(_cam) {
        SelectHandler.freezeSelection = false;
        SelectHandler.isSelected = false;
        SelectHandler.isHover = false;
        SelectHandler.hoverIndex = -1;
        SelectHandler.selectIndex = -1;
        SelectHandler.cam = _cam;
    }
    static mapSwap(index) {
        if (SelectHandler.selectIndex == index)
            SelectHandler.selectIndex++;
        else if (SelectHandler.selectIndex == index + 1)
            SelectHandler.selectIndex--;
        if (MapHandler.isAdding && MapHandler.addingIndex == index)
            MapHandler.addingIndex++;
        else if (MapHandler.isAdding && MapHandler.addingIndex == index + 1)
            MapHandler.addingIndex--;
    }
    static update() {
        // Follow Mouse when Adding a New Object
        if (MapHandler.isAdding) {
            let obj = MapHandler.map.objs[MapHandler.addingIndex];
            obj.x = SelectHandler.cam.getMouse().x;
            obj.y = SelectHandler.cam.getMouse().y;
            if (obj.type.startsWith("room-"))
                obj.z = 10;
            else if (obj.type == "util-room")
                obj.z = -10;
            if (InputHandler.mouse.left) {
                MapHandler.isAdding = false;
            }
        }
        // Normal Operation
        if (InputHandler.mouse.hover && !MapHandler.isAdding) {
            SelectHandler.hoverIndex = SelectHandler._findMapElements();
            SelectHandler.isHover = SelectHandler.hoverIndex != -1;
            if (InputHandler.mouse.left && !SelectHandler.freezeSelection && !ColliderEditor.isEditing) {
                SelectHandler.selectIndex = SelectHandler.hoverIndex;
                SelectHandler.isSelected = SelectHandler.selectIndex != -1;
                if (SelectHandler.isSelected) {
                    InputHandler.ui.toolbar.setEnabled(true);
                    InputHandler.ui.cards.load(SelectHandler.getSelection());
                }
                else {
                    InputHandler.ui.toolbar.setEnabled(false);
                    InputHandler.ui.cards.clear();
                }
            }
        }
        else {
            SelectHandler.hoverIndex = -1;
            SelectHandler.isHover = false;
        }
    }
    static getSelection() {
        if (!SelectHandler.isSelected)
            return undefined;
        return MapHandler.map.objs[SelectHandler.selectIndex];
    }
    static getHover() {
        if (!SelectHandler.isHover)
            return undefined;
        return MapHandler.map.objs[SelectHandler.hoverIndex];
    }
    static _findMapElements() {
        let mouse = SelectHandler.cam.getMouse();
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