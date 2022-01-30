import {Widgets} from "blessed";
import {State} from "../states";
import {Enemy, EnemyMoveDirection} from "./enemy";
import {float, integer} from "../types";
import {RunLeft, RunRight} from "./raptor_states";
import {OnDestroyCallback, Sprite} from "../sprite";
import Screen = Widgets.Screen;

export class Raptor extends Enemy {
    private static readonly ABS_SPEED: float = 50.0; // symbols per second
    private static readonly WIDTH: integer = 28;
    private static readonly HEIGHT: integer = 8;

    private static readonly _runLeftState = new RunLeft();
    private static readonly _runRightState = new RunRight();

    constructor(scr: Screen, direction: EnemyMoveDirection, onDestroy?: OnDestroyCallback) {
        const row: integer = scr.height as number - Raptor.HEIGHT;
        const column: integer = direction === EnemyMoveDirection.MoveRight
            ? 1 - Raptor.WIDTH
            : scr.width as number - 1;
        super(scr, direction, Raptor.ABS_SPEED, column, row, Raptor.WIDTH, Raptor.HEIGHT, "#608080", onDestroy);
    }

    protected _getState(direction: EnemyMoveDirection): State {
        return direction === EnemyMoveDirection.MoveLeft ? Raptor._runLeftState : Raptor._runRightState;
    }

    protected _onWindowResizeHandler(width: number, height: number): void {
        //TODO DZZ
        console.log("Raptor", width, height);
    }

    protected _setLocalCollider(direction: EnemyMoveDirection): void {
        const w = 27;
        this._localCollider.c0 = direction === EnemyMoveDirection.MoveLeft ? 1 : w - 23;
        this._localCollider.r0 = 3;
        this._localCollider.c1 = direction === EnemyMoveDirection.MoveLeft ? 23 : w - 1;
        this._localCollider.r1 = 7;
    }

    onCollision(other: Sprite) {
        if (this._column < other.column) {
            this.changeState(EnemyMoveDirection.MoveRight);
        } else if (this._column >= other.column) {
            this.changeState(EnemyMoveDirection.MoveLeft);
        }
    }
}