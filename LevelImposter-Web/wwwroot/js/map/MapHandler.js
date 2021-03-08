import { Object } from '../models/Object.js';
import { Map } from '../models/Map.js';
import { Sprite } from '../models/Sprite.js';
import { UploadHandler } from '../input/UploadHandler.js';
export class MapHandler {
    constructor() {
        MapHandler.map = new Map();
        $("#export").click(MapHandler.export);
        $("#import").click(MapHandler.import);
    }
    static addCustom(url) {
        this.map.objs.push(new Object("Custom Object", 0, 0, "custom", url, new Sprite(url)));
        return this.map.objs.length - 1;
    }
    static addExisting(name, type) {
        this.map.objs.push(new Object(name, 0, 0, "existing", type, new Sprite("/Sprites/" + type + ".png")));
        return this.map.objs.length - 1;
    }
    static delete(obj) {
        let index = this.map.objs.indexOf(obj);
        if (index >= 0)
            this.map.objs.splice(index, 1);
    }
    static export() {
        // Turn Map into a String
        function replacer(key, value) {
            if (key == "sprite")
                return undefined;
            else
                return value;
        }
        let data = JSON.stringify(MapHandler.map, replacer);
        // Download
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
        element.setAttribute('download', MapHandler.map.name + ".json");
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
    static import() {
        UploadHandler.upload((file) => {
            let url = URL.createObjectURL(file);
            MapHandler.addCustom(url);
        });
    }
}
//# sourceMappingURL=MapHandler.js.map