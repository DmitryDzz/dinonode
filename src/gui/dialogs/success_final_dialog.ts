import {Dialog} from "./dialog";
import {Texture} from "../../resources/dialog_resources";

export class SuccessFinalDialog extends Dialog {
    protected _onWindowResizeHandler(width: number, height: number): void {
        //TODO DZZ
        // console.log("SuccessFinalDialog", width, height);
    }

    show() {
        this._initialize(Texture.Dialog.successFinal);
        super.show();
    }
}