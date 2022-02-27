import {Dialog} from "./dialog";
import {Texture} from "../../resources/dialog_resources";

export class PausedDialog extends Dialog {
    protected _onWindowResizeHandler(width: number, height: number): void {
        //TODO DZZ
        // console.log("PausedDialog", width, height);
    }

    show() {
        this._initialize(Texture.Dialog.paused);
        super.show();
    }
}