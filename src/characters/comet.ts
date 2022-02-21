import {Widgets} from "blessed";
import {State} from "../states";
import {Enemy, EnemyMoveDirection, EnemyType} from "./enemy";
import {float, integer} from "../types";
import {OnDestroyCallback, Sprite} from "../sprite";
import {FallState} from "./comet_states";
import Screen = Widgets.Screen;

export class Comet extends Enemy {
    private static readonly ABS_SPEED: float = 30.0; // symbols per second
    private static readonly WIDTH: integer = 4;
    private static readonly HEIGHT: integer = 5;

    private static readonly _fallState = new FallState();

    constructor(scr: Screen, onDestroy?: OnDestroyCallback) {
        const scrWidth: integer = scr.width as number;
        const column: integer = Math.round(Math.random() * 0.95 * scrWidth + 0.025 * scrWidth);
        const row: integer = 1 - Comet.HEIGHT;
        super(scr, EnemyType.Comet, EnemyMoveDirection.MoveDown, Comet.ABS_SPEED, column, row,
            Comet.WIDTH, Comet.HEIGHT, "#808000",onDestroy);
    }

    protected _getState(direction: EnemyMoveDirection): State {
        return Comet._fallState;
    }

    protected _onWindowResizeHandler(width: number, height: number): void {
        //TODO DZZ
        console.log("Comet", width, height);
    }

    protected _setLocalCollider(_direction: EnemyMoveDirection): void {
        this._localCollider.c0 = 0;
        this._localCollider.r0 = 3;
        this._localCollider.c1 = 3;
        this._localCollider.r1 = 4;
    }

    onCollision(_other: Sprite) {
        this.destroy();
    }
}