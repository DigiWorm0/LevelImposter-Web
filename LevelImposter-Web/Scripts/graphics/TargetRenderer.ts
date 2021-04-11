import { SelectHandler } from "../input/SelectHandler.js";
import { MapHandler } from "../map/MapHandler.js";
import { ObjectRenderer } from "./ObjectRenderer.js";

export class TargetRenderer {
	renderer: ObjectRenderer;

	constructor(_renderer: ObjectRenderer) {
		this.renderer = _renderer;
	}

	drawTargets() {
		if (!SelectHandler.isSelected)
			return;

		let selection = SelectHandler.getSelection();

		for (let index in selection.targetIds) {
			let targetId = selection.targetIds[index];
			if (targetId > 0) {
				let targetObj = MapHandler.getById(targetId);
				if (targetObj != undefined)
					this.renderer.drawLine(selection, targetObj, "#ff0000");
			}
		}
	}
}