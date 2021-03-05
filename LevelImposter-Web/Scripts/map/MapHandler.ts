import { Object } from '../models/Object.js'
import { Map } from '../models/Map.js'
import { Sprite } from '../models/Sprite.js'

export class MapHandler {
	static map: Map;

	constructor() {
		MapHandler.map = new Map();
	}

	static addCustom(url: string): number {
		this.map.objs.push(new Object("Custom Object", 0, 0, "custom", url, new Sprite(url)));
		return this.map.objs.length - 1;
	}

	static addExisting(name: string, type: string): number {
		this.map.objs.push(new Object(name, 0, 0, "existing", type, new Sprite("/Sprites/" + type + ".png")));
		return this.map.objs.length - 1;
	}
}