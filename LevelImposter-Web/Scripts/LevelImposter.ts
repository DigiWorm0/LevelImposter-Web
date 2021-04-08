import { Graphics } from './graphics/GraphicsHandler.js'
import { InputHandler } from './input/InputHandler.js';
import { ItemDB } from './map/ItemDB.js';
import { MapHandler } from './map/MapHandler.js';

class LevelImposter {
	g: Graphics;
	i: InputHandler;
	m: MapHandler;

	constructor() {
		this.i = new InputHandler();
		this.g = new Graphics();
		this.m = new MapHandler(this.g.canvas.objRender.cam);

		/*
		Object.keys(ItemDB.Tasks).forEach((key, index) => {
			var i = MapHandler.addExisting(key, key);
			MapHandler.map.objs[i].x = index * 2;
			MapHandler.map.objs[i].y = 0;
			MapHandler.isAdding = false;
		});*/
	}
};

// Init
let li: LevelImposter;
$(function () {
	li = new LevelImposter();
});