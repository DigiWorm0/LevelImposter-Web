import { Sprite } from 'Sprite.js'
import { Rect } from 'Rect.js'

export class Object {
	x: number;
	y: number;
	xScale: number;
	yScale: number;
	type: string;
	data: string;
	sprite: Sprite;

	constructor(_x:number, _y:number, _type: string, _data:string, _sprite: Sprite) {
		this.x = _x;
		this.y = _y;
		this.xScale = 1;
		this.yScale = 1;
		this.type = _type;
		this.data = _data;
		this.sprite = _sprite;
	}

	getRect(): Rect {
		return {
			x: this.x,
			y: this.y,
			w: this.xScale * this.sprite.w,
			h: this.yScale * this.sprite.h
		};
	}
};