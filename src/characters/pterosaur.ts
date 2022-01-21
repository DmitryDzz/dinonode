import {Widgets} from "blessed";
import BoxElement = Widgets.BoxElement;
import Screen = Widgets.Screen;
import {Sprite} from "../sprite";
import {float, integer} from "../types";
import {Time} from "../time";
import {State} from "../states";
import {FlyLeft, FlyRight} from "./pterosaur_states";

interface Animations {
    fly: string[];
}

export enum EnemyMoveDirection {
    MoveLeft,
    MoveRight
}

export class Pterosaur extends Sprite {
    private _destroyed: boolean = false;
    private readonly _width: integer;
    private readonly _height: integer;
    private _x: float;
    private _y: float;
    private readonly _baseY: float;
    private _column: integer;
    private readonly _row: integer;
    private readonly _speed: float;

    private readonly _box: BoxElement;
    private readonly _state: State;

    private static readonly ABS_SPEED: float = 40.0; // 40 symbols per second

    static sprites: {
        left: Animations,
        right: Animations
    };

    constructor(scr: Screen, direction: EnemyMoveDirection) {
        super(scr);

        this._width = 23;
        this._height = 10;
        this._baseY = 6;
        this._row = scr.height as number - this._height - this._baseY;
        this._column = direction === EnemyMoveDirection.MoveLeft ? 0 : scr.width as number - this._width;
        this._x = this._column;
        this._y = this._row;

        this._speed = direction === EnemyMoveDirection.MoveLeft ? Pterosaur.ABS_SPEED : -Pterosaur.ABS_SPEED;

        this._box = Pterosaur.createBox(this._column, this._row, this._width, this._height);
        scr.append(this._box);

        Pterosaur.sprites = Pterosaur.createSprites();

        this._state = direction === EnemyMoveDirection.MoveLeft ? new FlyLeft() : new FlyRight();
    }

    destroy() {
        if (this._destroyed) return;
        this._scr.remove(this._box);
    }

    public update(): void {
        if (this._destroyed) return;
        this._x += this._speed * Time.deltaTime;
        this._column = Math.round(this._x);

        if (this._state.isFrameReady()) {
            this._box.setContent(this._state.frame);
        }

        this._box.left = this._column;
        this._box.top = this._row;
    }

    protected _onWindowResizeHandler(width: number, height: number): void {
        //TODO DZZ
        console.log("Pterosaur", width, height);
    }

    private static createSprites() {
        return {
            right: {
                fly: [
                    Pterosaur._textures.flyA,
                    Pterosaur._textures.flyB,
                ],
            },
            left: {
                fly: [
                    Sprite.flip(Pterosaur._textures.flyA),
                    Sprite.flip(Pterosaur._textures.flyB),
                ],
            },
        };
    }

    private static readonly _textures = {
        flyA:
            "        ▄              \n" +
            "        ██▄            \n" +
            "    ▄██  ███▄          \n" +
            "  ▄█████ █████▄        \n" +
            " ▀▀▀▀▀▀████████▄       \n" +
            "        ▀██████████▛▀▀▘\n" +
            "          ▀███████▛▀▀▘ \n" +
            "                       \n" +
            "                       \n" +
            "                       ",
        flyB:
            "                       \n" +
            "                       \n" +
            "    ▄██                \n" +
            "  ▄█████               \n" +
            " ▀▀▀▀▀▀████████▄       \n" +
            "        ▀██████████▛▀▀▘\n" +
            "         █████████▛▀▀▘ \n" +
            "         ███▀          \n" +
            "         ██            \n" +
            "         ▀             ",
    };
}