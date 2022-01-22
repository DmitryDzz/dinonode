import {Sprite as SpriteClass} from "../sprite";

export namespace Texture {
    export class Dino {
        static readonly idleA =
            "          ▄████████▄\n" +
            "          ██▄███████\n" +
            "          ██████████\n" +
            "          █████▄▄▄  \n" +
            "█      ▗▄█████      \n" +
            "██▄  ▄████████▀█    \n" +
            "▜█████████████      \n" +
            " ▀███████████▘      \n" +
            "   ▀████████▘       \n" +
            "     ██▀ ▀█         \n" +
            "     █▄   █▄        ";
        static readonly idleB =
            "           ▄▄▄▄▄▄▄▄ \n" +
            "          ██▀███████\n" +
            "          ██████████\n" +
            "          █████▀▀▀▀▀\n" +
            "▟▘     ▗▄█████▀▀▀▀  \n" +
            "██▄  ▄████████▀█    \n" +
            "▜█████████████      \n" +
            " ▀███████████▘      \n" +
            "   ▀████████▘       \n" +
            "     ██▀ ▀█         \n" +
            "     █▄   █▄        ";
        static readonly runA =
            "          ▄████████▄\n" +
            "          ██▄███████\n" +
            "          ██████████\n" +
            "          █████▄▄▄  \n" +
            "█      ▗▄█████      \n" +
            "██▄  ▄████████▀█    \n" +
            "▜█████████████      \n" +
            " ▀███████████▘      \n" +
            "   ▀████████▘       \n" +
            "     ██▀   ▀▀▘      \n" +
            "     █▄             ";
        static readonly runB =
            "           ▄▄▄▄▄▄▄▄ \n" +
            "          ██▀███████\n" +
            "          ██████████\n" +
            "          █████▀▀▀▀▀\n" +
            "▟▘     ▗▄█████▀▀▀▀  \n" +
            "██▄  ▄████████▀█    \n" +
            "▜█████████████      \n" +
            " ▀███████████▘      \n" +
            "   ▀████████▘       \n" +
            "     ▀█▄ ▀█         \n" +
            "          █▄        ";
        static readonly jump =
            "          ▄████████▄\n" +
            "          ██▄███████\n" +
            "          ██████████\n" +
            "          █████▄▄▄  \n" +
            "█      ▗▄█████      \n" +
            "██▄  ▄████████▀█    \n" +
            "▜█████████████      \n" +
            " ▀███████████▘      \n" +
            "   ▀████████▘       \n" +
            "     ██▀ █▛         \n" +
            "     ▜▙  ▜▙         ";
        static readonly leanIdleA =
            "▖                 ▄▄▄▄▄▄▄▄ \n" +
            "█▄▄    ▄▄▄▄▄▄▄  ▄██▀███████\n" +
            "▀██████████████████████████\n" +
            "  ▀█████████████▀█████▀▀▀▀▀\n" +
            "    ▜███████▀▀█▘  ▀▀▀▀▀▀▀  \n" +
            "      ██▀ ▀█  ▀▀           \n" +
            "      █▄   █▄              ";
        static readonly leanIdleB =
            "▗                ▄████████▄\n" +
            "█▄▄    ▄▄▄▄▄▄▄  ▟██▄███████\n" +
            "▀██████████████████████████\n" +
            "  ▀█████████████▀▀████▄▄▄  \n" +
            "    ▜███████▀▀█▘           \n" +
            "      ██▀ ▀█  ▀▀           \n" +
            "      █▄   █▄              ";
        static readonly leanRunA =
            "▖                 ▄▄▄▄▄▄▄▄ \n" +
            "█▄▄    ▄▄▄▄▄▄▄  ▄██▀███████\n" +
            "▀██████████████████████████\n" +
            "  ▀█████████████▀█████▀▀▀▀▀\n" +
            "    ▜███████▀▀█▘  ▀▀▀▀▀▀▀  \n" +
            "    █▄  ██▀   ▀▀           \n" +
            "        █▄                 ";
        static readonly leanRunB =
            "▗                ▄████████▄\n" +
            "█▄▄    ▄▄▄▄▄▄▄  ▟██▄███████\n" +
            "▀██████████████████████████\n" +
            "  ▀█████████████▀▀████▄▄▄  \n" +
            "    ▜█████▛▀▀▀█▘           \n" +
            "    ██▀  ▀█▄▄ ▀▀           \n" +
            "    █▄                     ";
        static readonly dead =
            "          ▄████████▄\n" +
            "          ██  ██████\n" +
            "          ██████████\n" +
            "          ████████▀▀\n" +
            "█      ▗▄█████      \n" +
            "██▄  ▄████████▀█    \n" +
            "▜█████████████      \n" +
            " ▀███████████▘      \n" +
            "   ▀████████▘       \n" +
            "     ██▀ ▀█         \n" +
            "     █▄   █▄        ";

    }
}

export namespace Sprite {
    export interface DinoAnimations {
        idle: string[];
        run: string[];
        jump: string[];
        leanIdle: string[];
        leanRun: string[];
        dead: string[];
    }

    export class Dino {
        static readonly right: DinoAnimations = {
            idle: [
                Texture.Dino.idleA,
                Texture.Dino.idleB,
            ],
            run: [
                Texture.Dino.runA,
                Texture.Dino.runB,
            ],
            jump: [
                Texture.Dino.jump,
            ],
            leanIdle: [
                Texture.Dino.leanIdleA,
                Texture.Dino.leanIdleB,
            ],
            leanRun: [
                Texture.Dino.leanRunA,
                Texture.Dino.leanRunB,
            ],
            dead: [
                Texture.Dino.dead,
            ],
        };
        static readonly left: DinoAnimations = {
            idle: [
                SpriteClass.flip(Texture.Dino.idleA),
                SpriteClass.flip(Texture.Dino.idleB),
            ],
            run: [
                SpriteClass.flip(Texture.Dino.runA),
                SpriteClass.flip(Texture.Dino.runB),
            ],
            jump: [
                SpriteClass.flip(Texture.Dino.jump),
            ],
            leanIdle: [
                SpriteClass.flip(Texture.Dino.leanIdleA),
                SpriteClass.flip(Texture.Dino.leanIdleB),
            ],
            leanRun: [
                SpriteClass.flip(Texture.Dino.leanRunA),
                SpriteClass.flip(Texture.Dino.leanRunB),
            ],
            dead: [
                SpriteClass.flip(Texture.Dino.dead),
            ],
        };
    }
}