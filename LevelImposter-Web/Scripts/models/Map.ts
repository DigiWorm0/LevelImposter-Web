import { Object } from 'Object.js'

export class Map {
	name: string;

	map: string;
	btn: string;
	exile: number;

	objs: Object[];

	constructor() {
		this.name = "New Map";
		this.map = "";
		this.btn = "";
		this.exile = 2;
		this.objs = [];
	}
};