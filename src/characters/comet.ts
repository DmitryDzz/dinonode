import {Widgets} from "blessed";
import {State} from "../states";
import {Enemy, EnemyMoveDirection} from "./enemy";
import {float, integer} from "../types";
import {onDestroyCallback} from "../sprite";
import Screen = Widgets.Screen;
import {Fall} from "./comet_states";

export class Comet extends Enemy {
    private static readonly ABS_SPEED: float = 30.0; // symbols per second
    private static readonly WIDTH: integer = 4;
    private static readonly HEIGHT: integer = 5;

    constructor(scr: Screen, onDestroy?: onDestroyCallback) {
        const scrWidth: integer = scr.width as number;
        const column: integer = Math.round(Math.random() * 0.95 * scrWidth + 0.025 * scrWidth);
        const row: integer = 1 - Comet.HEIGHT;
        super(scr, EnemyMoveDirection.MoveDown, Comet.ABS_SPEED, column, row, Comet.WIDTH, Comet.HEIGHT,
            "#808000",onDestroy);
    }

    protected _createState(direction: EnemyMoveDirection): State {
        return new Fall();
    }

    protected _onWindowResizeHandler(width: number, height: number): void {
        //TODO DZZ
        console.log("Comet", width, height);
    }
}