import { MapHandler } from "../map/MapHandler.js";

export class SettingsHandler {

	constructor() {
		$("#settings-btn").click(this.toggleSettings.bind(this));
	}

	toggleSettings(): void {
		$("#upload-bg").show();
		$("#settings-window").show();
		$("#settings-exit").click(this.hide.bind(this));
		$("#settings-upload1").change(this.onUpload.bind(this));
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
				MapHandler.map.map = url;
				$("#settings-map").prop('src', url);
			}
		}
	}
}