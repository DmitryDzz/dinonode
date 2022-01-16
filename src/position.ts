import {Time} from "./time";

export type integer = number;
export type float = number;
export interface Rect { c0: integer, r0: integer, c1: integer, r1: integer }

interface JumpData {
    startTime: number;
    height: integer;
    duration: float;
}

export class Position {
    private _x: float;
    private _y: float;
    private _baseY: float;
    private _column: integer;
    private _row: integer;

    private _speed: float;

    get column(): integer {
        return this._column;
    }

    get row(): integer {
        return this._row;
    }

    constructor(column: number, row: number) {
        this._column = column;
        this._row = row;
        this._x = this._column;
        this._y = this._row;
        this._baseY = this._y;
        this._speed = 0.0;
    }

    private _rect?: Rect;

    setLimits(rect: Rect) {
        this._rect = rect;
    }

    setSpeed(speed: float) {
        this._speed = speed;
    }

    private _jumpData?: JumpData;

    jump(height: integer, duration: float) {
        if (this._jumpData) return;
        this._jumpData = {
            startTime: Time.time,
            height: height,
            duration: duration,
        };
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

    update() {
        this._x += this._speed * Time.deltaTime;
        this._y = this._baseY - this._getDeltaY();
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