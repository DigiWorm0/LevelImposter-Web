﻿import { Object } from '../models/Object.js'
import { Map } from '../models/Map.js'
import { Sprite } from '../models/Sprite.js'
import { UploadHandler } from '../input/UploadHandler.js';

export class MapHandler {
	static map: Map;

	constructor() {
		MapHandler.map = new Map();
		$("#export").click(MapHandler.export);
		$("#import").click(MapHandler.import);
	}

	static addCustom(url: string): number {
		this.map.objs.push(new Object("Custom Object", 0, 0, "custom", url, new Sprite(url)));
		return this.map.objs.length - 1;
	}

	static addExisting(name: string, type: string): number {
		this.map.objs.push(new Object(name, 0, 0, "existing", type, new Sprite("/Sprites/" + type + ".png")));
		return this.map.objs.length - 1;
	}

	static delete(obj: Object): void {
		let index = this.map.objs.indexOf(obj);
		if (index >= 0)
			this.map.objs.splice(index, 1);
	}

	static export(): void {
		// Turn Map into a String
		function replacer(key: string, value: any): any {
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

	static import(): void {
		UploadHandler.upload((file) => {
			let url = URL.createObjectURL(file);
			MapHandler.addCustom(url);
		});
	}
}