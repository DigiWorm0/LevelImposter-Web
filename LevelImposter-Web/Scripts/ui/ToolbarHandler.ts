import { MapHandler } from '../map/MapHandler.js'
import { Object } from '../models/Object.js'

export class ToolbarHandler {
	deletedSelection: boolean;
	currentItem: Object;

	constructor(_currentItem: Object) {
		this.currentItem = _currentItem;

		$("#trash").click(this.trash.bind(this));
	}

	trash() {
		MapHandler.delete(this.currentItem);
		this.deletedSelection = true;
	}
}