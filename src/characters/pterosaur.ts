import {Widgets} from "blessed";
import Screen = Widgets.Screen;
import {State} from "../states";
import {FlyLeft, FlyRight} from "./pterosaur_states";
import {Enemy, EnemyMoveDirection} from "./enemy";
import {float, integer} from "../types";
import {onDestroyCallback} from "../sprite";

export class Pterosaur extends Enemy {
    private static readonly ABS_SPEED: float = 40.0; // 40 symbols per second
    private static readonly WIDTH: integer = 23;
    private static readonly HEIGHT: integer = 10;
    private static readonly BASE_Y: integer = 6;

    constructor(scr: Screen, direction: EnemyMoveDirection, onDestroy?: onDestroyCallback) {
        super(scr, direction, Pterosaur.WIDTH, Pterosaur.HEIGHT, Pterosaur.BASE_Y, Pterosaur.ABS_SPEED, onDestroy);
    }

    protected _createState(direction: EnemyMoveDirection): State {
        return direction === EnemyMoveDirection.MoveLeft ? new FlyLeft() : new FlyRight();
    }

    protected _onWindowResizeHandler(width: number, height: number): void {
        //TODO DZZ
        console.log("Pterosaur", width, height);
    }
}