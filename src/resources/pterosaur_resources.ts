import {Sprite as SpriteClass} from "../sprite";

namespace Texture {
    export class Pterosaur {
        static readonly flyA =
            "        ▄              \n" +
            "        ██▄            \n" +
            "         ███▄          \n" +
            "    ▄██  █████▄        \n" +
            "  ▄█▀██████████▄       \n" +
            " ▀▀▀▀▀▀ ▀██████████▛▀▀ \n" +
            "          ▀███████▛▀▀▘ \n" +
            "                       \n" +
            "                       \n" +
            "                       ";
        static readonly flyB =
            "                       \n" +
            "                       \n" +
            "    ▄██                \n" +
            "  ▄█▀███               \n" +
            " ▀▀▀▀▀▀████████▄       \n" +
            "        ▀██████████▛▀▀▘\n" +
            "         █████████▛▀▀▘ \n" +
            "         ███▀          \n" +
            "         ██            \n" +
            "         ▀             ";
        static readonly deadA =
            "        ▓              \n" +
            "        ▓▓▓            \n" +
            "         ▓▓▓▓          \n" +
            "    ▓▓▓  ▓▓▓▓▓▓        \n" +
            "  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓      \n" +
            " ▓▓▓▓▓▓  ▓▓▓▓▓▓▓▓▓▓▓▓▓ \n" +
            "          ▓▓▓▓▓▓▓▓▓▓▓  \n" +
            "                       \n" +
            "                       \n" +
            "                       ";
        static readonly deadB =
            "        ▒              \n" +
            "        ▒▒▒            \n" +
            "         ▒▒▒▒          \n" +
            "    ▒▒▒  ▒▒▒▒▒▒        \n" +
            "  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒      \n" +
            " ▒▒▒▒▒▒  ▒▒▒▒▒▒▒▒▒▒▒▒▒ \n" +
            "          ▒▒▒▒▒▒▒▒▒▒▒  \n" +
            "                       \n" +
            "                       \n" +
            "                       ";
        static readonly deadC =
            "        ░              \n" +
            "        ░░░            \n" +
            "         ░░░░          \n" +
            "    ░░░  ░░░░░░        \n" +
            "  ░░░░░░░░░░░░░░░      \n" +
            " ░░░░░░  ░░░░░░░░░░░░░ \n" +
            "          ░░░░░░░░░░░  \n" +
            "                       \n" +
            "                       \n" +
            "                       ";
        static readonly deadD =
            "                       \n" +
            "                       \n" +
            "                       \n" +
            "                       \n" +
            "                       \n" +
            "                       \n" +
            "                       \n" +
            "                       \n" +
            "                       \n" +
            "                       ";
    }
}

export namespace Sprite {
    export interface PterosaurAnimations {
        fly: string[];
        dead: string[];
    }

    export class Pterosaur {
        static readonly right: PterosaurAnimations = {
            fly: [
                SpriteClass.flip(Texture.Pterosaur.flyA),
                SpriteClass.flip(Texture.Pterosaur.flyB),
            ],
            dead: [
                SpriteClass.flip(Texture.Pterosaur.deadA),
                SpriteClass.flip(Texture.Pterosaur.deadB),
                SpriteClass.flip(Texture.Pterosaur.deadC),
                SpriteClass.flip(Texture.Pterosaur.deadD),
            ],
        };

        static readonly left: PterosaurAnimations = {
            fly: [
                Texture.Pterosaur.flyA,
                Texture.Pterosaur.flyB,
            ],
            dead: [
                Texture.Pterosaur.deadA,
                Texture.Pterosaur.deadB,
                Texture.Pterosaur.deadC,
                Texture.Pterosaur.deadD,
            ],
        };
    }
}