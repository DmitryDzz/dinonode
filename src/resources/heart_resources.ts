import {Sprite as SpriteClass} from "../sprite";

export namespace Texture {
    export class Heart {
        static readonly alive =
            "{#f02000-fg}" +
            "▗███▖▗███▖\n" +
            " ▀██████▀ \n" +
            "   ▜██▛   \n" +
            "    ▜▛    {/}";
        static readonly dead =
            "{#606060-fg}" +
            "▗███▖▗███▖\n" +
            " ▀██████▀ \n" +
            "   ▜██▛   \n" +
            "    ▜▛    {/}";
    }
}

export namespace Sprite {
    export interface HeartAnimations {
        alive: string[];
        dead: string[];
    }

    export class Heart {
        static readonly alive: string[] = [
            Texture.Heart.alive,
        ];

        static readonly dead: string[] = [
            Texture.Heart.dead,
        ];
    }
}