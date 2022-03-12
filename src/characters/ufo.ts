import {Widgets} from "blessed";
import Screen = Widgets.Screen;
import {Sprite} from "../sprite";
import {float, integer} from "../types";
import {Dino} from "./dino";
import {UfoState} from "./ufo_state";
import {RectW} from "../rect";
import {ArrivalPhase, DeparturePhase, KidnappingPhase, Phase} from "./ufo_phase";
import {Texture} from "../resources/ufo_resources";

export class Ufo extends Sprite {
    private static readonly WIDTH = 31;
    private static readonly HEIGHT = 6;
    private static readonly ALTITUDE = 26;

    private readonly _dino: Dino;

    private readonly _state: UfoState;

    private _x: float;
    private _y: float;

    private readonly _outsideColumn: integer;
    private readonly _aboveDinoColumn: integer;
    private _phase: Phase;

    constructor(scr: Screen, dino: Dino) {
        const row: integer = Math.round(scr.height as number) - Ufo.ALTITUDE;
        const targetColumn: integer = Math.round(dino.column + (dino.width - Ufo.WIDTH) / 2);
        const isLeftDirection = dino.column + (dino.width / 2) > (scr.width as number) / 2;
        const startColumn: integer = isLeftDirection ? -Ufo.WIDTH : Math.round(scr.width as number);

        super(scr, targetColumn, row,  Ufo.WIDTH, Ufo.HEIGHT, Texture.Ufo.BASE_COLOR);
        this._dino = dino;
        this._state = new UfoState();
        this._x = targetColumn;
        this._y = row;

        this._outsideColumn = startColumn;
        this._aboveDinoColumn = targetColumn;
        this._phase = new ArrivalPhase(startColumn, targetColumn, this._startKidnappingPhase);
    }

    protected _onWindowResize(width: number, height: number): void {
        this._setPosition(this.column, Math.round(this._scr.height as number) - Ufo.ALTITUDE);
    }

    update(): void {
        if (this._destroyed) return;
        this._phase.update();
        this._state.update();

        const spriteRect: RectW = {c: this._column, r: this._row, w: this._width, h: this._height};
        const croppedSprite = Ufo.cropFrame(
            spriteRect, this._scr.width as number, this._scr.height as number, this._state.frame);
        if (croppedSprite.spriteRect && croppedSprite.frameContent) {
            this._box.top = this._row;
            this._box.left = croppedSprite.spriteRect.c;
            this._box.width = croppedSprite.spriteRect.w;
            this._box.setContent(croppedSprite.frameContent);
        }
    }

    private _setPosition(column: integer, row: integer): void {
        this._column = column;
        this._row = row;
        this._x = column;
        this._y = row;
        this._box.left = column;
        this._box.top = row;
    }

    private _startKidnappingPhase = () => {
        this._phase.destroy();
        this._phase = new KidnappingPhase(this._aboveDinoColumn, this._startDeparturePhase);
    }

    private _startDeparturePhase = () => {
        this._phase.destroy();
        this._phase = new DeparturePhase(this._aboveDinoColumn, this._outsideColumn, this._finalDialogPhase);
    }

    private _finalDialogPhase = () => {
        this._phase.destroy();
        // show "The end" dialog...
        //...
        this.destroy();
    }
}