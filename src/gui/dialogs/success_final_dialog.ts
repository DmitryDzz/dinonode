import {Dialog} from "./dialog";
import {Texture} from "../../resources/dialog_resources";

export class SuccessFinalDialog extends Dialog {
    show() {
        this._initialize(Texture.Dialog.successFinal);
        super.show();
    }
}