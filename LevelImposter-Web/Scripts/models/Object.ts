import { Sprite } from './Sprite.js';
import { Rect } from './Rect.js';
import { UnityScale } from './Constants.js';
import { Collider } from './Collider.js';
import { InputHandler } from '../input/InputHandler.js';
import { Point } from './Point.js';
import { ColliderEditor } from '../map/ColliderEditor.js';

export class Object {
	name: string;
	id: number;

	x: number;
	y: number;
	z: number;
	xScale: number;
	yScale: number;
	rotation: number;

	flipX: boolean;
	flipY: boolean;

	onlyFromBottom: boolean;

	colliders: Array<Collider>;
	targetIds: Array<number>;

	spriteType: string; // SpriteData
	type: string;

	sprite: Sprite;

	constructor(_name:string, _x: number, _y: number, _spriteType: string, _type: string, _sprite: Sprite) {
		this.name = _name;
		this.id = Math.floor((Date.now() + Math.random()) * 1000);
		this.x = _x;
		this.y = _y;
		this.z = 0;
		this.xScale = 1;
		this.yScale = 1;
		this.rotation = 0;
		this.flipX = false;
		this.flipY = false;
		this.onlyFromBottom = false;
		this.colliders = new Array<Collider>();
		this.targetIds = new Array<number>();
		this.spriteType = _spriteType;
		this.type = _type;
		this.sprite = _sprite;
	}

	/**
	 * Converts the object into a Rectangle
	 */
	getRect(): Rect {
		return {
			x: this.x,
			y: this.y,
			w: this.xScale * this.sprite.w * UnityScale,
			h: this.yScale * this.sprite.h * UnityScale
		};
	}

	/**
	 * Gets collider points In reference to the world
	 * @param index - Index of Collider
	 */
	getColliderPts(index: number): Point[] {
		if (index < 0 || index >= this.colliders.length)
			return undefined;
		let pts = this.colliders[index].points;
		let newPts = new Array<Point>();
		for (let i = 0; i < pts.length; i++) {
			let newPt = new Point();

			// World
			newPt.x = (pts[i].x * this.xScale) + this.x;
			newPt.y = (pts[i].y * this.yScale) + this.y;

			// Rotation
			let d = Math.sqrt(Math.pow(this.x - newPt.x, 2) + Math.pow(this.y - newPt.y, 2));
			let a = Math.atan2(this.y - newPt.y, this.x - newPt.x) + (this.rotation * (Math.PI / 180.0));
			newPt = new Point(
				this.x - (d * Math.cos(a)),
				this.y - (d * Math.sin(a))
			);

			newPts.push(newPt);
		}
		return newPts;
	}

	/**
	 * Adds a collider to the object
	 */
	addCollider(): void {
		this.colliders.push(new Collider(this));
		InputHandler.ui.cards.load(this);
	}

	/**
	 * Deletes collider of the index
	 * @param index - Index of the collider
	 */
	remCollider(index: number): void {
		if (index < 0 || index >= this.colliders.length)
			return;
		this.colliders.splice(index, 1);
		
		if (ColliderEditor.index == index)
			ColliderEditor.stop();
	}

	/**
	 * Clones an object
	 * @returns Object's Clone
	 */
	clone(): Object {
		let clone = new Object(this.name, this.x, this.y, this.spriteType, this.type, new Sprite(this.sprite.data));
		clone.z = this.z;
		clone.xScale = this.xScale;
		clone.yScale = this.yScale;
		clone.rotation = this.rotation;
		clone.flipX = this.flipX;
		clone.flipY = this.flipY;

		this.colliders.forEach((collider) => {
			clone.colliders.push(collider.clone());
		});

		this.targetIds.forEach((targetId) => {
			clone.targetIds.push(targetId);
		});

		return clone;
	}
};