import {Widgets} from "blessed";
import Screen = Widgets.Screen;
import {onDestroyCallback, Sprite} from "../sprite";
import {float, integer, RectW} from "../types";
import {Time} from "../time";
import {State} from "../states";

export enum EnemyMoveDirection {
    MoveLeft,
    MoveRight,
    MoveDown
}

export abstract class Enemy extends Sprite {
    private _x: float;
    private _y: float;
    private readonly _speedX: float;
    private readonly _speedY: float;

    protected readonly _state: State;

    protected constructor(scr: Screen, direction: EnemyMoveDirection, absSpeed: float,
                          column: integer, row: integer, width: integer, height: integer,
                          onDestroy?: onDestroyCallback) {
        super(scr, column, row, width, height, onDestroy);

        this._x = this._column;
        this._y = this._row;

        if (direction === EnemyMoveDirection.MoveDown) {
            this._speedX = 0;
            this._speedY = absSpeed;
        } else {
            this._speedX = direction === EnemyMoveDirection.MoveRight ? absSpeed : -absSpeed;
            this._speedY = 0;
        }

        this._state = this._createState(direction);
    }

    destroy() {
        super.destroy();
    }

    protected abstract _createState(direction: EnemyMoveDirection): State;

    public update(): void {
        if (this._destroyed) return;
        this._x += this._speedX * Time.deltaTime;
        this._y += this._speedY * Time.deltaTime;
        this._column = Math.round(this._x);
        this._row = Math.round(this._y);

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
