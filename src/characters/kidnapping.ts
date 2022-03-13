import {Widgets} from "blessed";
import Screen = Widgets.Screen;
import {OnDestroyCallback, Sprite} from "../sprite";
import {AfterAnimationCallback} from "../states";
import {integer} from "../types";
import {Texture} from "../resources/kidnapping_resources";
import {KidnappingLeftState, KidnappingRightState, KidnappingState} from "./kidnapping_states";
import {RectW} from "../rect";

export class Kidnapping extends Sprite {
    private static readonly WIDTH = 31;
    private static readonly HEIGHT = 20;

    private readonly _state: KidnappingState;

    constructor(scr: Screen, isLeftOriented: boolean, column: integer, onDestroy: OnDestroyCallback) {
        const row = scr.height as number - Kidnapping.HEIGHT;
        super(scr, column, row, Kidnapping.WIDTH, Kidnapping.HEIGHT, Texture.Kidnapping.BASE_COLOR, onDestroy);
        this._state = isLeftOriented
            ? new KidnappingLeftState(this._afterAnimationCallback)
            : new KidnappingRightState(this._afterAnimationCallback);
    }

    destroy() {
        super.destroy();
    }

    protected _onWindowResize(width: number, height: number): void {
        this._setPosition(this.column, this._scr.height as number - Kidnapping.HEIGHT);
    }

    update(): void {
        if (this._state.update()) {
            const spriteRect: RectW = {c: this._column, r: this._row, w: this._width, h: this._height};
            const croppedSprite = Kidnapping.cropFrame(
                spriteRect, this._scr.width as number, this._scr.height as number, this._state.frame);
            if (croppedSprite.spriteRect && croppedSprite.frameContent) {
                this._box.top = this._row;
                this._box.left = croppedSprite.spriteRect.c;
                this._box.width = croppedSprite.spriteRect.w;
                this._box.setContent(croppedSprite.frameContent);
            }
        }
    }

    private _afterAnimationCallback: AfterAnimationCallback = () => {
        this.destroy();
    };

    private _setPosition(column: integer, row: integer): void {
        this._column = column;
        this._row = row;
        this._box.left = column;
        this._box.top = row;
    }
}