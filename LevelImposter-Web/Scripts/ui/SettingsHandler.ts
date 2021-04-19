import { MapHandler } from "../map/MapHandler.js";

export class SettingsHandler {

	constructor() {
		$("#settings-btn").click(this.toggleSettings.bind(this));
		$("#settings-exit").click(this.hide.bind(this));

		$("#settings-upload1").change(this.onUpload.bind(this));
		$("#settings-btn-default").click(this.onDefault.bind(this));

		$("#settings-exile-type").change(this.onExileChange.bind(this));
	}

	onExileChange(): void {
		MapHandler.map.exile = parseInt($("#settings-exile-type").val() as string);
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

	static import(): void {
		let map = MapHandler.map;

		if (map.btn != undefined && map.btn != "")
			$("#settings-btn-img").attr('src', map.btn);

		$("#settings-exile-type").val(map.exile);
	}

	onDefault(): void {
		MapHandler.map.btn = "";
		$("#settings-btn-img").prop('src', "/img/custombtn.png");
	}
}