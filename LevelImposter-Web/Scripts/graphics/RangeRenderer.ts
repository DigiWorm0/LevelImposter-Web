import { SelectHandler } from "../input/SelectHandler.js";
import { MapHandler } from "../map/MapHandler.js";
import { Vector2 } from "../models/Vector2.js";
import { ObjectRenderer } from "./ObjectRenderer.js";

export class RangeRenderer {
	renderer: ObjectRenderer;

	constructor(_renderer: ObjectRenderer) {
		this.renderer = _renderer;
	}

	drawRanges() {
		if (!SelectHandler.isSelected)
			return;

		let selection = SelectHandler.getSelection();

		if (selection.type.startsWith("util-spawn"))
			this.renderer.drawCircle(selection as Vector2, 1.55, "red");
		else if (selection.type == "util-room" || selection.type == "util-player")
			this.doNothing();
		else if (selection.type == "util-cam")
			this.renderer.drawRect({
				x: selection.x,
				y: selection.y,
				w: 6,
				h: 4
			},
				0,
				"red",
			);
		else if (selection.type.startsWith("util-vent"))
			this.renderer.drawCircle(selection as Vector2, 0.75, "red", false);
		else if (selection.type.startsWith("util-") || selection.type.startsWith("task-") || selection.type.startsWith("sab-"))
			this.renderer.drawCircle(selection as Vector2, 1, "red", selection.onlyFromBottom);
	}

	doNothing() {
		
	}
}