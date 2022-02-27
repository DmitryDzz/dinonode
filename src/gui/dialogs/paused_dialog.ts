import {Dialog} from "./dialog";
import {Texture} from "../../resources/dialog_resources";

export class PausedDialog extends Dialog {
    show() {
        super._initialize(Texture.Dialog.paused);
        super.show();
    }
}