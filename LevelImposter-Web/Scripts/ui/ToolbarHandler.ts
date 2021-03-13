import { InputHandler } from '../input/InputHandler.js';
import { MapHandler } from '../map/MapHandler.js'
import { Object } from '../models/Object.js'

export class ToolbarHandler {
	deletedSelection: boolean;
	currentItem: Object;

	constructor(_currentItem: Object) {
		this.currentItem = _currentItem;
		$("#trash").click(this.trash.bind(this));
		document.addEventListener("LIKeyDown", this.update.bind(this));
	}

	update() {
		if (InputHandler.key.get(46)) {
			this.trash();
		}
	}

	setEnabled(enabled: boolean = true) {
		$("#trash").prop('disabled', !enabled);
	}

	trash() {
		if (this.currentItem) {
			MapHandler.delete(this.currentItem);
			this.deletedSelection = true;
		}
	}
}