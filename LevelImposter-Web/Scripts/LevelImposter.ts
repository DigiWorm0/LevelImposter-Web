import { Graphics } from './graphics/GraphicsHandler.js'
import { InputHandler } from './input/InputHandler.js';
import { MapHandler } from './map/MapHandler.js';

class LevelImposter {
	g: Graphics;
	i: InputHandler;
	m: MapHandler;

	constructor() {
		this.g = new Graphics();
		this.m = new MapHandler(this.g.canvas.objRender.cam);
		this.i = new InputHandler();
	}
};

// Init
let li: LevelImposter;
$(function () {
	li = new LevelImposter();
});