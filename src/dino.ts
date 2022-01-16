import {box, Widgets} from "blessed";
import Screen = Widgets.Screen;
import BoxElement = Widgets.BoxElement;
import IKeyEventArg = Widgets.Events.IKeyEventArg;
import {State, States, StateType} from "./states";
import {float, integer, Position} from "./position";

enum Key {
    Left = "a",
    Right = "d",
    Stop = "s",
    Jump = "w",
    Dead = "x",
}

export interface Animations {
    idle: string[];
    run: string[];
    jump: string[];
    dead: string[];
}

export class Dino {
    static readonly width: integer = 20;
    static readonly height: integer = 11;

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

    constructor(scr: Screen) {
        this._pos = new Position(0, scr.height as number - Dino.height);
        this._pos.setLimits({
            c0: 0,
            r0: 0,
            c1: scr.width as number - Dino.width,
            r1: scr.height as number - Dino.height});

        this._box = Dino.createBox(this._pos.column, this._pos.row);
        scr.append(this._box);

        Dino.sprites = Dino.createSprites();

        this._states = new States();
        this._state = this._states.getState("idleR");

        scr.key([Key.Left, Key.Right, Key.Stop, Key.Jump, Key.Dead], this._keyPressed);
    }

    private _returnToPrevStateTimeout?: NodeJS.Timeout;

    private readonly _keyPressed = (ch: string, _key: IKeyEventArg) => {
        if (this._returnToPrevStateTimeout) {
            clearTimeout(this._returnToPrevStateTimeout);
            this._returnToPrevStateTimeout = undefined;
        }

        if (ch === Key.Left) {
            this._state = this._changeState("runL");
            this._pos.setSpeed(-Dino.ABS_SPEED);
        } else if (ch === Key.Right) {
            this._state = this._changeState("runR");
            this._pos.setSpeed(Dino.ABS_SPEED);
        } else if (ch === Key.Stop) {
            this._state = this._state.isLeftDirection()
                ? this._changeState("idleL")
                : this._changeState("idleR");
            this._pos.setSpeed(0);
        } else if (ch === Key.Jump) {
            const currentStateType = this._state.type;
            this._returnToPrevStateTimeout = setTimeout(() => {
                this._state = this._changeState(currentStateType);
            }, Dino.JUMP_DURATION * 1000);
            this._state = this._state.isLeftDirection()
                ? this._changeState("jumpL")
                : this._changeState("jumpR");
            this._pos.jump(Dino.height, Dino.JUMP_DURATION);
        } else if (ch === Key.Dead) {
            this._state = this._state.isLeftDirection()
                ? this._changeState("deadL")
                : this._changeState("deadR");
            this._pos.setSpeed(0);
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
            width: Dino.width,
            height: Dino.height,
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