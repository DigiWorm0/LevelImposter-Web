import { CardHandler } from '../cards/CardHandler.js';
import { ItemDBHandler } from './ItemDBHandler.js';
import { NameHandler } from './NameHandler.js';
import { PanelToggleHandler } from './PanelToggleHandler.js';
import { SettingsHandler } from './SettingsHandler.js';
import { ToolbarHandler } from './ToolbarHandler.js';
import { WarningsHandler } from './WarningsHandler.js';

export class UIHandler {
	name: NameHandler;
	item: ItemDBHandler;
	toolbar: ToolbarHandler;
	panel: PanelToggleHandler;
	cards: CardHandler;
	warnings: WarningsHandler;
	settings: SettingsHandler;

	canvasFocused: boolean;

	constructor() {
		$("body").addClass("no-overflow");
		$("body").click((e) => {
			this.canvasFocused = e.target.id == "licanvas";
		});

		this.name = new NameHandler();
		this.item = new ItemDBHandler();
		this.toolbar = new ToolbarHandler();
		this.panel = new PanelToggleHandler();
		this.cards = new CardHandler();
		this.warnings = new WarningsHandler();
		this.settings = new SettingsHandler();

		window.onbeforeunload = (() => {
			let params = new URLSearchParams(window.location.search);
			if (!params.has("hidecontrols"))
				return "";
		}).bind(this);
	}
}