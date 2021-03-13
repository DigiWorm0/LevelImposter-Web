import { ColliderEditor } from '../map/ColliderEditor.js';
import { MapHandler } from '../map/MapHandler.js';
import { Camera } from '../models/Camera.js';
import { Object } from '../models/Object.js';
import { InputHandler } from './InputHandler.js';

export class SelectHandler {
	freezeSelection: boolean;
	isSelected: boolean;
	isHover: boolean;
	hoverIndex: number;
	selectIndex: number;
	cam: Camera;

	constructor(_cam: Camera) {
		this.freezeSelection = false;
		this.isSelected = false;
		this.isHover = false;
		this.hoverIndex = -1;
		this.selectIndex = -1;
		this.cam = _cam;
	}

	update(): void {
		if (InputHandler.ui.props.toolbar.deletedSelection) {
			InputHandler.ui.props.toolbar.deletedSelection = false;
			this.isSelected = false;
		}
		if (InputHandler.mouse.hover) {
			this.hoverIndex = this._findMapElements();
			this.isHover = this.hoverIndex != -1;

			if (InputHandler.mouse.left && !this.freezeSelection && !ColliderEditor.isEditing) {
				this.selectIndex = this.hoverIndex;
				this.isSelected = this.selectIndex != -1;

				if (this.isSelected) {
					InputHandler.ui.props.load(this.getSelection());
				} else {
					InputHandler.ui.props.clear();
				}
			}
		} else {
			this.hoverIndex = -1;
			this.isHover = false;
		}
		
	}

	getSelection(): Object {
		if (!this.isSelected)
			return undefined;
		return MapHandler.map.objs[this.selectIndex];
	}

	getHover(): Object {
		if (!this.isHover)
			return undefined;
		return MapHandler.map.objs[this.hoverIndex];
	}

	_findMapElements(): number {
		let mouse = this.cam.getMouse();
		let i = -1;
		MapHandler.map.objs.forEach((obj, index) => {
			let rect = obj.getRect();
			if (mouse.x >= rect.x - (rect.w / 2) &&
				mouse.y >= rect.y - (rect.h / 2) &&
				mouse.x <= rect.x + (rect.w / 2) &&
				mouse.y <= rect.y + (rect.h / 2)) {
				i = index;
			}
		});
		return i;
	}
}