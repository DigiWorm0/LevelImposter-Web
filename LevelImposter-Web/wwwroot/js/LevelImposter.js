import { Graphics } from './graphics/GraphicsHandler.js';
import { InputHandler } from './input/InputHandler.js';
import { MapHandler } from './map/MapHandler.js';
class LevelImposter {
    constructor() {
        this.i = new InputHandler();
        this.g = new Graphics();
        this.m = new MapHandler(this.g.canvas.objRender.cam);
        for (let i = 0; i < 10000; i++) {
            let x = (Math.random() * 20) - 10;
            let y = (Math.random() * 20) - 10;
            let o = MapHandler.addExisting("Dummy", "util-player");
            MapHandler.isAdding = false;
            let obj = MapHandler.map.objs[o];
            obj.x = x;
            obj.y = y;
        }
    }
}
;
// Init
let li;
$(function () {
    li = new LevelImposter();
});
//# sourceMappingURL=LevelImposter.js.map