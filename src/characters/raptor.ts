import {Widgets} from "blessed";
import Screen = Widgets.Screen;
import {State} from "../states";
import {Enemy, EnemyMoveDirection} from "./enemy";
import {float, integer} from "../types";
import {RunLeft, RunRight} from "./raptor_states";
import {onDestroyCallback} from "../sprite";

export class Raptor extends Enemy {
    private static readonly ABS_SPEED: float = 50.0; // symbols per second
    private static readonly WIDTH: integer = 28;
    private static readonly HEIGHT: integer = 8;

    constructor(scr: Screen, direction: EnemyMoveDirection, onDestroy?: onDestroyCallback) {
        const row: integer = scr.height as number - Raptor.HEIGHT;
        const column: integer = direction === EnemyMoveDirection.MoveRight
            ? 1 - Raptor.WIDTH
            : scr.width as number - 1;
        super(scr, direction, Raptor.ABS_SPEED, column, row, Raptor.WIDTH, Raptor.HEIGHT, "#608080", onDestroy);
    }

    protected _createState(direction: EnemyMoveDirection): State {
        return direction === EnemyMoveDirection.MoveLeft ? new RunLeft() : new RunRight();
    }

    protected _onWindowResizeHandler(width: number, height: number): void {
        //TODO DZZ
        console.log("Raptor", width, height);
    }
}