import { UnityScale } from './Constants.js';
import { Collider } from './Collider.js';
import { InputHandler } from '../input/InputHandler.js';
import { Point } from './Point.js';
import { ColliderEditor } from '../map/ColliderEditor.js';
export class Object {
    constructor(_name, _x, _y, _type, _data, _sprite) {
        this.name = _name;
        this.x = _x;
        this.y = _y;
        this.z = 0;
        this.xScale = 1;
        this.yScale = 1;
        this.rotation = 0;
        this.colliders = new Array();
        this.type = _type;
        this.data = _data;
        this.sprite = _sprite;
    }
    /**
     * Converts the object into a Rectangle
     */
    getRect() {
        return {
            x: this.x,
            y: this.y,
            w: this.xScale * this.sprite.w * UnityScale,
            h: this.yScale * this.sprite.h * UnityScale
        };
    }
    /**
     * Gets collider points In reference to the world
     * @param index - Index of Collider
     */
    getColliderPts(index) {
        if (index < 0 || index >= this.colliders.length)
            return undefined;
        let pts = this.colliders[index].points;
        let newPts = new Array();
        for (let i = 0; i < pts.length; i++) {
            let newPt = new Point();
            newPt.x = pts[i].x + this.x;
            newPt.y = pts[i].y + this.y;
            newPts.push(newPt);
        }
        return newPts;
    }
    /**
     * Adds a collider to the object
     */
    addCollider() {
        this.colliders.push(new Collider(this));
        InputHandler.ui.cards.load(this);
    }
    /**
     * Deletes collider of the index
     * @param index - Index of the collider
     */
    remCollider(index) {
        if (index < 0 || index >= this.colliders.length)
            return;
        this.colliders.splice(index, 1);
        if (ColliderEditor.index == index)
            ColliderEditor.stop();
    }
}
;
//# sourceMappingURL=Object.js.map