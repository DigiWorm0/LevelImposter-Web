export class UploadHandler {
    static upload(callback_) {
        $("#upload-bg").show();
        $("#upload-window").show();
        $("#upload-btn").click(UploadHandler._onUpload);
        UploadHandler.callback = callback_;
    }
    static _onUpload() {
        let files = $("#file-input").prop('files');
        if (files.length > 0) {
            let file = files[0];
            UploadHandler.callback(file);
        }
        $("#upload-bg").hide();
        $("#upload-window").hide();
    }
}
//# sourceMappingURL=UploadHandler.js.map