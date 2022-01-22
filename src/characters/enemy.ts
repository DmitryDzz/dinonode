import {Widgets} from "blessed";
import BoxElement = Widgets.BoxElement;
import Screen = Widgets.Screen;
import {onDestroyCallback, Sprite} from "../sprite";
import {float, integer, RectW} from "../types";
import {Time} from "../time";
import {State} from "../states";

export enum EnemyMoveDirection {
    MoveLeft,
    MoveRight
}

export abstract class Enemy extends Sprite {
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
    protected readonly _state: State;

    protected constructor(scr: Screen, direction: EnemyMoveDirection,
                          width: integer, height: integer, baseY: integer, absSpeed: float,
                          onDestroy?: onDestroyCallback) {
        super(scr, onDestroy);

        this._width = width;
        this._height = height;
        this._baseY = baseY;
        this._row = scr.height as number - this._height - this._baseY;
        this._column = direction === EnemyMoveDirection.MoveRight
            ? 1 - this._width
            : scr.width as number - 1;
        this._x = this._column;
        this._y = this._row;

        this._speed = direction === EnemyMoveDirection.MoveRight ? absSpeed : -absSpeed;

        this._box = Sprite.createBox(this._column, this._row, this._width, this._height);
        scr.append(this._box);

        this._state = this._createState(direction);
    }

    destroy() {
        if (this._destroyed) return;
        this._scr.remove(this._box);
        this._destroyed = true;
        super.destroy();
    }

    protected abstract _createState(direction: EnemyMoveDirection): State;

    public update(): void {
        if (this._destroyed) return;
        this._x += this._speed * Time.deltaTime;
        this._column = Math.round(this._x);

        this._state.update();
        const spriteRect: RectW = {c: this._column, r: this._row, w: this._width, h: this._height};
        const croppedSprite = Sprite.cropFrame(
            spriteRect, this._scr.width as number, this._scr.height as number, this._state.frame);
        if (croppedSprite.spriteRect && croppedSprite.frameContent) {
            this._box.top = this._row;
            this._box.left = croppedSprite.spriteRect.c;
            this._box.width = croppedSprite.spriteRect.w;

            this._box.setContent(croppedSprite.frameContent);
        } else {
            this.destroy();
        }
    }
}
