import { GridScale } from "../models/Constants.js";
import { ObjectRenderer } from "./ObjectRenderer.js";

export class GridRenderer {
	renderer: ObjectRenderer;
	isEmbed: boolean;

	constructor(_renderer: ObjectRenderer) {
		this.renderer = _renderer;

		let params = new URLSearchParams(window.location.search);
		this.isEmbed = params.has("hidecontrols");
	}

	drawGrid(): void {
		if (this.isEmbed)
			return;

		for (var x = -100; x <= 100; x += GridScale) {
			let color = "#595959";
			if (x === 0)
				color = "blue";
			else if (x % 10 == 0)
				color = "#a6a6a6";
			this.renderer.drawLine({ x: x, y: -100 }, { x: x, y: 100 }, color );
		}
		for (var y = -100; y <= 100; y += GridScale) {
			let color = "#595959";
			if (y === 0)
				color = "red";
			else if (y % 10 == 0)
				color = "#a6a6a6";
			this.renderer.drawLine({ x: -100, y: y }, { x: 100, y: y }, color);
		}
	}
}