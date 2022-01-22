import {Widgets} from "blessed";
import Screen = Widgets.Screen;
import BoxElement = Widgets.BoxElement;
import IKeyEventArg = Widgets.Events.IKeyEventArg;
import {DinoState, DinoStates, DinoStateType} from "./dino_states";
import {DinoRect} from "./dino_rect";
import {Sprite} from "../sprite";
import {float} from "../types";

enum Key {
    Left = "a",
    Right = "d",
    Stop = "s",
    Jump = "w",
    Lean = "x",
    Dead = "z",
}

export class Dino extends Sprite {
    private static readonly JUMP_HEIGHT = 6;
    private static readonly JUMP_DURATION = 0.5;

    private readonly _box: BoxElement;

    private static readonly ABS_SPEED: float = 40.0; // 40 symbols per second
    private readonly _pos: DinoRect;

    private readonly _states: DinoStates;
    private _state: DinoState;

    private _returnToPrevStateTimeout?: NodeJS.Timeout;

    constructor(scr: Screen) {
        super(scr);
        this._pos = new DinoRect(scr, 0);

        this._box = Dino.createBox(this._pos.column, this._pos.row, DinoRect.DEFAULT_WIDTH, DinoRect.DEFAULT_HEIGHT);
        scr.append(this._box);

        this._states = new DinoStates();
        this._state = this._states.getState("idleR");

        scr.key([Key.Left, Key.Right, Key.Stop, Key.Jump, Key.Lean, Key.Dead], this._keyPressed);
    }

    destroy() {
        super.destroy();
        if (this._returnToPrevStateTimeout) {
            clearTimeout(this._returnToPrevStateTimeout);
            this._returnToPrevStateTimeout = undefined;
        }
    }

    protected _onWindowResizeHandler(width: number, height: number): void {
        //TODO DZZ
        console.log("Dino", width, height);
    }

    private readonly _keyPressed = (ch: string, _key: IKeyEventArg) => {
        if (this._pos.jumping) return;

        const jumpAction = () => {
            if (this._pos.leaning) {
                leanAction();
            } else {
                let currentStateType = this._state.type;
                if (currentStateType === "leanIdleL") currentStateType = "idleL";
                else if (currentStateType === "leanIdleR") currentStateType = "idleR";
                else if (currentStateType === "leanRunL") currentStateType = "runL";
                else if (currentStateType === "leanRunR") currentStateType = "runR";

                this._pos.jump(Dino.JUMP_HEIGHT, Dino.JUMP_DURATION);
                this._returnToPrevStateTimeout = setTimeout(() => {
                    this._state = this._changeState(currentStateType);
                }, Dino.JUMP_DURATION * 1000);
                this._state = this._state.isLeftDirection()
                    ? this._changeState("jumpL")
                    : this._changeState("jumpR");
            }
        };

        const leanAction = () => {
            this._pos.switchLean();
            if (Math.abs(this._pos.speed) < 0.001) {
                this._state = this._state.isLeftDirection()
                    ? this._changeState(this._pos.leaning ? "leanIdleL" : "idleL")
                    : this._changeState(this._pos.leaning ? "leanIdleR" : "idleR");
            } else {
                this._state = this._state.isLeftDirection()
                    ? this._changeState(this._pos.leaning ? "leanRunL" : "runL")
                    : this._changeState(this._pos.leaning ? "leanRunR" : "runR");
            }
        };

        if (ch === Key.Left) {
            this._pos.speed = -Dino.ABS_SPEED;
            this._state = this._changeState(this._pos.leaning ? "leanRunL" : "runL");
        } else if (ch === Key.Right) {
            this._pos.speed = Dino.ABS_SPEED;
            this._state = this._changeState(this._pos.leaning ? "leanRunR" : "runR");
        } else if (ch === Key.Stop) {
            this._state = this._state.isLeftDirection()
                ? this._changeState(this._pos.leaning ? "leanIdleL" : "idleL")
                : this._changeState(this._pos.leaning ? "leanIdleR" : "idleR");
            this._pos.speed = 0;
        } else if (ch === Key.Jump) {
            jumpAction();
        } else if (ch === Key.Lean) {
            leanAction();
        } else if (ch === Key.Dead) {
            this._state = this._state.isLeftDirection()
                ? this._changeState("deadL")
                : this._changeState("deadR");
            this._pos.speed = 0;
        }
    }

    private _changeState(stateType: DinoStateType): DinoState {
        if (this._state.type === stateType) return this._state;
        this._state = this._states.getState(stateType);
        this._state.clear();
        return this._state;
    }

    update() {
        const bx = this._box;

        if (this._state.update()) {
            if (this._pos.width !== bx.width) bx.width = this._pos.width;
            if (this._pos.height !== bx.height) bx.height = this._pos.height;
            bx.setContent(this._state.frame);
        }

        this._pos.update();
        bx.left = this._pos.column;
        bx.top = this._pos.row;
    }
}