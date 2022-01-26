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
        static readonly appearA =
            "{#f02000-fg}" +
            "  ▄▖  ▗▄  \n" +
            " ▝██▙▟██▘ \n" +
            "   ▀██▀   \n" +
            "    ▝▘    {/}";
        static readonly appearB =
            "{#f02000-fg}" +
            "▗███▖▗███▖\n" +
            " ▀██████▀ \n" +
            "   ▜██▛   \n" +
            "    ▜▛    {/}";
        static readonly disappearA =
            "{#606060-fg}" +
            "  ▄▖  ▗▄  \n" +
            " ▝██▙▟██▘ \n" +
            "   ▀██▀   \n" +
            "    ▝▘    {/}";
        static readonly disappearB =
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
        appear: string[];
        disappear: string[];
    }

    export class Heart {
        static readonly alive: string[] = [
            Texture.Heart.alive,
        ];

        static readonly dead: string[] = [
            Texture.Heart.dead,
        ];

        static readonly appear: string[] = [
            Texture.Heart.appearA,
            Texture.Heart.appearB,
        ]

        static readonly disappear: string[] = [
            Texture.Heart.disappearA,
            Texture.Heart.disappearB,
        ]
    }
}