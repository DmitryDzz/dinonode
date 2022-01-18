import {box, Widgets} from "blessed";
import Screen = Widgets.Screen;
import BoxElement = Widgets.BoxElement;
import IKeyEventArg = Widgets.Events.IKeyEventArg;
import {State, States, StateType} from "./states";
import {float, Position} from "./position";

enum Key {
    Left = "a",
    Right = "d",
    Stop = "s",
    Jump = "w",
    Lean = "x",
    Dead = "z",
}

export interface Animations {
    idle: string[];
    run: string[];
    jump: string[];
    leanIdle: string[];
    leanRun: string[];
    dead: string[];
}

export class Dino {
    private static readonly JUMP_HEIGHT = 6;
    private static readonly JUMP_DURATION = 0.5;

    static sprites: {
        left: Animations,
        right: Animations
    };

    private readonly _box: BoxElement;

    private static readonly ABS_SPEED: float = 40.0; // 40 symbols per second
    private readonly _pos: Position;

    private readonly _states: States;
    private _state: State;

    private _returnToPrevStateTimeout?: NodeJS.Timeout;

    constructor(scr: Screen) {
        this._pos = new Position(scr, 0, scr.height as number - Position.DEFAULT_HEIGHT);

        this._box = Dino.createBox(this._pos.column, this._pos.row);
        scr.append(this._box);

        Dino.sprites = Dino.createSprites();

        this._states = new States();
        this._state = this._states.getState("idleR");

        scr.key([Key.Left, Key.Right, Key.Stop, Key.Jump, Key.Lean, Key.Dead], this._keyPressed);
    }

    destroy() {
        if (this._returnToPrevStateTimeout) {
            clearTimeout(this._returnToPrevStateTimeout);
            this._returnToPrevStateTimeout = undefined;
        }
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

    private _changeState(stateType: StateType): State {
        if (this._state.type === stateType) return this._state;
        this._state = this._states.getState(stateType);
        this._state.clear();
        return this._state;
    }

    update() {
        const bx = this._box;

        if (this._state.isFrameReady()) {
            if (this._pos.width !== bx.width) bx.width = this._pos.width;
            if (this._pos.height !== bx.height) bx.height = this._pos.height;
            bx.setContent(this._state.frame);
        }

        this._pos.update();
        bx.left = this._pos.column;
        bx.top = this._pos.row;
    }

    /** @internal **/
    static flip(tex: string): string {
        const rows: string[] = tex.split("\n");
        let result: string = "";
        rows.forEach(row => {
            if (result.length > 0) result += "\n";
            result += row.split("").reverse().join("");
        });
        result = result
            .replace(/\u2596/g, "Б")
            .replace(/\u2597/g, "Г")
            .replace(/\u2598/g, "Д")
            .replace(/\u259d/g, "Ж")
            .replace(/\u2599/g, "Й")
            .replace(/\u259b/g, "Л")
            .replace(/\u259c/g, "П")
            .replace(/\u259f/g, "Ф");
        result = result
            .replace(/Б/g, "\u2597")
            .replace(/Г/g, "\u2596")
            .replace(/Д/g, "\u259d")
            .replace(/Ж/g, "\u2598")
            .replace(/Й/g, "\u259f")
            .replace(/Л/g, "\u259c")
            .replace(/П/g, "\u259b")
            .replace(/Ф/g, "\u2599");

        return result;
    }

    private static createBox(column: number, row: number): BoxElement {
        return box({
            width: Position.DEFAULT_WIDTH,
            height: Position.DEFAULT_HEIGHT,
            top: row,
            left: column,
            tags: true,
            style: {
                fg: 'green',
                // bg: 'magenta',
                // border: {
                //     fg: '#f0f0f0'
                // },
                // hover: {
                //     bg: 'green'
                // }
            }
        });
    }

    private static createSprites() {
        return {
            right: {
                idle: [
                    Dino._textures.idleA,
                    Dino._textures.idleB,
                ],
                run: [
                    Dino._textures.runA,
                    Dino._textures.runB,
                ],
                jump: [
                    Dino._textures.jump,
                ],
                leanIdle: [
                    Dino._textures.leanIdleA,
                    Dino._textures.leanIdleB,
                ],
                leanRun: [
                    Dino._textures.leanRunA,
                    Dino._textures.leanRunB,
                ],
                dead: [
                    Dino._textures.dead,
                ],
            },
            left: {
                idle: [
                    Dino.flip(Dino._textures.idleA),
                    Dino.flip(Dino._textures.idleB),
                ],
                run: [
                    Dino.flip(Dino._textures.runA),
                    Dino.flip(Dino._textures.runB),
                ],
                jump: [
                    Dino.flip(Dino._textures.jump),
                ],
                leanIdle: [
                    Dino.flip(Dino._textures.leanIdleA),
                    Dino.flip(Dino._textures.leanIdleB),
                ],
                leanRun: [
                    Dino.flip(Dino._textures.leanRunA),
                    Dino.flip(Dino._textures.leanRunB),
                ],
                dead: [
                    Dino.flip(Dino._textures.dead),
                ],
            },
        };
    }

    private static readonly _textures = {
        idleA:
            "          ▄████████▄\n" +
            "          ██▄███████\n" +
            "          ██████████\n" +
            "          █████▄▄▄  \n" +
            "█      ▗▄█████      \n" +
            "██▄  ▄████████▀█    \n" +
            "▜█████████████      \n" +
            " ▀███████████▘      \n" +
            "   ▀████████▘       \n" +
            "     ██▀ ▀█         \n" +
            "     █▄   █▄        ",
        idleB:
            "           ▄▄▄▄▄▄▄▄ \n" +
            "          ██▀███████\n" +
            "          ██████████\n" +
            "          █████▀▀▀▀▀\n" +
            "▟▘     ▗▄█████▀▀▀▀  \n" +
            "██▄  ▄████████▀█    \n" +
            "▜█████████████      \n" +
            " ▀███████████▘      \n" +
            "   ▀████████▘       \n" +
            "     ██▀ ▀█         \n" +
            "     █▄   █▄        ",
        runA:
            "          ▄████████▄\n" +
            "          ██▄███████\n" +
            "          ██████████\n" +
            "          █████▄▄▄  \n" +
            "█      ▗▄█████      \n" +
            "██▄  ▄████████▀█    \n" +
            "▜█████████████      \n" +
            " ▀███████████▘      \n" +
            "   ▀████████▘       \n" +
            "     ██▀   ▀▀▘      \n" +
            "     █▄             ",
        runB:
            "           ▄▄▄▄▄▄▄▄ \n" +
            "          ██▀███████\n" +
            "          ██████████\n" +
            "          █████▀▀▀▀▀\n" +
            "▟▘     ▗▄█████▀▀▀▀  \n" +
            "██▄  ▄████████▀█    \n" +
            "▜█████████████      \n" +
            " ▀███████████▘      \n" +
            "   ▀████████▘       \n" +
            "     ▀█▄ ▀█         \n" +
            "          █▄        ",
        jump:
            "          ▄████████▄\n" +
            "          ██▄███████\n" +
            "          ██████████\n" +
            "          █████▄▄▄  \n" +
            "█      ▗▄█████      \n" +
            "██▄  ▄████████▀█    \n" +
            "▜█████████████      \n" +
            " ▀███████████▘      \n" +
            "   ▀████████▘       \n" +
            "     ██▀ █▛         \n" +
            "     ▜▙  ▜▙         ",
        leanIdleA:
            "▖                 ▄▄▄▄▄▄▄▄ \n" +
            "█▄▄    ▄▄▄▄▄▄▄  ▄██▀███████\n" +
            "▀██████████████████████████\n" +
            "  ▀█████████████▀█████▀▀▀▀▀\n" +
            "    ▜███████▀▀█▘  ▀▀▀▀▀▀▀  \n" +
            "      ██▀ ▀█  ▀▀           \n" +
            "      █▄   █▄              ",
        leanIdleB:
            "▗                ▄████████▄\n" +
            "█▄▄    ▄▄▄▄▄▄▄  ▟██▄███████\n" +
            "▀██████████████████████████\n" +
            "  ▀█████████████▀▀████▄▄▄  \n" +
            "    ▜███████▀▀█▘           \n" +
            "      ██▀ ▀█  ▀▀           \n" +
            "      █▄   █▄              ",
        leanRunA:
            "▖                 ▄▄▄▄▄▄▄▄ \n" +
            "█▄▄    ▄▄▄▄▄▄▄  ▄██▀███████\n" +
            "▀██████████████████████████\n" +
            "  ▀█████████████▀█████▀▀▀▀▀\n" +
            "    ▜███████▀▀█▘  ▀▀▀▀▀▀▀  \n" +
            "    █▄  ██▀   ▀▀           \n" +
            "        █▄                 ",
        leanRunB:
            "▗                ▄████████▄\n" +
            "█▄▄    ▄▄▄▄▄▄▄  ▟██▄███████\n" +
            "▀██████████████████████████\n" +
            "  ▀█████████████▀▀████▄▄▄  \n" +
            "    ▜█████▛▀▀▀█▘           \n" +
            "    ██▀  ▀█▄▄ ▀▀           \n" +
            "    █▄                     ",
        dead:
            "          ▄████████▄\n" +
            "          ██  ██████\n" +
            "          ██████████\n" +
            "          ████████▀▀\n" +
            "█      ▗▄█████      \n" +
            "██▄  ▄████████▀█    \n" +
            "▜█████████████      \n" +
            " ▀███████████▘      \n" +
            "   ▀████████▘       \n" +
            "     ██▀ ▀█         \n" +
            "     █▄   █▄        ",
    };
}