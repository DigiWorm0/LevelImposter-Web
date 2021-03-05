export class LoopHandler {
	lastLoop: Date;
	fps: Number;
	draw: Function;


	constructor(draw_: Function) {
		this.lastLoop = new Date();
		this.fps = 0;
		this.draw = draw_;
		this._loop = this._loop.bind(this);
	}

	start(): void {
		window.requestAnimationFrame(this._loop);
	}

	_loop(): void {
		// FPS
		let thisLoop = new Date();
		this.fps = 1000.0 / (thisLoop.getTime() - this.lastLoop.getTime());
		this.lastLoop = thisLoop;

		// Draw
		this.draw();
		window.requestAnimationFrame(this._loop);
	}
}