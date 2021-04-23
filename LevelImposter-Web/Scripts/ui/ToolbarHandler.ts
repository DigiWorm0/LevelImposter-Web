import { InputHandler } from '../input/InputHandler.js';
import { SelectHandler } from '../input/SelectHandler.js';
import { MapHandler } from '../map/MapHandler.js'
import { Object } from '../models/Object.js'

export class ToolbarHandler {

	constructor() {
		$("#trash").click(this.trash.bind(this));
		document.addEventListener("LIKeyDown", this.update.bind(this));
	}

	update() {
		var activeElement = document.activeElement;
		var inputs = ['input', 'select', 'button', 'textarea'];

		if (activeElement && inputs.indexOf(activeElement.tagName.toLowerCase()) !== -1)
			return;

		if (InputHandler.key.get(46) || InputHandler.key.get(8)) {
			this.trash();
		}
	}

	setEnabled(enabled: boolean = true) {
		$("#trash").prop('disabled', !enabled);
	}

	trash() {
		if (SelectHandler.isSelected) {
			MapHandler.delete(SelectHandler.getSelection());
			SelectHandler.isSelected = false;
			InputHandler.ui.toolbar.setEnabled(false);
			InputHandler.ui.cards.clear();
		}
	}
}