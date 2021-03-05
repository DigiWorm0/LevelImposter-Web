import { Object } from '../models/Object.js';
import { Map } from '../models/Map.js';
import { Sprite } from '../models/Sprite.js';
export class MapHandler {
    constructor() {
        MapHandler.map = new Map();
    }
    static addCustom(url) {
        this.map.objs.push(new Object(0, 0, "custom", url, new Sprite(url)));
        return this.map.objs.length - 1;
    }
    static addExisting(type) {
        this.map.objs.push(new Object(0, 0, "existing", type, new Sprite("/Sprites/" + type + ".png")));
        return this.map.objs.length - 1;
    }
}
//# sourceMappingURL=MapHandler.js.map