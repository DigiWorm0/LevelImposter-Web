import { SelectHandler } from "../input/SelectHandler.js";
import { ColliderEditor } from "../map/ColliderEditor.js";
import { MapHandler } from "../map/MapHandler.js";
import { ObjectRenderer } from "./ObjectRenderer.js";

export class VentRenderer {
	renderer: ObjectRenderer;

	constructor(_renderer: ObjectRenderer) {
		this.renderer = _renderer;
	}

	drawVents() {
		if (!SelectHandler.isSelected)
			return;

		let selection = SelectHandler.getSelection();

		if (!selection.type.startsWith("util-vent"))
			return;

		for (let index in selection.targetIds) {
			let target = selection.targetIds[index];
			if (target != -1) {
				let targetObj = MapHandler.getById(target);
				if (targetObj != undefined)
					this.renderer.drawLine(selection, targetObj, "#ff0000");
			}
		}
	}
}