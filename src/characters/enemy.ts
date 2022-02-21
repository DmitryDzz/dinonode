import {Widgets} from "blessed";
import Screen = Widgets.Screen;
import {OnDestroyCallback, Sprite} from "../sprite";
import {float, integer} from "../types";
import {Rect, RectW} from "../rect";
import {Time} from "../time";
import {State} from "../states";
import {Options} from "../options";
import BoxElement = Widgets.BoxElement;

export enum EnemyMoveDirection {
    MoveLeft,
    MoveRight,
    MoveDown
}

export enum EnemyType {
    Unknown,
    Comet,
    Raptor,
    Pterosaur
}

export abstract class Enemy extends Sprite {
    readonly enemyType: EnemyType;

    private _x: float;
    private _y: float;
    private _speedX: float;
    private _speedY: float;

    private readonly _absSpeed: float;
    protected _state: State;

    protected readonly _localCollider: Rect = new Rect({c0: 0, r0: 0, c1: 0, r1: 0});
    readonly collider: Rect = new Rect({c0: 0, r0: 0, c1: 0, r1: 0});
    private _debugColliderBox?: BoxElement;

    protected constructor(scr: Screen, enemyType: EnemyType, direction: EnemyMoveDirection, absSpeed: float,
                          column: integer, row: integer, width: integer, height: integer,
                          baseColor: string, onDestroy?: OnDestroyCallback) {
        super(scr, column, row, width, height, baseColor, onDestroy);

        this.enemyType = enemyType;
        this._absSpeed = absSpeed;
        this._x = this._column;
        this._y = this._row;
        this._speedX = 0;
        this._speedY = 0;
        this._state = this.changeState(direction);
    }

    destroy() {
        super.destroy();
    }

    protected abstract _getState(direction: EnemyMoveDirection): State;

    changeState(direction: EnemyMoveDirection) {
        if (direction === EnemyMoveDirection.MoveDown) {
            this._speedX = 0;
            this._speedY = this._absSpeed;
        } else {
            this._speedX = direction === EnemyMoveDirection.MoveRight ? this._absSpeed : -this._absSpeed;
            this._speedY = 0;
        }

        this._state = this._getState(direction);
        this._setLocalCollider(direction);
        return this._state;
    }

    update(): void {
        // console.log(this._column, this._row);
        if (this._destroyed) return;
        this._x += this._speedX * Time.deltaTime;
        this._y += this._speedY * Time.deltaTime;
        this._column = Math.round(this._x);
        this._row = Math.round(this._y);

        this._state.update();

        this._updateCollider();
        if (Options.debug.showColliders) {
            this._debugUpdateColliderBoxes();
        }

        const spriteRect: RectW = {c: this._column, r: this._row, w: this._width, h: this._height};
        const croppedSprite = Enemy.cropFrame(
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

    protected abstract _setLocalCollider(direction: EnemyMoveDirection): void;

    private _updateCollider(): void {
        this.collider.c0 = this._column + this._localCollider.c0;
        this.collider.c1 = this._column + this._localCollider.c1;
        this.collider.r0 = this._row + this._localCollider.r0;
        this.collider.r1 = this._row + this._localCollider.r1;
    }

    private _debugUpdateColliderBoxes() {
        if (this._debugColliderBox === undefined) {
            this._debugColliderBox = Enemy.createBox(0, 0, 0, 0, "#000000", "#882200");
            this._scr.append(this._debugColliderBox);
        }

        this._debugColliderBox.left = this.collider.c0;
        this._debugColliderBox.top = this.collider.r0;
        this._debugColliderBox.width = this.collider.c1 - this.collider.c0 + 1;
        this._debugColliderBox.height = this.collider.r1 - this.collider.r0 + 1;
    }

    checkColliders(enemies: Enemy[]) {
        //TODO DZZ Enumerate comets only.
    }

    abstract onCollision(other: Sprite): void;
}
