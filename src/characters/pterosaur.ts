import {Widgets} from "blessed";
import {State} from "../states";
import {FlyLeftState, FlyRightState, DeadLeftState, DeadRightState} from "./pterosaur_states";
import {Enemy, EnemyMoveDirection, EnemyType} from "./enemy";
import {float, integer} from "../types";
import {OnDestroyCallback, Sprite} from "../sprite";
import Screen = Widgets.Screen;

export class Pterosaur extends Enemy {
    private static readonly ABS_SPEED: float = 50.0; // symbols per second
    private static readonly WIDTH: integer = 23;
    private static readonly HEIGHT: integer = 10;
    private static readonly BASE_Y: integer = 7;

    private readonly _flyLeftState: FlyLeftState;
    private readonly _flyRightState: FlyRightState;
    private readonly _deadLeftState: DeadLeftState;
    private readonly _deadRightState: DeadRightState;

    constructor(scr: Screen, direction: EnemyMoveDirection, onDestroy?: OnDestroyCallback) {
        const row: integer = scr.height as number - Pterosaur.HEIGHT - Pterosaur.BASE_Y;
        const column: integer = direction === EnemyMoveDirection.MoveRight
            ? 1 - Pterosaur.WIDTH
            : scr.width as number - 1;
        super(scr, EnemyType.Pterosaur, Pterosaur.ABS_SPEED, column, row,
            Pterosaur.WIDTH, Pterosaur.HEIGHT, "#B04000", onDestroy);

        this._flyLeftState = new FlyLeftState();
        this._flyRightState = new FlyRightState();
        this._deadLeftState = new DeadLeftState(this._afterDeathAnimation);
        this._deadRightState = new DeadRightState(this._afterDeathAnimation);
        this.changeDirection(direction);
    }

    private _afterDeathAnimation = (): void => {
        this.destroy();
    }

    protected _directionToState(direction: EnemyMoveDirection): State {
        return direction === EnemyMoveDirection.MoveLeft ? this._flyLeftState : this._flyRightState;
    }

    protected _onWindowResize(width: number, height: number): void {
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
        if (this.isDead) return;
        if (this._column < other.column) {
            this.changeDirection(EnemyMoveDirection.MoveLeft);
        } else if (this._column >= other.column) {
            this.changeDirection(EnemyMoveDirection.MoveRight);
        }
    }

    die(): void {
        super.die();
        if (this._state === this._flyLeftState)
            this._state = this._deadLeftState;
        else if (this._state === this._flyRightState)
            this._state = this._deadRightState;
    }
}