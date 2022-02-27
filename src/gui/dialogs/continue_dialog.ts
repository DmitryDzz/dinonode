import {Dialog} from "./dialog";
import {Widgets} from "blessed";
import IKeyEventArg = Widgets.Events.IKeyEventArg;
import {Texture} from "../../resources/dialog_resources";

enum Key {
    Space = "space",
}

export class ContinueDialog extends Dialog {
    private readonly _keyPressed = (_ch: string, key: IKeyEventArg) => {
        if (key.full === Key.Space) {
            this.hide();
        }
    }

    show() {
        this._initialize(Texture.Dialog.continue);
        this._scr.onceKey(Key.Space, this._keyPressed);
        super.show();
    }
}