import { Graphics } from './graphics/GraphicsHandler.js';
import { InputHandler } from './input/InputHandler.js';
import { MapHandler } from './map/MapHandler.js';
class LevelImposter {
    constructor() {
        this.m = new MapHandler();
        this.g = new Graphics();
        this.i = new InputHandler();
    }
}
;
// Init
let li;
$(function () {
    li = new LevelImposter();
});
//# sourceMappingURL=LevelImposter.js.map