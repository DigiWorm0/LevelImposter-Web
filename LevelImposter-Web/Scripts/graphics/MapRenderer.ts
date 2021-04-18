import { SelectHandler } from "../input/SelectHandler.js";
import { MapHandler } from "../map/MapHandler.js";
import { ObjectRenderer } from "./ObjectRenderer.js";

export class MapRenderer {
	renderer: ObjectRenderer;

	constructor(_renderer: ObjectRenderer) {
		this.renderer = _renderer;
	}

	drawMap(): void {
		let arr = MapHandler.map.objs;
		for (let i = 0; i < arr.length; i++) {
			if (arr.length - 1 > i) {
				if (arr[i].z < arr[i + 1].z) {
					let temp = arr[i];
					arr[i] = arr[i + 1];
					arr[i + 1] = temp;
					SelectHandler.mapSwap(i);
				}
			}
			try {
				this.renderer.drawObj(arr[i]);
			} catch {}
		}
	}
}