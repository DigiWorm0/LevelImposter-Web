import { UnityScale } from './Constants.js';
export class Object {
    constructor(_name, _x, _y, _type, _data, _sprite) {
        this.name = _name;
        this.x = _x;
        this.y = _y;
        this.z = 0;
        this.xScale = 1;
        this.yScale = 1;
        this.rotation = 0;
        this.type = _type;
        this.data = _data;
        this.sprite = _sprite;
    }
    getRect() {
        return {
            x: this.x,
            y: this.y,
            w: this.xScale * this.sprite.w * UnityScale,
            h: this.yScale * this.sprite.h * UnityScale
        };
    }
}
;
//# sourceMappingURL=Object.js.map