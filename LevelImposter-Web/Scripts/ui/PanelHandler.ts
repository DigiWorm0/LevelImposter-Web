import { ItemDB } from '../map/ItemDB.js'
import { MapHandler } from '../map/MapHandler.js'
import { Object } from '../models/Object.js'
import { ItemDBHandler } from './ItemDBHandler.js';
import { PropertiesHandler } from './PropertiesHandler.js';

export class PanelHandler {

	leftPanel: PropertiesHandler;
	rightPanel: ItemDBHandler;

	constructor() {
		this.leftPanel = new PropertiesHandler();
		this.rightPanel = new ItemDBHandler();

		$("#left-btn").click(this.toggleLeftPanel);
		$("#right-btn").click(this.toggleRightPanel);
	}

	toggleLeftPanel() {
		if ($("#left-panel").hasClass("close-left")) {
			$("#left-panel").removeClass("close-left");
			$("#left-btn").removeClass("close-left-btn");
		} else {
			$("#left-panel").addClass("close-left");
			$("#left-btn").addClass("close-left-btn");
		}
	}

	toggleRightPanel() {
		if ($("#right-panel").hasClass("close-right")) {
			$("#right-panel").removeClass("close-right");
			$("#right-btn").removeClass("close-right-btn");
		} else {
			$("#right-panel").addClass("close-right");
			$("#right-btn").addClass("close-right-btn");
		}
	}
}