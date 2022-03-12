import {Dialog} from "./dialog";
import {Texture} from "../../resources/dialog_resources";
import {Time} from "../../time";

export class SuccessFinalDialog extends Dialog {
    private static readonly SHOW_DURATION = 0.5;//3;
    private _timeToHide?: number;

    show() {
        this._initialize(Texture.Dialog.successFinal);
        super.show();
        this._timeToHide = Time.time + SuccessFinalDialog.SHOW_DURATION;
    }

    hide() {
        super.hide();
        this._timeToHide = undefined;
    }

    update() {
        super.update();
        if (this._timeToHide && Time.time > this._timeToHide) {
            this.hide();
        }
    }
}