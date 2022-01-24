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
    Jump = "w",
    Lean = "s",
    Stop = "z",
    Dead = "x",
}

export class Dino extends Sprite {
    private static readonly JUMP_HEIGHT = 8;
    private static readonly JUMP_DURATION = 0.8;
    private static readonly LEAN_DURATION = 0.6;

    private static readonly ABS_NORMAL_SPEED: float = 40.0; // symbols per second
    private static readonly ABS_FAST_SPEED: float = 52.0; // symbols per second
    private readonly _pos: DinoRect;

    private readonly _states: DinoStates;
    private _state: DinoState;

    private _returnToPrevStateTimeout?: NodeJS.Timeout;

    constructor(scr: Screen) {
        super(scr, 0, 0, DinoRect.DEFAULT_WIDTH, DinoRect.DEFAULT_HEIGHT, "#608000");
        this._pos = new DinoRect(scr, (scr.width as number - DinoRect.DEFAULT_WIDTH) / 2);

        this._box.left = this._pos.column;
        this._box.top = this._pos.row;

        this._states = new DinoStates();
        this._state = this._states.getState("idleR");

        scr.key([Key.Left, Key.Right, Key.Jump, Key.Lean, Key.Stop, Key.Dead], this._keyPressed);
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
        //console.log("Dino", width, height);
    }

    private readonly _keyPressed = (ch: string, _key: IKeyEventArg) => {
        const jumpAction = () => {
            this._pos.jump(Dino.JUMP_HEIGHT, Dino.JUMP_DURATION);
            this._returnToPrevStateTimeout = setTimeout(() => {
                const nextState: DinoStateType = this._state.isLeftDirection() ? "runL" : "runR";
                this._state = this._changeState(nextState);
            }, Dino.JUMP_DURATION * 1000);
            const jumpState: DinoStateType = this._state.isLeftDirection() ? "jumpL" : "jumpR";
            this._state = this._changeState(jumpState);
        };

        const leanAction = () => {
            this._pos.setLean(true);
            if (this._state.isLeftDirection()) {
                this._pos.speed = -Dino.ABS_FAST_SPEED;
                this._state = this._changeState("leanRunL");
            } else {
                this._pos.speed = Dino.ABS_FAST_SPEED;
                this._state = this._changeState("leanRunR");
            }
            this._returnToPrevStateTimeout = setTimeout(() => {
                this._pos.setLean(false);
                if (this._state.isLeftDirection()) {
                    this._pos.speed = -Dino.ABS_NORMAL_SPEED;
                    this._state = this._changeState("runL");
                } else {
                    this._pos.speed = Dino.ABS_NORMAL_SPEED;
                    this._state = this._changeState("runR");
                }
            }, Dino.LEAN_DURATION * 1000);
        };

        if (ch === Key.Left) {
            this._pos.speed = this._pos.leaning ? -Dino.ABS_FAST_SPEED : -Dino.ABS_NORMAL_SPEED;
            this._state = this._pos.jumping
                ? this._changeState("jumpL")
                : this._changeState(this._pos.leaning ? "leanRunL" : "runL");
        } else if (ch === Key.Right) {
            this._pos.speed = this._pos.leaning ? Dino.ABS_FAST_SPEED : Dino.ABS_NORMAL_SPEED;
            this._state = this._pos.jumping
                ? this._changeState("jumpR")
                : this._changeState(this._pos.leaning ? "leanRunR" : "runR");
        } else if (ch === Key.Jump && !this._pos.jumping && !this._pos.leaning) {
            jumpAction();
        } else if (ch === Key.Lean && !this._pos.jumping && !this._pos.leaning) {
            leanAction();
        } else if (ch === Key.Stop && !this._pos.jumping && !this._pos.leaning) {
            this._state = this._state.isLeftDirection()
                ? this._changeState(this._pos.leaning ? "leanIdleL" : "idleL")
                : this._changeState(this._pos.leaning ? "leanIdleR" : "idleR");
            this._pos.speed = 0;
        } else if (ch === Key.Dead && !this._pos.jumping && !this._pos.leaning) {
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
        if (this._destroyed) return;

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