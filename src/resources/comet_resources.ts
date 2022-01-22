export namespace Texture {
    export class Comet {
        static readonly fallA =
            "  ░ \n" +
            " ▓▒ \n" +
            "▓▓▓ \n" +
            "▟██▙\n" +
            "▜██▛";
        static readonly fallB =
            " ░  \n" +
            "▒▒  \n" +
            " ▓▓ \n" +
            "▟██▙\n" +
            "▜██▛";
        static readonly fallC =
            " ░  \n" +
            " ▒▓ \n" +
            " ▒▓▓\n" +
            "▟██▙\n" +
            "▜██▛";
    }
}

export namespace Sprite {
    export class Comet {
        static readonly fall: string[] = [
            Texture.Comet.fallA,
            Texture.Comet.fallB,
            Texture.Comet.fallC,
        ];
    }
}