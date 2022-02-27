import {Dialog} from "./dialog";
import {Texture} from "../../resources/dialog_resources";

export class FailFinalDialog extends Dialog {
    show() {
        this._initialize(Texture.Dialog.failFinal);
        super.show();
    }
}