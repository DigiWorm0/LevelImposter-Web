import { DragHandler } from "../input/DragHandler.js";
import { SelectHandler } from "../input/SelectHandler.js";
import { ObjectRenderer } from "./ObjectRenderer.js";

export class SelectRenderer {
	renderer: ObjectRenderer;
	selection: SelectHandler;
	dragger: DragHandler;

	constructor(_renderer: ObjectRenderer) {
		this.renderer = _renderer;
		this.selection = new SelectHandler(_renderer.cam);
		this.dragger = new DragHandler(this.selection);
	}

	drawSelection(): void {
		this.selection.update();
		this.dragger.update();

		let select = this.selection.getSelection();
		let hover  = this.selection.getHover();

		if (this.selection.isSelected) {
			this.renderer.drawRect(
				select.getRect(),
				"#1a73e8"
			);
		}
		if (this.selection.isHover && this.selection.hoverIndex != this.selection.selectIndex) {
			this.renderer.drawRect(
				hover.getRect(),
				"#b9b9b9"
			);
		}
	}
}