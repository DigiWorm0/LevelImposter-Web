import { VentGenerator } from '../cards/VentGenerator.js';
import { MinWidth } from '../models/Constants.js';
import { ColliderRenderer } from './ColliderRenderer.js';
import { GridRenderer } from './GridRenderer.js';
import { MapRenderer } from './MapRenderer.js';
import { ObjectRenderer } from './ObjectRenderer.js'
import { RangeRenderer } from './RangeRenderer.js';
import { SelectRenderer } from './SelectRenderer.js';
import { TargetRenderer } from './TargetRenderer.js';

export class CanvasHandler {
	objRender:  ObjectRenderer;
	mapRender:  MapRenderer;
	selRender: SelectRenderer;
	gridRender: GridRenderer;
	targetRender: TargetRenderer;
	colRender: ColliderRenderer;
	rangeRender: RangeRenderer;

	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;

	isEmbed: boolean;

	constructor() {
		// Embed
		let params = new URLSearchParams(window.location.search);
		this.isEmbed = params.has("hidecontrols");

		// Init Canvas
		this.canvas = document.getElementById('licanvas') as HTMLCanvasElement;
		this.ctx = this.canvas.getContext('2d');
		this.resize();
		window.onresize = this.resize.bind(this);

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

		this.gridRender = new GridRenderer(
			this.objRender
		);

		this.colRender = new ColliderRenderer(
			this.objRender
		);

		this.targetRender = new TargetRenderer(
			this.objRender
		);

		this.rangeRender = new RangeRenderer(
			this.objRender
		);
	}

	resize() {
		this.canvas = document.getElementById('licanvas') as HTMLCanvasElement;
		this.canvas.height = window.innerHeight - (this.isEmbed ? 0 : 120);
		this.canvas.width = window.innerWidth;
		if (this.objRender) {
			this.objRender.canvasWidth = this.canvas.width;
			this.objRender.canvasHeight = this.canvas.height;
			this.objRender.cam.resize(this.canvas.width, this.canvas.height);
		}

		let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
		if ((window.innerWidth < MinWidth || isMobile) && !this.isEmbed) {
			$("#undersize").show();
		} else {
			$("#undersize").hide();
		}
	}

	clear() {
		this.objRender.clear();
	}
}