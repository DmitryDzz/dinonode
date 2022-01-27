import {Widgets} from "blessed";
import Screen = Widgets.Screen;
import {Time} from "../time";
import {float, integer, Rect} from "../types";

interface JumpData {
    startTime: number;
    height: integer;
    duration: float;
}

export class DinoRect {
    static readonly DEFAULT_WIDTH: integer = 20;
    static readonly DEFAULT_HEIGHT: integer = 11;

    private readonly _scr: Screen;

    private _x: float;
    private _y: float;
    private readonly _baseY: float;
    private _column: integer;
    private _row: integer;

    private _speed: float;

    private _leaning: boolean = false;

    get width(): integer {
        return this._leaning ? 27 : DinoRect.DEFAULT_WIDTH;
    }

    get height(): integer {
        return this._leaning ? 7 : DinoRect.DEFAULT_HEIGHT;
    }

    get column(): integer {
        return this._column;
    }

    get row(): integer {
        return this._row;
    }

    constructor(scr: Screen, column: number) {
        this._scr = scr;
        this._column = column;
        this._row = scr.height as number - DinoRect.DEFAULT_HEIGHT;
        this._x = this._column;
        this._y = this._row;
        this._baseY = this._y + this.height;
        this._speed = 0.0;
        this._setLimits();
    }

    private _rect?: Rect;

    private _setLimits() {
        this._rect = {
            c0: 0,
            r0: 0,
            c1: this._scr.width as number - this.width,
            r1: this._scr.height as number - this.height
        };
    }

    get speed(): float {
        return this._speed;
    }

    set speed(speed: float) {
        this._speed = speed;
    }

    private _jumpData?: JumpData;

    jump(height: integer, duration: float): void {
        if (this.jumping) return;
        this._jumpData = {
            startTime: Time.time,
            height: height,
            duration: duration,
        };
        this._leaning = false;
        this._updateLimitsAndPosition();
    }

    get jumping(): boolean {
        return this._jumpData !== undefined;
    }

    get leaning(): boolean {
        return this._leaning;
    }

    setLean(value: boolean): void {
        if (this.jumping) return;
        this._leaning = value;
        this._updateLimitsAndPosition();
    }

    private _getDeltaY(): float {
        if (this._jumpData === undefined) return 0.0;

        const t: number = Time.time - this._jumpData.startTime;

        if (t >= this._jumpData.duration) {
            this._jumpData = undefined;
            return 0.0;
        }

        const h = this._jumpData.height;
        const d = this._jumpData.duration;
        return 4*h*t/d - 4*h*t*t/d/d;
    }

    private _updateLimitsAndPosition() {
        this._setLimits();
        this.update();
    }

    private _isDead: boolean = false;

    die() {
        this._isDead = true;
    }

    update() {
        if (this._isDead) return;

        this._x += this._speed * Time.deltaTime;
        this._y = this._baseY - this.height - this._getDeltaY();
        this._column = Math.round(this._x);
        this._row = Math.round(this._y);
        if (this._rect) {
            if (this._column < this._rect.c0) { this._column = this._rect.c0; this._x = this._column; }
            if (this._column > this._rect.c1) { this._column = this._rect.c1; this._x = this._column; }
            if (this._row < this._rect.r0) { this._row = this._rect.r0; this._y = this._row; }
            if (this._row > this._rect.r1) { this._row = this._rect.r1; this._y = this._row; }
        }
    }
}