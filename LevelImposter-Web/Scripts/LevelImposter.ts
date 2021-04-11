import { Graphics } from './graphics/GraphicsHandler.js'
import { InputHandler } from './input/InputHandler.js';
import { ItemDB } from './map/ItemDB.js';
import { MapHandler } from './map/MapHandler.js';
import { Version } from './models/Constants.js';

class LevelImposter {
	g: Graphics;
	i: InputHandler;
	m: MapHandler;

	constructor() {
		this.i = new InputHandler();
		this.g = new Graphics();
		this.m = new MapHandler(this.g.canvas.objRender.cam);
	}
};

// Init
let li: LevelImposter;
$(function () {
	console.log("LevelImposter Editor v" + Version);
	li = new LevelImposter();
});