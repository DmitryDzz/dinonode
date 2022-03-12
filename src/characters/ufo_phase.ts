import {float, integer} from "../types";
import {Time} from "../time";

export type AfterPhaseCallback = () => void;

export abstract class Phase {
    protected readonly _afterPhaseCallback: AfterPhaseCallback;
    protected _isDestroyed: boolean = false;
    protected _isDone: boolean = false;

    protected readonly _startColumn: integer;
    protected readonly _endColumn: integer;
    protected _x: float;

    constructor(startColumn: integer, endColumn: integer, afterPhaseCallback: AfterPhaseCallback) {
        this._startColumn = startColumn;
        this._endColumn = endColumn;
        this._x = startColumn;
        this._afterPhaseCallback = afterPhaseCallback;
    }

    destroy() {
        if (this._isDestroyed) return;
        this._isDestroyed = true;
    }

    abstract update(): void;

    get x(): float { return this._x; }
}

export class ArrivalPhase extends Phase {
    private static readonly ABS_SPEED = 300.0;

    // private _startTime?: number = undefined;

    update(): void {
        if (this._isDestroyed || this._isDone) return;
        // if (this._startTime === undefined) this._startTime = Time.time;
        const deltaX = Time.deltaTime * ArrivalPhase.ABS_SPEED;
        if (this._startColumn < this._endColumn) {
            this._x += deltaX;
            if (this._x >= this._endColumn) {
                this._isDone = true;
            }
        } else {
            this._x -= deltaX;
            if (this._x <= this._endColumn) {
                this._isDone = true;
            }
        }
        if (this._isDone) {
            this._x = this._endColumn;
            this._afterPhaseCallback();
        }
    }
}

export class KidnappingPhase extends Phase {
    private static readonly DURATION = 2.0;

    private _startTime?: number = undefined;

    constructor(column: integer, afterPhaseCallback: AfterPhaseCallback) {
        super(column, column, afterPhaseCallback);
    }

    update(): void {
        if (this._isDestroyed || this._isDone) return;
        const time = Time.time;
        if (this._startTime === undefined) this._startTime = time;
        if (time >= this._startTime + KidnappingPhase.DURATION) {
            this._isDone = true;
            this._afterPhaseCallback();
        }
    }
}

export class DeparturePhase extends Phase {
    private static readonly ABS_SPEED = 300.0;

    update(): void {
        if (this._isDestroyed || this._isDone) return;
        const deltaX = Time.deltaTime * DeparturePhase.ABS_SPEED;
        if (this._startColumn < this._endColumn) {
            this._x += deltaX;
            if (this._x >= this._endColumn) {
                this._isDone = true;
            }
        } else {
            this._x -= deltaX;
            if (this._x <= this._endColumn) {
                this._isDone = true;
            }
        }
        if (this._isDone) {
            this._x = this._endColumn;
            this._afterPhaseCallback();
        }
    }
}