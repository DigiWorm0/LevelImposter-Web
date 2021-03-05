export class Sprite {
    constructor(url) {
        this.data = url;
        this.img = new Image();
        this.img.onload = () => {
            this.w = this.img.width;
            this.h = this.img.height;
        };
        this.img.src = url;
    }
}
;
//# sourceMappingURL=Sprite.js.map