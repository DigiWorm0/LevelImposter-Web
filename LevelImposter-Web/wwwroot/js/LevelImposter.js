import { Graphics } from './graphics/GraphicsHandler.js';
import { InputHandler } from './input/InputHandler.js';
import { MapHandler } from './map/MapHandler.js';
import { Version } from './models/Constants.js';
class LevelImposter {
    constructor() {
        this.i = new InputHandler();
        this.g = new Graphics();
        this.m = new MapHandler(this.g.canvas.objRender.cam);
    }
}
;
// Init
let li;
$(function () {
    console.log("LevelImposter Editor v" + Version);
    li = new LevelImposter();
});
//# sourceMappingURL=LevelImposter.js.map