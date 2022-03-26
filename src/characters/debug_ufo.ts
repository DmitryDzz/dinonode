import {Widgets} from "blessed";
import Screen = Widgets.Screen;
import {Sprite} from "../sprite";
import {integer} from "../types";
import {UfoState} from "./ufo_states";
import {RectW} from "../rect";
import {Texture} from "../resources/ufo_resources";

export class DebugUfo extends Sprite {
    private static readonly WIDTH = 31;
    private static readonly HEIGHT = 6;

    private readonly _state: UfoState;

    constructor(scr: Screen, column: integer, row: integer) {
        super(scr, column, row,  DebugUfo.WIDTH, DebugUfo.HEIGHT, Texture.Ufo.BASE_COLOR);
        this._state = new UfoState();
    }

    protected _onWindowResize(width: number, height: number): void {
        this.setPosition(this.column, this.row);
    }

    update(): void {
        if (this._destroyed) return;

        this._state.update();

        const spriteRect: RectW = {c: this._column, r: this._row, w: this._width, h: this._height};
        const croppedSprite = Sprite.cropFrame(
            spriteRect, this._scr.width as number, this._scr.height as number, this._state.frame);
        if (croppedSprite.spriteRect && croppedSprite.frameContent) {
            this._box.top = this._row;
            this._box.left = croppedSprite.spriteRect.c;
            this._box.width = croppedSprite.spriteRect.w;
            this._box.setContent(croppedSprite.frameContent);
        }
    }

    setPosition(column: integer, row: integer): void {
        this._column = column;
        this._row = row;
        this._box.left = column;
        this._box.top = row;
    }
}