import {Dialog} from "./dialog";
import {Texture} from "../../resources/dialog_resources";

export class TheEndDialog extends Dialog {
    show() {
        super._initialize(Texture.Dialog.theEnd);
        super.show();
    }
}