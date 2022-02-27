import {Widgets} from "blessed";
import Screen = Widgets.Screen;
import {Sprite} from "../sprite";
import {integer} from "../types";
import {HeartState, HeartStates, HeartStateType} from "./heart_states";

export class Heart extends Sprite {
    private static readonly WIDTH = 10;
    private static readonly HEIGHT = 4;

    private readonly _states: HeartStates;
    private _state: HeartState;

    constructor(scr: Screen) {
        super(scr, 1, 1, Heart.WIDTH, Heart.HEIGHT, "#000000");
        this._states = new HeartStates();
        this._state = this._states.getState("alive");
    }

    protected _onWindowResize(width: number, height: number): void {
    }

    get width(): integer {
        return Heart.WIDTH;
    }

    get height(): integer {
        return Heart.HEIGHT;
    }

    get column(): integer {
        return this._column;
    }

    set column(value: integer) {
        this._column = value;
        this._box.left = value;
    }

    get row(): integer {
        return this._row;
    }

    set row(value: integer) {
        this._row = value;
        this._box.top = value;
    }

    update(): void {
        if (this._destroyed) return;

        if (this._state.update()) {
            this._box.setContent(this._state.frame);
        }
    }

    changeState(stateType: HeartStateType): HeartState {
        if (this._state.type === stateType) return this._state;
        this._state = this._states.getState(stateType);
        this._state.clear();
        return this._state;
    }
}
