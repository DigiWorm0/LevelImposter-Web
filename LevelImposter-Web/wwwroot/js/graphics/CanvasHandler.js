import { GridRenderer } from './GridRenderer.js';
import { MapRenderer } from './MapRenderer.js';
import { ObjectRenderer } from './ObjectRenderer.js';
import { SelectRenderer } from './SelectRenderer.js';
export class CanvasHandler {
    constructor() {
        // Init Canvas
        this.canvas = document.getElementById('licanvas');
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.onresize = this.resize.bind(this);
        // Init Object Renderer
        this.objRender = new ObjectRenderer(this.ctx, this.canvas.width, this.canvas.height);
        // Init Map Renderer
        this.mapRender = new MapRenderer(this.objRender);
        this.selRender = new SelectRenderer(this.objRender);
        this.gridRender = new GridRenderer(this.objRender);
    }
    resize() {
        this.canvas = document.getElementById('licanvas');
        this.canvas.height = window.innerHeight - 120;
        this.canvas.width = window.innerWidth;
        if (this.objRender) {
            this.objRender.canvasWidth = this.canvas.width;
            this.objRender.canvasHeight = this.canvas.height;
            this.objRender.cam.resize(this.canvas.width, this.canvas.height);
        }
    }
    clear() {
        this.objRender.clear();
    }
}
//# sourceMappingURL=CanvasHandler.js.map