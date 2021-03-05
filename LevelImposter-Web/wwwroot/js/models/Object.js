export class Object {
    constructor(_x, _y, _type, _data, _sprite) {
        this.x = _x;
        this.y = _y;
        this.xScale = 1;
        this.yScale = 1;
        this.type = _type;
        this.data = _data;
        this.sprite = _sprite;
    }
    getRect() {
        return {
            x: this.x,
            y: this.y,
            w: this.xScale * this.sprite.w,
            h: this.yScale * this.sprite.h
        };
    }
}
;
//# sourceMappingURL=Object.js.map