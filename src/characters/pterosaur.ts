import {Widgets} from "blessed";
import Screen = Widgets.Screen;
import {Sprite} from "../sprite";
import {State} from "../states";
import {FlyLeft, FlyRight} from "./pterosaur_states";
import {Enemy, EnemyMoveDirection} from "./enemy";
import {float, integer} from "../types";

interface PterosaurAnimations {
    fly: string[];
}

export class Pterosaur extends Enemy {
    private static readonly ABS_SPEED: float = 40.0; // 40 symbols per second
    private static readonly WIDTH: integer = 23;
    private static readonly HEIGHT: integer = 10;
    private static readonly BASE_Y: integer = 6;

    constructor(scr: Screen, direction: EnemyMoveDirection) {
        super(scr, direction, Pterosaur.WIDTH, Pterosaur.HEIGHT, Pterosaur.BASE_Y, Pterosaur.ABS_SPEED);
    }

    protected _createState(direction: EnemyMoveDirection): State {
        Pterosaur.sprites = Pterosaur._createSprites();
        return direction === EnemyMoveDirection.MoveLeft ? new FlyLeft() : new FlyRight();
    }

    protected _onWindowResizeHandler(width: number, height: number): void {
        //TODO DZZ
        console.log("Pterosaur", width, height);
    }

    static sprites: {
        left: PterosaurAnimations,
        right: PterosaurAnimations
    };

    private static _createSprites() {
        return {
            right: {
                fly: [
                    Sprite.flip(Pterosaur._textures.flyA),
                    Sprite.flip(Pterosaur._textures.flyB),
                ],
            },
            left: {
                fly: [
                    Pterosaur._textures.flyA,
                    Pterosaur._textures.flyB,
                ],
            },
        };
    }

    private static readonly _textures = {
        flyA:
            "        ▄              \n" +
            "        ██▄            \n" +
            "    ▄██  ███▄          \n" +
            "  ▄█████ █████▄        \n" +
            " ▀▀▀▀▀▀████████▄       \n" +
            "        ▀██████████▛▀▀▘\n" +
            "          ▀███████▛▀▀▘ \n" +
            "                       \n" +
            "                       \n" +
            "                       ",
        flyB:
            "                       \n" +
            "                       \n" +
            "    ▄██                \n" +
            "  ▄█████               \n" +
            " ▀▀▀▀▀▀████████▄       \n" +
            "        ▀██████████▛▀▀▘\n" +
            "         █████████▛▀▀▘ \n" +
            "         ███▀          \n" +
            "         ██            \n" +
            "         ▀             ",
    };
}