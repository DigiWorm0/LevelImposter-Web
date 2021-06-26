import { Object } from '../models/Object.js'
import { Map } from '../models/Map.js'
import { Sprite } from '../models/Sprite.js'
import { UploadHandler } from '../ui/UploadHandler.js';
import { Camera } from '../models/Camera.js';
import { InputHandler } from '../input/InputHandler.js';
import { ActionHandler } from '../input/Actions/ActionHandler.js';
import { AddAction } from '../input/Actions/AddAction.js';
import { DelAction } from '../input/Actions/DelAction.js';
import { Collider } from '../models/Collider.js';
import { SettingsHandler } from '../ui/SettingsHandler.js';

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

		MapHandler.importFromAPI();
	}

	static addCustom(url: string): number {
		if (this.isAdding)
			this.map.objs.splice(this.map.objs.length - 1, 1);
		let index = this.map.objs.push(new Object("Custom Object", this.cam.getMouse().x, this.cam.getMouse().y, "custom", url, new Sprite(url))) - 1;
		this.isAdding = true;
		this.addingIndex = index;
		ActionHandler.add(new AddAction(this.map.objs[index]));
		return index;
	}

	static addExisting(name: string, type: string): number {
		if (this.isAdding)
			this.map.objs.splice(this.map.objs.length - 1, 1);
		let index = this.map.objs.push(new Object(name, this.cam.getMouse().x, this.cam.getMouse().y, "existing", type, new Sprite("/Sprites/" + type + ".png"))) - 1;
		this.isAdding = true;
		this.addingIndex = index;
		ActionHandler.add(new AddAction(this.map.objs[index]));
		return index;
	}

	static delete(obj: Object): void {

		let index = this.map.objs.indexOf(obj);
		ActionHandler.add(new DelAction(this.map.objs[index]));
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

	static importFromAPI(): void {
		let params = new URLSearchParams(window.location.search);

		if (!params.has("id"))
			return;

		let id = params.get("id");
		let url = "/MapApi/Download/" + id;

		$.getJSON(url, (data: Map) => {
			console.log("Downloaded!");
			console.log(data);
			MapHandler.importMap(data);
		});
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
					MapHandler.importMap(json);
				}
			};
		});
	};

	static importMap(json: Map): void {
		MapHandler.map = new Map();
		MapHandler.map.name = json.name;
		MapHandler.map.btn = json.btn;
		MapHandler.map.map = json.map;
		MapHandler.map.exile = json.exile;
		InputHandler.ui.name.setName(json.name);
		for (let i = 0; i < json.objs.length; i++) {
			let o = json.objs[i];
			if (o.spriteType == "existing") {
				MapHandler.map.objs.push(new Object(o.name, o.x, o.y, "existing", o.type, new Sprite("/Sprites/" + o.type + ".png")));
			} else if (o.spriteType == "custom") {
				MapHandler.map.objs.push(new Object(o.name, o.x, o.y, "custom", o.type, new Sprite(o.type)));
			} else {
				continue;
			}

			let newO = MapHandler.map.objs[MapHandler.map.objs.length - 1];
			newO.xScale = o.xScale;
			newO.yScale = o.yScale;
			newO.z = o.z;
			newO.rotation = o.rotation;
			newO.flipX = o.flipX;
			newO.flipY = o.flipY;
			newO.targetIds = o.targetIds;
			newO.id = o.id;
			newO.onlyFromBottom = o.onlyFromBottom;
			newO.colliders = new Array<Collider>();
			o.colliders.forEach((collider) => {
				var newC = new Collider();
				newC.points = collider.points;
				newC.isClosed = collider.isClosed;
				newC.blocksLight = collider.blocksLight;
				newO.colliders.push(newC);
			});
		}

		SettingsHandler.import();
	}

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

	static getById(id): Object {
		for (let index in this.map.objs) {
			let obj = this.map.objs[index];
			if (obj.id == id)
				return obj;
		}
		return undefined;
	}
}