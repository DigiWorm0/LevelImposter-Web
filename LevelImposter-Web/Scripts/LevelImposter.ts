import { Graphics } from './graphics/GraphicsHandler.js'
import { InputHandler } from './input/InputHandler.js';
import { MapHandler } from './map/MapHandler.js';

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
	console.log("LevelImposter Editor");
	li = new LevelImposter();
});