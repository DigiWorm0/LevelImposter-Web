import { Sprite } from './Sprite.js';
import { UnityScale } from './Constants.js';
import { Collider } from './Collider.js';
import { InputHandler } from '../input/InputHandler.js';
import { Point } from './Point.js';
import { ColliderEditor } from '../map/ColliderEditor.js';
export class Object {
    constructor(_name, _x, _y, _spriteType, _type, _sprite) {
        this.name = _name;
        this.id = Math.floor((Date.now() + Math.random()) * 1000);
        this.x = _x;
        this.y = _y;
        this.z = 0;
        this.xScale = 1;
        this.yScale = 1;
        this.rotation = 0;
        this.colliders = new Array();
        this.targetIds = new Array();
        this.spriteType = _spriteType;
        this.type = _type;
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
    /**
     * Clones an object
     * @returns Object's Clone
     */
    clone() {
        let clone = new Object(this.name, this.x, this.y, this.spriteType, this.type, new Sprite(this.sprite.data));
        clone.z = this.z;
        clone.xScale = this.xScale;
        clone.yScale = this.yScale;
        clone.rotation = this.rotation;
        this.colliders.forEach((collider) => {
            clone.colliders.push(collider.clone());
        });
        this.targetIds.forEach((targetId) => {
            clone.targetIds.push(targetId);
        });
        return clone;
    }
}
;
//# sourceMappingURL=Object.js.map