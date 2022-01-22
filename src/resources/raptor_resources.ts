import {Sprite as SpriteClass} from "../sprite";

export namespace Texture {
    export class Raptor {
        static readonly runA =
            "                         ▀▄ \n" +
            "                           █\n" +
            "              ▄▄▄▄▄▄    ▄▄█▀\n" +
            "  ▄▄▄▄    ▄▄█████████████▀  \n" +
            "███▄██▛▀██████████████▀▀    \n" +
            "▀▀▀▀▀▀ █▀ ▄█▀ ▀██ ▜█        \n" +
            "       ▀▘█▄    ▀█ ▄█▀       \n" +
            "              ▄▄█▀          ";
        static readonly runB =
            "                         ▄▄ \n" +
            "                           █\n" +
            "              ▄▄▄▄▄▄    ▄▄█▀\n" +
            "▄▄█▀██▖   ▄▄█████████████▀  \n" +
            "██████▀▀██████████████▀▀    \n" +
            "       █▀ ▄█▀ ▜██ ▀██       \n" +
            "       ▀▘█▄ ▄▄█▀   ▀█       \n" +
            "                   ▄▟▛▘     ";
    }
}

export namespace Sprite {
    export interface RaptorAnimations {
        run: string[];
    }

    export class Raptor {
        static readonly right: RaptorAnimations = {
            run: [
                SpriteClass.flip(Texture.Raptor.runA),
                SpriteClass.flip(Texture.Raptor.runB),
            ],
        };

        static readonly left: RaptorAnimations = {
            run: [
                Texture.Raptor.runA,
                Texture.Raptor.runB,
            ],
        };
    }
}