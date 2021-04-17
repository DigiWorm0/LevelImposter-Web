import { MapHandler } from "../map/MapHandler.js";

export class SettingsHandler {

	constructor() {
		$("#settings-btn").click(this.toggleSettings.bind(this));
		$("#settings-exit").click(this.hide.bind(this));
		$("#settings-upload1").change(this.onUpload.bind(this));
		$("#settings-btn-default").click(this.onDefault.bind(this));
	}

	toggleSettings(): void {
		$("#upload-bg").show();
		$("#settings-window").show();
	}

	hide(): void {
		$("#upload-bg").hide();
		$("#settings-window").hide();
	}

	onUpload(): void {
		let files = $("#settings-upload1").prop('files') as File[];
		if (files.length > 0) {
			let file = files[0];

			if (!file.type.startsWith("image/")) {
				alert("Invalid File Type. Level Imposter only supports still images");
				return;
			}

			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				let url = reader.result as string;
				MapHandler.map.btn = url;
				$("#settings-btn-img").attr('src', url);
			}
		}
	}

	static setBtn(data: string): void {
		if (data != undefined && data != "")
			$("#settings-btn-img").attr('src', data);
	}

	onDefault(): void {
		MapHandler.map.btn = "";
		$("#settings-btn-img").prop('src', "/img/custombtn.png");
	}
}