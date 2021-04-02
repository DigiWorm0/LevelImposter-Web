import { Object } from '../models/Object.js'
import { Map } from '../models/Map.js'
import { Sprite } from '../models/Sprite.js'
import { UploadHandler } from '../input/UploadHandler.js';
import { Camera } from '../models/Camera.js';
import { InputHandler } from '../input/InputHandler.js';

export class MapHandler {
	static map: Map;
	static cam: Camera;
	static isAdding: boolean;
	static addingIndex: number;

	constructor(_cam: Camera) {
		MapHandler.map = new Map();
		MapHandler.cam = _cam;
		$("#export").click(MapHandler.export);
		$("#import").click(MapHandler.import);
		$("#add-img").click(MapHandler.addImg);
	}

	static addCustom(url: string): number {
		if (this.isAdding)
			this.map.objs.splice(this.map.objs.length - 1, 1);
		let index = this.map.objs.push(new Object("Custom Object", this.cam.getMouse().x, this.cam.getMouse().y, "custom", url, new Sprite(url))) - 1;
		this.isAdding = true;
		this.addingIndex = index;
		return index;
	}

	static addExisting(name: string, type: string): number {
		if (this.isAdding)
			this.map.objs.splice(this.map.objs.length - 1, 1);
		let index = this.map.objs.push(new Object(name, this.cam.getMouse().x, this.cam.getMouse().y, "existing", type, new Sprite("/Sprites/" + type + ".png"))) - 1;
		this.isAdding = true;
		this.addingIndex = index;
		return index;
	}

	static delete(obj: Object): void {
		let index = this.map.objs.indexOf(obj);
		if (index >= 0)
			this.map.objs.splice(index, 1);
	}

	static export(): void {
		// Turn Map into a String
		function replacer(key: string, value: any): any {
			if (key == "sprite")
				return undefined;
			else
				return value;
		}
		let data = JSON.stringify(MapHandler.map, replacer);

		// Download
		let element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
		element.setAttribute('download', MapHandler.map.name + ".json");
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}

	static import(): void {
		UploadHandler.upload("Map", "application/json", (file) => {
			if (file.type != "application/json") {
				alert("Invalid File Type. Level Imposter only supports JSON files as maps");
				return;
			}
			let reader = new FileReader();
			reader.readAsText(file);
			reader.onload = () => {
				let json = JSON.parse(reader.result as string) as Map;
				let ready = confirm("Are you sure you want to import this map? (Any unsaved data will be lost)");
				if (ready == true) {
					MapHandler.map = new Map();
					MapHandler.map.name = json.name;
					InputHandler.ui.name.setName(json.name);
					for (let i = 0; i < json.objs.length; i++) {
						let o = json.objs[i];
						if (o.spriteType == "existing") {
							// Init
							MapHandler.map.objs.push(new Object(o.name, o.x, o.y, "existing", o.type, new Sprite("/Sprites/" + o.type + ".png")));

							// Other Props
							let newO = MapHandler.map.objs[MapHandler.map.objs.length - 1];
							newO.xScale = o.xScale;
							newO.yScale = o.yScale;
							newO.z = o.z;
							newO.rotation = o.rotation;
							newO.colliders = o.colliders;
						} else if (o.spriteType == "custom") {
							// Init
							MapHandler.map.objs.push(new Object(o.name, o.x, o.y, "existing", o.type, new Sprite(o.type)));

							// Other Props
							let newO = MapHandler.map.objs[MapHandler.map.objs.length - 1];
							newO.xScale = o.xScale;
							newO.yScale = o.yScale;
							newO.z = o.z;
							newO.rotation = o.rotation;
							newO.colliders = o.colliders;
						}
					}
				}
			};
		});
	};

	static addImg(): void {
		UploadHandler.upload("Image", "image/*", (file) => {
			if (!file.type.startsWith("image/")) {
				alert("Invalid File Type. Level Imposter only supports still images");
				return;
			}
			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				let url = reader.result as string;
				MapHandler.addCustom(url);
			}
		});
	}
}