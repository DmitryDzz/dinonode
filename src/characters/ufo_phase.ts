// type PhaseName = "arrival" | "kidnapping" | "departure";

import {float, integer} from "../types";

export type AfterPhaseCallback = () => void;

export abstract class Phase {
    protected readonly _afterPhaseCallback: AfterPhaseCallback;
    protected _isDestroyed: boolean = false;

    private _x: float;

    constructor(startColumn: integer, endColumn: integer, afterPhaseCallback: AfterPhaseCallback) {
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
    destroy() {
        super.destroy();
    }

    update(): void {
    }
}

export class KidnappingPhase extends Phase {
    constructor(column: integer, afterPhaseCallback: AfterPhaseCallback) {
        super(column, column, afterPhaseCallback);
    }

    destroy() {
        super.destroy();
    }

    update(): void {
    }
}

export class DeparturePhase extends Phase {
    destroy() {
        super.destroy();
    }

    update(): void {
    }
}