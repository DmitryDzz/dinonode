export namespace Texture {
    export class Heart {
        static readonly small_red =
            "{#f02000-fg}" +
            "  ▄▖  ▗▄  \n" +
            " ▝██▙▟██▘ \n" +
            "   ▀██▀   \n" +
            "    ▝▘    {/}";
        static readonly small_gray =
            "{#606060-fg}" +
            "  ▄▖  ▗▄  \n" +
            " ▝██▙▟██▘ \n" +
            "   ▀██▀   \n" +
            "    ▝▘    {/}";
        static readonly big_red =
            "{#f02000-fg}" +
            "▗███▖▗███▖\n" +
            " ▀██████▀ \n" +
            "   ▜██▛   \n" +
            "    ▜▛    {/}";
        static readonly big_gray =
            "{#606060-fg}" +
            "▗███▖▗███▖\n" +
            " ▀██████▀ \n" +
            "   ▜██▛   \n" +
            "    ▜▛    {/}";
    }
}

export namespace Sprite {
    export class Heart {
        static readonly alive: string[] = [
            Texture.Heart.small_red,
        ];

        static readonly dead: string[] = [
            Texture.Heart.small_gray,
        ];

        static readonly appear: string[] = [
            Texture.Heart.big_red,
            Texture.Heart.small_red,
            Texture.Heart.big_red,
            Texture.Heart.small_red,
            Texture.Heart.big_red,
            Texture.Heart.small_red,
        ]

        static readonly disappear: string[] = [
            Texture.Heart.big_gray,
            Texture.Heart.small_gray,
            Texture.Heart.big_gray,
            Texture.Heart.small_gray,
            Texture.Heart.big_gray,
            Texture.Heart.small_gray,
        ]
    }
}