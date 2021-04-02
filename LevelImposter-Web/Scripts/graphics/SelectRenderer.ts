import { ActionHandler } from "../input/Actions/ActionHandler.js";
import { DragHandler } from "../input/DragHandler.js";
import { SelectHandler } from "../input/SelectHandler.js";
import { ColliderEditor } from "../map/ColliderEditor.js";
import { ObjectRenderer } from "./ObjectRenderer.js";

export class SelectRenderer {
	renderer: ObjectRenderer;
	dragger: DragHandler;

	constructor(_renderer: ObjectRenderer) {
		this.renderer = _renderer;
		new SelectHandler(_renderer.cam);
		this.dragger = new DragHandler();
	}

	drawSelection(): void {
		SelectHandler.update();
		this.dragger.update();
		ActionHandler.update();

		if (ColliderEditor.isEditing)
			return;

		let select = SelectHandler.getSelection();
		let hover  = SelectHandler.getHover();

		if (SelectHandler.isSelected && SelectHandler.hoverIndex != SelectHandler.selectIndex) {
			this.renderer.drawRect(
				select.getRect(),
				select.rotation,
				"#1772e8"
			);
		} else if (SelectHandler.isSelected) {
			this.renderer.drawRect(
				select.getRect(),
				select.rotation,
				"#74aaf1"
			);
		}

		if (SelectHandler.isHover && SelectHandler.hoverIndex != SelectHandler.selectIndex) {
			this.renderer.drawRect(
				hover.getRect(),
				hover.rotation,
				"#b9b9b9"
			);
		}
	}
}