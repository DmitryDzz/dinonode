import {Dialog} from "./dialog";
import {Texture} from "../../resources/dialog_resources";

export class FailFinalDialog extends Dialog {
    protected _onWindowResizeHandler(width: number, height: number): void {
        //TODO DZZ
        // console.log("FailFinalDialog", width, height);
    }

    show() {
        this._initialize(Texture.Dialog.failFinal);
        super.show();
    }
}