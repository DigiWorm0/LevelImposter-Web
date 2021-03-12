import { MapHandler } from '../map/MapHandler.js'
import { Object } from '../models/Object.js'
import { NameHandler } from './NameHandler.js';
import { PanelHandler } from './PanelHandler.js';
import { PropertiesHandler } from './PropertiesHandler.js';
import { ToolbarHandler } from './ToolbarHandler.js';

export class UIHandler {
	panels: PanelHandler;
	name: NameHandler;
	props: PropertiesHandler;

	constructor() {
		$("body").addClass("no-overflow");

		this.panels = new PanelHandler();
		this.name = new NameHandler();
		this.props = new PropertiesHandler();
	}
}