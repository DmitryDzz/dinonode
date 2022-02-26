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
        static readonly deadA =
            "                          ▓ \n" +
            "                           ▓\n" +
            "              ▓▓▓▓▓▓    ▓▓▓ \n" +
            "  ▓▓▓▓    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  \n" +
            "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓     \n" +
            "       ▓▓  ▓▓ ▓▓▓ ▓▓        \n" +
            "       ▓  ▓▓   ▓▓  ▓▓       \n" +
            "              ▓▓            ";
        static readonly deadB =
            "                          ▒ \n" +
            "                           ▒\n" +
            "              ▒▒▒▒▒▒    ▒▒▒ \n" +
            "  ▒▒▒▒    ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  \n" +
            "▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒     \n" +
            "       ▒▒  ▒▒ ▒▒▒ ▒▒        \n" +
            "       ▒  ▒▒   ▒▒  ▒▒       \n" +
            "              ▒▒            ";
        static readonly deadC =
            "                          ░ \n" +
            "                           ░\n" +
            "              ░░░░░░    ░░░ \n" +
            "  ░░░░    ░░░░░░░░░░░░░░░░  \n" +
            "░░░░░░░░░░░░░░░░░░░░░░░     \n" +
            "       ░░  ░░ ░░░ ░░        \n" +
            "       ░  ░░   ░░  ░░       \n" +
            "              ░░            ";
        static readonly deadD =
            "                            \n" +
            "                            \n" +
            "                            \n" +
            "                            \n" +
            "                            \n" +
            "                            \n" +
            "                            \n" +
            "                            ";
    }
}

export namespace Sprite {
    export interface RaptorAnimations {
        run: string[];
        dead: string[];
    }

    export class Raptor {
        static readonly right: RaptorAnimations = {
            run: [
                SpriteClass.flip(Texture.Raptor.runA),
                SpriteClass.flip(Texture.Raptor.runB),
            ],
            dead: [
                SpriteClass.flip(Texture.Raptor.deadA),
                SpriteClass.flip(Texture.Raptor.deadB),
                SpriteClass.flip(Texture.Raptor.deadC),
                SpriteClass.flip(Texture.Raptor.deadD),
            ],
        };

        static readonly left: RaptorAnimations = {
            run: [
                Texture.Raptor.runA,
                Texture.Raptor.runB,
            ],
            dead: [
                Texture.Raptor.deadA,
                Texture.Raptor.deadB,
                Texture.Raptor.deadC,
                Texture.Raptor.deadD,
            ],
        };
    }
}