import { Object } from 'Object.js'

export class Map {
	name: string;
	map: string;
	objs: Object[];

	constructor() {
		this.name = "New Map";
		this.map = "";
		this.objs = [];
	}
};