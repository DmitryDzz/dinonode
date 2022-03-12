import {Widgets} from "blessed";
import Screen = Widgets.Screen;
import {Sprite} from "../sprite";
import {integer} from "../types";
import {Dino} from "./dino";
import {UfoState} from "./ufo_state";
import {RectW} from "../rect";

export class Ufo extends Sprite {
    private static readonly WIDTH = 31;
    private static readonly HEIGHT = 6;

    private readonly _dino: Dino;

    private readonly _state: UfoState;

    constructor(scr: Screen, dino: Dino) {
        const row: integer = 10;
        const column: integer = Math.round(dino.column + (dino.width - Ufo.WIDTH) / 2);
        super(scr, column, row,  Ufo.WIDTH, Ufo.HEIGHT, "#6897ed");
        this._dino = dino;
        this._state = new UfoState();
        console.log(scr.width as number, scr.height as number, row, column);
    }

    protected _onWindowResize(width: number, height: number): void {
        //TODO DZZ
    }

    update(): void {
        if (this._destroyed) return;
        this._state.update();

        const spriteRect: RectW = {c: this._column, r: this._row, w: this._width, h: this._height};
        const croppedSprite = Ufo.cropFrame(
            spriteRect, this._scr.width as number, this._scr.height as number, this._state.frame);
        if (croppedSprite.spriteRect && croppedSprite.frameContent) {
            this._box.top = this._row;
            this._box.left = croppedSprite.spriteRect.c;
            this._box.width = croppedSprite.spriteRect.w;

            this._box.setContent(croppedSprite.frameContent);
        } else {
            this.destroy();
        }
    }
}