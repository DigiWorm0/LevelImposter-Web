import { MapHandler } from "../map/MapHandler.js";
import { Object } from "../models/Object.js";
import { ObjectRenderer } from "./ObjectRenderer.js";

export class MapRenderer {
	renderer: ObjectRenderer;

	constructor(_renderer: ObjectRenderer) {
		this.renderer = _renderer;
	}

	drawMap() {
		MapHandler.map.objs.forEach((obj: Object) => {
			this.renderer.drawObj(obj);
		});
	}
}