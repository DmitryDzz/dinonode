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
    private static readonly ABS_SPEED_1 = 300.0;
    private static readonly ABS_SPEED_2 = 200.0;
    private static readonly ABS_SPEED_3 = 180.0;

    private static readonly DELTA_X1 = 15;
    private static readonly DELTA_X2 = 15;

    private _startTime?: number = undefined;
    private _time1?: number = undefined;
    private _time2?: number = undefined;
    private _endTime?: number = undefined;

    private _distanceToTarget?: float = undefined;

    update(): void {
        if (this._isDestroyed || this._isDone) return;

        const time = Time.time;
        if (this._startTime === undefined) {
            this._startTime = time;
            this._distanceToTarget = Math.abs(this._endColumn - this._startColumn);
            this._time1 = time + (this._distanceToTarget + ArrivalPhase.DELTA_X1) / ArrivalPhase.ABS_SPEED_1;
            this._time2 = this._time1 + (ArrivalPhase.DELTA_X1 + ArrivalPhase.DELTA_X2) / ArrivalPhase.ABS_SPEED_2;
            this._endTime = this._time2 + ArrivalPhase.DELTA_X2 / ArrivalPhase.ABS_SPEED_3;
        }

        let currentDistance: float;
        if (time <= this._time1!) {
            currentDistance = ArrivalPhase.ABS_SPEED_1 * (time - this._startTime);
        } else if (time > this._time1! && time <= this._time2!) {
            currentDistance = this._distanceToTarget! + ArrivalPhase.DELTA_X1 -
                ArrivalPhase.ABS_SPEED_2 * (time - this._time1!);
        } else {
            currentDistance = this._distanceToTarget! - ArrivalPhase.DELTA_X2 +
                ArrivalPhase.ABS_SPEED_3 * (time - this._time2!);
        }

        if (this._startColumn < this._endColumn) {
            this._x = this._startColumn + currentDistance;
        } else {
            this._x = this._startColumn - currentDistance;
        }

        if (this._endTime !== undefined && time >= this._endTime) {
            this._isDone = true;
            this._startTime = undefined;
            this._time1 = undefined;
            this._time2 = undefined;
            this._endTime = undefined;
            this._distanceToTarget = undefined;
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