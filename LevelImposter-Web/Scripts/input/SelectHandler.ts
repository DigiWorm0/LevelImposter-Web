import { ColliderEditor } from '../map/ColliderEditor.js';
import { MapHandler } from '../map/MapHandler.js';
import { Camera } from '../models/Camera.js';
import { Object } from '../models/Object.js';
import { Point } from '../models/Point.js';
import { InputHandler } from './InputHandler.js';

export class SelectHandler {
	static freezeSelection: boolean;
	static isSelected: boolean;
	static isHover: boolean;
	static hoverIndex: number;
	static selectIndex: number;
	static cam: Camera;
	static isEmbed: boolean;

	constructor(_cam: Camera) {
		SelectHandler.freezeSelection = false;
		SelectHandler.isSelected = false;
		SelectHandler.isHover = false;
		SelectHandler.hoverIndex = -1;
		SelectHandler.selectIndex = -1;
		SelectHandler.cam = _cam;

		let params = new URLSearchParams(window.location.search);
		SelectHandler.isEmbed = params.has("hidecontrols");
	}

	static mapSwap(index: number): void {
		if (SelectHandler.selectIndex == index)
			SelectHandler.selectIndex++;
		else if (SelectHandler.selectIndex == index + 1)
			SelectHandler.selectIndex--;

		if (MapHandler.isAdding && MapHandler.addingIndex == index)
			MapHandler.addingIndex++;
		else if (MapHandler.isAdding && MapHandler.addingIndex == index + 1)
			MapHandler.addingIndex--;
	}

	static update(): void {

		// Follow Mouse when Adding a New Object
		if (MapHandler.isAdding) {
			let obj = MapHandler.map.objs[MapHandler.addingIndex];
			obj.x = SelectHandler.cam.getMouse().x;
			obj.y = SelectHandler.cam.getMouse().y;

			// Grid Snap
			if (InputHandler.key.get(16)) {
				obj.x = Math.round(obj.x * 4) / 4;
				obj.y = Math.round(obj.y * 4) / 4;
			}

			if (obj.type.startsWith("room-"))
				obj.z = 10;
			else if (obj.type == "util-room")
				obj.z = -10;

			if (InputHandler.mouse.left) {
				MapHandler.isAdding = false;
			}
		}

		// Normal Operation
		if (InputHandler.mouse.hover && !MapHandler.isAdding && !SelectHandler.isEmbed) {
			SelectHandler.hoverIndex = SelectHandler._findMapElements();
			SelectHandler.isHover = SelectHandler.hoverIndex != -1;

			if (InputHandler.mouse.left && !SelectHandler.freezeSelection && !ColliderEditor.isEditing) {
				SelectHandler.selectIndex = SelectHandler.hoverIndex;
				SelectHandler.isSelected = SelectHandler.selectIndex != -1;

				if (SelectHandler.isSelected) {
					InputHandler.ui.toolbar.setEnabled(true);
					InputHandler.ui.cards.load(SelectHandler.getSelection());
				} else {
					InputHandler.ui.toolbar.setEnabled(false);
					InputHandler.ui.cards.clear();
				}
			}
		} else {
			SelectHandler.hoverIndex = -1;
			SelectHandler.isHover = false;
		}
		
	}

	static getSelection(): Object {
		if (!SelectHandler.isSelected)
			return undefined;
		return MapHandler.map.objs[SelectHandler.selectIndex];
	}

	static getHover(): Object {
		if (!SelectHandler.isHover)
			return undefined;
		return MapHandler.map.objs[SelectHandler.hoverIndex];
	}

	static _findMapElements(): number {
		let mouse = SelectHandler.cam.getMouse();
		let i = -1;
		MapHandler.map.objs.forEach((obj, index) => {
			let rect = obj.getRect();
			let d = Math.sqrt(Math.pow(obj.x - mouse.x, 2) + Math.pow(obj.y - mouse.y, 2));
			let a = Math.atan2(obj.y - mouse.y, obj.x - mouse.x) - (obj.rotation * (Math.PI / 180.0));
			let p = new Point(
				obj.x + (d * Math.cos(a)),
				obj.y + (d * Math.sin(a))
			);
			if (p.x >= rect.x - (rect.w / 2) &&
				p.y >= rect.y - (rect.h / 2) &&
				p.x <= rect.x + (rect.w / 2) &&
				p.y <= rect.y + (rect.h / 2)) {
				i = index;
			}
		});
		return i;
	}
}