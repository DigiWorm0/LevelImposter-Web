import { NameHandler } from './NameHandler.js';
import { PanelHandler } from './PanelHandler.js';
import { PropertiesHandler } from './PropertiesHandler.js';
export class UIHandler {
    constructor() {
        $("body").addClass("no-overflow");
        window.onbeforeunload = () => {
            return "";
        };
        this.panels = new PanelHandler();
        this.name = new NameHandler();
        this.props = new PropertiesHandler();
    }
}
//# sourceMappingURL=UIHandler.js.map