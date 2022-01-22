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
    private static readonly BASE_Y: integer = 0;

    constructor(scr: Screen, direction: EnemyMoveDirection, onDestroy?: onDestroyCallback) {
        super(scr, direction, Raptor.WIDTH, Raptor.HEIGHT, Raptor.BASE_Y, Raptor.ABS_SPEED, onDestroy);
    }

    protected _createState(direction: EnemyMoveDirection): State {
        return direction === EnemyMoveDirection.MoveLeft ? new RunLeft() : new RunRight();
    }

    protected _onWindowResizeHandler(width: number, height: number): void {
        //TODO DZZ
        console.log("Raptor", width, height);
    }
}