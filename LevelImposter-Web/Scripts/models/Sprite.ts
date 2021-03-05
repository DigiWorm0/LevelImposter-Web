export class Sprite {
	img: HTMLImageElement;
	isCustom: boolean;
	data: string;
	w: number;
	h: number;

	constructor(url: string) {
		this.data = url;
		this.img = new Image();
		this.img.onload = () => {
			this.w = this.img.width;
			this.h = this.img.height;
		};
		this.img.src = url;
	}
};