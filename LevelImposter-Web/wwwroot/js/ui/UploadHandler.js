export class UploadHandler {
    static upload(name, type, callback_) {
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
        let files = $("#file-input").prop('files');
        if (files.length > 0) {
            let file = files[0];
            UploadHandler.callback(file);
        }
    }
}
//# sourceMappingURL=UploadHandler.js.map