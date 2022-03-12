export namespace Texture {
    export class Ufo {
        static readonly BASE_COLOR = "#6897ED";

        private static readonly deckColorOpen = "{#2000F0-fg}";
        private static readonly colorClose = "{/}";
        private static readonly nozzleColorOpen = "{#FF8114-fg}"
        private static readonly nozzle = `${Ufo.nozzleColorOpen}▀${Ufo.colorClose}`;

        static readonly idleA = Ufo.deckColorOpen +
            "            ▄█████▄            \n" +
            "           █▀██▀██▀█           \n" +
            "      ▄▄▄▄▟█████████▙▄▄▄▄      \n" + Ufo.colorClose +
            "  ▄▄███████████████████████▄▄  \n" +
            " ▀█▄███▄████▄█████▄████▄███▄█▀ \n" +
         // "          ▀^▀▀▀^▀▀▀^▀          ";
            `          ${Ufo.deckColorOpen}▀${Ufo.colorClose}${Ufo.nozzle}${Ufo.deckColorOpen}▀▀▀${Ufo.colorClose}${Ufo.nozzle}${Ufo.deckColorOpen}▀▀▀${Ufo.colorClose}${Ufo.nozzle}${Ufo.deckColorOpen}▀${Ufo.colorClose}`;
        static readonly idleB = Ufo.deckColorOpen +
            "            ▄█████▄            \n" +
            "           ██▀██▀██▀           \n" +
            "      ▄▄▄▄▟█████████▙▄▄▄▄      \n" + Ufo.colorClose +
            "  ▄▄███████████████████████▄▄  \n" +
            "▀ ██▄███▄█████▄█████▄████▄██▄▀▀\n" +
         // "          ▀▀^▀▀▀▀^▀▀^          ";
            `          ${Ufo.deckColorOpen}▀▀${Ufo.colorClose}${Ufo.nozzle}${Ufo.deckColorOpen}▀▀▀▀${Ufo.colorClose}${Ufo.nozzle}${Ufo.deckColorOpen}▀▀${Ufo.colorClose}${Ufo.nozzle}`;
        static readonly idleC = Ufo.deckColorOpen +
            "            ▄█████▄            \n" +
            "           ▀██▀██▀██           \n" +
            "      ▄▄▄▄▟█████████▙▄▄▄▄      \n" + Ufo.colorClose +
            "  ▄▄███████████████████████▄▄  \n" +
            "▀▀▄██▄████▄█████▄█████▄███▄██ ▀\n" +
         // "          ^▀▀^▀▀▀▀^▀▀          ";
            `          ${Ufo.nozzle}${Ufo.deckColorOpen}▀▀${Ufo.colorClose}${Ufo.nozzle}${Ufo.deckColorOpen}▀▀▀▀${Ufo.colorClose}${Ufo.nozzle}${Ufo.deckColorOpen}▀▀${Ufo.colorClose}`;
    }
}

export namespace Sprite {
    export class Ufo {
        static readonly idle: string[] = [
            Texture.Ufo.idleA,
            Texture.Ufo.idleB,
            Texture.Ufo.idleC,
        ];
    }
}