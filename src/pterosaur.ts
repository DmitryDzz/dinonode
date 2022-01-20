import {box, Widgets} from "blessed";
import {float} from "./position";
import BoxElement = Widgets.BoxElement;
import Screen = Widgets.Screen;
import {Sprite} from "./Sprite";

interface Animations {
    fly: string[];
}

export class Pterosaur extends Sprite {
    private readonly _box: BoxElement;

    private static readonly ABS_SPEED: float = 40.0; // 40 symbols per second
    //private readonly _pos: Position;

    static sprites: {
        left: Animations,
        right: Animations
    };

    constructor(scr: Screen) {
        super(scr);

        //this._pos = new Position(scr, 0, scr.height as number - Position.DEFAULT_HEIGHT);
        //this._box = Pterosaur.createBox(this._pos.column, this._pos.row);
        //scr.append(this._box);

        Pterosaur.sprites = Pterosaur.createSprites();
    }

    public update(): void {

    }

    protected _onWindowResizeHandler(width: number, height: number): void {
        //TODO DZZ
        console.log("Pterosaur", width, height);
    }

    private static createSprites() {
        return {
            right: {
                fly: [
                    Pterosaur._textures.flyA,
                    Pterosaur._textures.flyB,
                ],
            },
            left: {
                fly: [
                    Sprite.flip(Pterosaur._textures.flyA),
                    Sprite.flip(Pterosaur._textures.flyB),
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