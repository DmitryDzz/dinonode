export interface Animations {
    idle: string[];
    run: string[];
    jump: string[];
    dead: string[];
}

export enum Direction {
    left,
    right,
}

export class Dino {
    readonly width = 20;
    readonly height = 11;

    readonly sprites;

    direction: Direction = Direction.left;

    constructor() {
        this.sprites = {
            left: {
                idle: [
                    Dino._textures.idle,
                ],
                run: [
                    Dino._textures.idle,
                    Dino._textures.runA,
                    Dino._textures.idle,
                    Dino._textures.runB,
                ],
                jump: [
                    Dino._textures.idle,
                ],
                dead: [
                    Dino._textures.dead,
                ],
            },
            right: {
                idle: [
                    Dino.flip(Dino._textures.idle),
                ],
                run: [
                    Dino.flip(Dino._textures.idle),
                    Dino.flip(Dino._textures.runA),
                    Dino.flip(Dino._textures.idle),
                    Dino.flip(Dino._textures.runB),
                ],
                jump: [
                    Dino.flip(Dino._textures.idle),
                ],
                dead: [
                    Dino.flip(Dino._textures.dead),
                ],
            },
        }
    }

    /** @internal **/
    static flip(tex: string): string {
        return tex;
    }

    private static readonly _textures = {
        idle:
            "          ▄████████▄\n" +
            "          ██▄███████\n" +
            "          ██████████\n" +
            "          █████▄▄▄  \n" +
            "█      ▗▄█████      \n" +
            "██▄  ▄████████▀█    \n" +
            "██████████████      \n" +
            " ▀███████████       \n" +
            "   ▀████████▀       \n" +
            "     ██▀ ▀█         \n" +
            "     █▄   █▄        ",
        runA:
            "          ▄████████▄\n" +
            "          ██▄███████\n" +
            "          ██████████\n" +
            "          █████▄▄▄  \n" +
            "█      ▗▄█████      \n" +
            "██▄  ▄████████▀█    \n" +
            "██████████████      \n" +
            " ▀███████████       \n" +
            "   ▀████████▀       \n" +
            "     ██▀   ▀▀▘      \n" +
            "     █▄             ",
        runB:
            "          ▄████████▄\n" +
            "          ██▄███████\n" +
            "          ██████████\n" +
            "          █████▄▄▄  \n" +
            "█      ▗▄█████      \n" +
            "██▄  ▄████████▀█    \n" +
            "██████████████      \n" +
            " ▀███████████       \n" +
            "   ▀████████▀       \n" +
            "     ▀█▄ ▀█         \n" +
            "          █▄        ",
        dead:
            "          ▄████████▄\n" +
            "          ██  ██████\n" +
            "          ██████████\n" +
            "          ████████▀▀\n" +
            "█      ▗▄█████      \n" +
            "██▄  ▄████████▀█    \n" +
            "██████████████      \n" +
            " ▀███████████       \n" +
            "   ▀████████▀       \n" +
            "     ██▀ ▀█         \n" +
            "     █▄   █▄        ",
    };
}