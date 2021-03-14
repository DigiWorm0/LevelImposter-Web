export class UploadHandler {
	static callback: (file: File) => void;

	static upload(name: string, type:string, callback_: (file: File) => void) {
		$("#upload-bg").show();
		$("#upload-window").show();
		$("#upload-name").text("Upload " + name);
		$("#file-input").attr("accept", type);
		$("#upload-exit").click(UploadHandler.hide);
		$("#upload-btn").click(UploadHandler._onUpload);
		UploadHandler.callback = undefined;
		UploadHandler.callback = callback_;
	}

	static hide() {
		$("#upload-bg").hide();
		$("#upload-window").hide();
	}

	static _onUpload() {
		$("#upload-bg").hide();
		$("#upload-window").hide();

		let files = $("#file-input").prop('files') as File[];
		if (files.length > 0) {
			let file = files[0];
			UploadHandler.callback(file);
		}
	}
}