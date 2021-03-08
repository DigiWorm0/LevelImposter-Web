export class UploadHandler {
	static callback: (file: File) => void;

	static upload(callback_: (file: File) => void) {
		$("#upload-bg").show();
		$("#upload-window").show();
		$("#upload-btn").click(UploadHandler._onUpload);

		UploadHandler.callback = callback_;
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