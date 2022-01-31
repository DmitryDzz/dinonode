import {Dialog} from "./dialog";
import {Widgets} from "blessed";
import Screen = Widgets.Screen;
import IKeyEventArg = Widgets.Events.IKeyEventArg;

enum Key {
    Space = "space",
}

export class ContinueDialog extends Dialog {
    constructor(scr: Screen) {
        super(scr);
        scr.key(Key.Space, this._keyPressed);
    }

    destroy() {
        this._scr.unkey(Key.Space, this._keyPressed)
        super.destroy();
    }

    protected _onWindowResizeHandler(width: number, height: number): void {
        //TODO DZZ
        // console.log("ContinueDialog", width, height);
    }

    private readonly _keyPressed = (_ch: string, key: IKeyEventArg) => {
        if (key.full === Key.Space) {
            this.hide();
        }
    }

    show() {
        this._initialize(" Press Space \n to continue ");
        super.show();
    }
}