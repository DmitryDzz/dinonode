import {Widgets} from "blessed";
import Screen = Widgets.Screen;
import {Sprite} from "../sprite";
import {State} from "../states";
import {Enemy, EnemyMoveDirection} from "./enemy";
import {float, integer} from "../types";
import {RunLeft, RunRight} from "./raptor_states";

interface RaptorAnimations {
    run: string[];
}

export class Raptor extends Enemy {
    private static readonly ABS_SPEED: float = 40.0; // 40 symbols per second
    private static readonly WIDTH: integer = 28;
    private static readonly HEIGHT: integer = 8;
    private static readonly BASE_Y: integer = 0;

    constructor(scr: Screen, direction: EnemyMoveDirection) {
        super(scr, direction, Raptor.WIDTH, Raptor.HEIGHT, Raptor.BASE_Y, Raptor.ABS_SPEED);
    }

    protected _createState(direction: EnemyMoveDirection): State {
        Raptor.sprites = Raptor._createSprites();
        return direction === EnemyMoveDirection.MoveLeft ? new RunLeft() : new RunRight();
    }

    protected _onWindowResizeHandler(width: number, height: number): void {
        //TODO DZZ
        console.log("Raptor", width, height);
    }

    static sprites: {
        left: RaptorAnimations,
        right: RaptorAnimations
    };

    private static _createSprites() {
        return {
            right: {
                run: [
                    Sprite.flip(Raptor._textures.runA),
                    Sprite.flip(Raptor._textures.runB),
                ],
            },
            left: {
                run: [
                    Raptor._textures.runA,
                    Raptor._textures.runB,
                ],
            },
        };
    }

    private static readonly _textures = {
        runA:
            "                         ▀▄ \n" +
            "                           █\n" +
            "              ▄▄▄▄▄▄    ▄▄█▀\n" +
            "  ▄▄▄▄    ▄▄█████████████▀  \n" +
            "███▄██▀▀██████████████▀▀    \n" +
            "      ▄▀▀ ▄█▀  ██ ▀██       \n" +
            "      ▀▀ █▄   ▄▄█▀ ▀█       \n" +
            "                  ▄▄█▀      ",
        runB:
            "                         ▀▄ \n" +
            "                           █\n" +
            "              ▄▄▄▄▄▄    ▄▄█▀\n" +
            "  ▄▄▄▄    ▄▄█████████████▀  \n" +
            "███▄██▀▀██████████████▀▀    \n" +
            "      ▄▀▀ ▄█▀  ██ ▀██       \n" +
            "      ▀▀ █▄   ▄▄█▀ ▀█       \n" +
            "                  ▄▄█▀      ",
    };
}