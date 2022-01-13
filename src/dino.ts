import {box, Widgets} from "blessed";
import Screen = Widgets.Screen;
import BoxElement = Widgets.BoxElement;
import IKeyEventArg = Widgets.Events.IKeyEventArg;

export interface Animations {
    idle: string[];
    run: string[];
    jump: string[];
    dead: string[];
}

type integer = number;
type float = number;

class Position {
    private _x: float;
    private _y: float;
    private _column: integer;
    private _row: integer;

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
    }

    update(deltaX: float, deltaY: float) {
        this._x += deltaX;
        this._y += deltaY;
        this._column = Math.floor(this._x);
        this._row = Math.floor(this._y);
    }
}

export class Dino {
    static readonly width: integer = 20;
    static readonly height: integer = 11;

    readonly sprites: {
        left: Animations,
        right: Animations
    };

    private readonly _box: BoxElement;
    private _previousTime?: number = undefined;

    private static readonly ABS_SPEED: float = 40.0 / 1000.0; // 40 symbols per second
    private _speed: float = Dino.ABS_SPEED;
    private readonly _pos: Position;

    constructor(scr: Screen) {
        this._pos = new Position(0, scr.height as number - Dino.height);

        this._box = Dino.createBox(this._pos.column, this._pos.row);
        scr.append(this._box);

        this.sprites = Dino.createSprites();

        this._box.setContent(this.sprites.left.idle[0]);

        scr.key(["h", "j", "o"], this._keyPressed);
    }

    private readonly _keyPressed = (ch: string, _key: IKeyEventArg) => {
        if (ch === "h")
            this._speed = -Dino.ABS_SPEED;
        else if (ch === "j")
            this._speed = Dino.ABS_SPEED;
        else if (ch === "o")
            this._speed = 0;
    }

    update(time: number) {
        const deltaTime = this._previousTime ? time - this._previousTime : 0;
        this._previousTime = time;

        const bx = this._box;
        const frame = this._speed > 0 ? this.sprites.right.run : this.sprites.left.run;

        this._pos.update(this._speed * deltaTime, 0);
        bx.left = this._pos.column;

        bx.setContent((bx.left / 6 >> 0) % 2 === 0 ? frame[1] : frame[3]);
    }

    /** @internal **/
    static flip(tex: string): string {
        const rows: string[] = tex.split("\n");
        let result: string = "";
        rows.forEach(row => {
            if (result.length > 0) result += "\n";
            result += row.split("").reverse().join("");
        });
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
                    Dino._textures.idle,
                ],
                run: [
                    Dino._textures.idle,
                    Dino._textures.runA,
                    Dino._textures.idle,
                    Dino._textures.runB,
                ],
                jump: [
                    Dino._textures.idle,
                ],
                dead: [
                    Dino._textures.dead,
                ],
            },
            left: {
                idle: [
                    Dino.flip(Dino._textures.idle),
                ],
                run: [
                    Dino.flip(Dino._textures.idle),
                    Dino.flip(Dino._textures.runA),
                    Dino.flip(Dino._textures.idle),
                    Dino.flip(Dino._textures.runB),
                ],
                jump: [
                    Dino.flip(Dino._textures.idle),
                ],
                dead: [
                    Dino.flip(Dino._textures.dead),
                ],
            },
        };
    }

    private static readonly _textures = {
        idle:
            "          ▄████████▄\n" +
            "          ██▄███████\n" +
            "          ██████████\n" +
            "          █████▄▄▄  \n" +
            "█      ▗▄█████      \n" +
            "██▄  ▄████████▀█    \n" +
            "██████████████      \n" +
            " ▀███████████       \n" +
            "   ▀████████▀       \n" +
            "     ██▀ ▀█         \n" +
            "     █▄   █▄        ",
        runA:
            "          ▄████████▄\n" +
            "          ██▄███████\n" +
            "          ██████████\n" +
            "          █████▄▄▄  \n" +
            "█      ▗▄█████      \n" +
            "██▄  ▄████████▀█    \n" +
            "██████████████      \n" +
            " ▀███████████       \n" +
            "   ▀████████▀       \n" +
            "     ██▀   ▀▀▘      \n" +
            "     █▄             ",
        runB:
            "          ▄████████▄\n" +
            "          ██▄███████\n" +
            "          ██████████\n" +
            "          █████▄▄▄  \n" +
            "█      ▗▄█████      \n" +
            "██▄  ▄████████▀█    \n" +
            "██████████████      \n" +
            " ▀███████████       \n" +
            "   ▀████████▀       \n" +
            "     ▀█▄ ▀█         \n" +
            "          █▄        ",
        dead:
            "          ▄████████▄\n" +
            "          ██  ██████\n" +
            "          ██████████\n" +
            "          ████████▀▀\n" +
            "█      ▗▄█████      \n" +
            "██▄  ▄████████▀█    \n" +
            "██████████████      \n" +
            " ▀███████████       \n" +
            "   ▀████████▀       \n" +
            "     ██▀ ▀█         \n" +
            "     █▄   █▄        ",
    };
}