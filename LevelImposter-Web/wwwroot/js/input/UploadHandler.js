export class UploadHandler {
    static upload(callback_) {
        $("#upload-bg").show();
        $("#upload-window").show();
        $("#upload-btn").click(UploadHandler._onUpload);
        UploadHandler.callback = callback_;
    }
    static _onUpload() {
        $("#upload-bg").hide();
        $("#upload-window").hide();
        let files = $("#file-input").prop('files');
        if (files.length > 0) {
            let file = files[0];
            UploadHandler.callback(file);
        }
    }
}
//# sourceMappingURL=UploadHandler.js.map