import { MapHandler } from '../map/MapHandler.js';
export class NameHandler {
    constructor() {
        $("#map-name").click(this.beginRename);
        $("#map-name-input").focusout(this.endRename);
    }
    beginRename() {
        // Hide Text
        $("#map-name").hide();
        // Show Input
        $("#map-name-input").show();
        $("#map-name-input").select();
    }
    endRename() {
        // Hide Input
        $("#map-name-input").hide();
        // Set Text
        let name = $("#map-name-input").val();
        MapHandler.map.name = name;
        $("#map-name").text(name);
        // Show Text
        $("#map-name").show();
    }
}
//# sourceMappingURL=NameHandler.js.map