import { MapRenderer } from './MapRenderer.js';
import { ObjectRenderer } from './ObjectRenderer.js'
import { SelectRenderer } from './SelectRenderer.js';

export class CanvasHandler {
	objRender: ObjectRenderer;
	mapRender: MapRenderer;
	selRender: SelectRenderer;

	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;

	constructor() {
		// Init Canvas
		this.canvas = document.getElementById('licanvas') as HTMLCanvasElement;
		this.ctx = this.canvas.getContext('2d');
		this.resize();
		window.onresize = this.resize;

		// Init Object Renderer
		this.objRender = new ObjectRenderer(
			this.ctx,
			this.canvas.width,
			this.canvas.height
		);

		// Init Map Renderer
		this.mapRender = new MapRenderer(
			this.objRender
		);

		this.selRender = new SelectRenderer(
			this.objRender
		);
	}

	resize() {
		this.canvas = document.getElementById('licanvas') as HTMLCanvasElement;
		this.canvas.height = window.innerHeight - 120;
		this.canvas.width = window.innerWidth;
	}

	clear() {
		this.objRender.clear();
	}
}