import {Widgets} from "blessed";
import {State} from "../states";
import {Enemy, EnemyMoveDirection, EnemyType} from "./enemy";
import {float, integer} from "../types";
import {DeadLeftState, DeadRightState, RunLeftState, RunRightState} from "./raptor_states";
import {OnDestroyCallback, Sprite} from "../sprite";
import Screen = Widgets.Screen;

export class Raptor extends Enemy {
    private static readonly ABS_SPEED: float = 50.0; // symbols per second
    private static readonly WIDTH: integer = 28;
    private static readonly HEIGHT: integer = 8;

    private readonly _runLeftState: RunLeftState;
    private readonly _runRightState: RunRightState;
    private readonly _deadLeftState: DeadLeftState;
    private readonly _deadRightState: DeadRightState;

    constructor(scr: Screen, direction: EnemyMoveDirection, onDestroy?: OnDestroyCallback) {
        const row: integer = scr.height as number - Raptor.HEIGHT;
        const column: integer = direction === EnemyMoveDirection.MoveRight
            ? 1 - Raptor.WIDTH
            : scr.width as number - 1;
        super(scr, EnemyType.Raptor, Raptor.ABS_SPEED, column, row,
            Raptor.WIDTH, Raptor.HEIGHT, "#608080", onDestroy);

        this._runLeftState = new RunLeftState();
        this._runRightState = new RunRightState();
        this._deadLeftState = new DeadLeftState(this._afterDeathAnimation);
        this._deadRightState = new DeadRightState(this._afterDeathAnimation);
        this.changeDirection(direction);
    }

    private _afterDeathAnimation = (): void => {
        this.destroy();
    }

    protected _directionToState(direction: EnemyMoveDirection): State {
        return direction === EnemyMoveDirection.MoveLeft ? this._runLeftState : this._runRightState;
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
        if (this.isDead) return;
        if (this._column < other.column) {
            this.changeDirection(EnemyMoveDirection.MoveLeft);
        } else if (this._column >= other.column) {
            this.changeDirection(EnemyMoveDirection.MoveRight);
        }
    }

    die(): void {
        super.die();
        if (this._state === this._runLeftState)
            this._state = this._deadLeftState;
        else if (this._state === this._runRightState)
            this._state = this._deadRightState;
    }
}