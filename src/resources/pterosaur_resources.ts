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
    }
}

export namespace Sprite {
    export interface PterosaurAnimations {
        fly: string[];
    }

    export class Pterosaur {
        static readonly right: PterosaurAnimations = {
            fly: [
                SpriteClass.flip(Texture.Pterosaur.flyA),
                SpriteClass.flip(Texture.Pterosaur.flyB),
            ],
        };

        static readonly left: PterosaurAnimations = {
            fly: [
                Texture.Pterosaur.flyA,
                Texture.Pterosaur.flyB,
            ],
        };
    }
}