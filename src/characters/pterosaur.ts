import {Widgets} from "blessed";
import {State} from "../states";
import {FlyLeft, FlyRight} from "./pterosaur_states";
import {Enemy, EnemyMoveDirection} from "./enemy";
import {float, integer} from "../types";
import {OnDestroyCallback, Sprite} from "../sprite";
import Screen = Widgets.Screen;

export class Pterosaur extends Enemy {
    private static readonly ABS_SPEED: float = 50.0; // symbols per second
    private static readonly WIDTH: integer = 23;
    private static readonly HEIGHT: integer = 10;
    private static readonly BASE_Y: integer = 7;

    private static readonly _flyLeftState = new FlyLeft();
    private static readonly _flyRightState = new FlyRight();

    constructor(scr: Screen, direction: EnemyMoveDirection, onDestroy?: OnDestroyCallback) {
        const row: integer = scr.height as number - Pterosaur.HEIGHT - Pterosaur.BASE_Y;
        const column: integer = direction === EnemyMoveDirection.MoveRight
            ? 1 - Pterosaur.WIDTH
            : scr.width as number - 1;
        super(scr, direction, Pterosaur.ABS_SPEED, column, row, Pterosaur.WIDTH, Pterosaur.HEIGHT,
            "#B04000", onDestroy);
    }

    protected _getState(direction: EnemyMoveDirection): State {
        return direction === EnemyMoveDirection.MoveLeft ? Pterosaur._flyLeftState : Pterosaur._flyRightState;
    }

    protected _onWindowResizeHandler(width: number, height: number): void {
        //TODO DZZ
        console.log("Pterosaur", width, height);
    }

    protected _setLocalCollider(direction: EnemyMoveDirection): void {
        const w = 22;
        this._localCollider.c0 = direction === EnemyMoveDirection.MoveLeft ? 0 : w - 19;
        this._localCollider.r0 = 3;
        this._localCollider.c1 = direction === EnemyMoveDirection.MoveLeft ? 19 : w;
        this._localCollider.r1 = 6;
    }

    onCollision(other: Sprite) {
        if (this._column < other.column) {
            this.changeState(EnemyMoveDirection.MoveRight);
        } else if (this._column >= other.column) {
            this.changeState(EnemyMoveDirection.MoveLeft);
        }
    }
}