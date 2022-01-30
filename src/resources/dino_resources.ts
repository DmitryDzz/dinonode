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
        static readonly deadHeadA =
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "█      ▗▄█████      \n" +
            "██▄  ▄████████▀█    \n" +
            "▜█████████████      \n" +
            " ▀███████████▘      \n" +
            "   ▀████████▘       \n" +
            "     ██▀ ▀█         \n" +
            "     █▄   █▄        ";
        static readonly deadHeadB =
            "                    \n" +
            "                    \n" +
            "                    \n{#f02000-fg}" +
            "           ▖▗       {/}\n" +
            "█      ▗▄█████      \n" +
            "██▄  ▄████████▀█    \n" +
            "▜█████████████      \n" +
            " ▀███████████▘      \n" +
            "   ▀████████▘       \n" +
            "     ██▀ ▀█         \n" +
            "     █▄   █▄        ";
        static readonly deadHeadC =
            "                    \n" +
            "                    \n" +
            "                    \n{#f02000-fg}" +
            "          ▚ ▞       {/}\n" +
            "█      ▗▄█████      \n" +
            "██▄  ▄████████▀█    \n" +
            "▜█████████████      \n" +
            " ▀███████████▘      \n" +
            "   ▀████████▘       \n" +
            "     ██▀ ▀█         \n" +
            "     █▄   █▄        ";
        static readonly deadHeadD =
            "                    \n" +
            "                    \n" +
            "                    \n{#f02000-fg}" +
            "         ▝▝ ▝▝      {/}\n" +
            "█      ▗▄█████      \n" +
            "██▄  ▄████████▀█    \n" +
            "▜█████████████      \n" +
            " ▀███████████▘      \n" +
            "   ▀████████▘       \n" +
            "     ██▀ ▀█         \n" +
            "     █▄   █▄        ";
        static readonly deadHeadE =
            "                    \n" +
            "                    \n" +
            "                    \n{#f02000-fg}" +
            "         ▞   ▚      {/}\n" +
            "█      ▗▄█████      \n" +
            "██▄  ▄████████▀█    \n" +
            "▜█████████████      \n" +
            " ▀███████████▘      \n" +
            "   ▀████████▘       \n" +
            "     ██▀ ▀█         \n" +
            "     █▄   █▄        ";
        static readonly deadHeadF =
            "                    \n" +
            "                    \n" +
            "                    \n{#f02000-fg}" +
            "         ▖   ▗      {/}\n" +
            "█      ▗▄█████      \n" +
            "██▄  ▄████████▀█    \n" +
            "▜█████████████      \n" +
            " ▀███████████▘      \n" +
            "   ▀████████▘       \n" +
            "     ██▀ ▀█         \n" +
            "     █▄   █▄        ";
        static readonly deadHeadG =
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "▄▄         ▄▄       \n" +
            " ███▄  ▄▄█████▄     \n" +
            "  ▜████████████▀    \n" +
            "   ▀██████████▜▙    \n" +
            "     ▀██████▀ ▄█    \n" +
            "   ▄▄██▀▄█▀         ";
        static readonly deadHeadH =
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "       ▄█████████▄  \n" +
            "    ▄▄████████████▄ \n" +
            "▄█████████{#A02000-fg}▒▒▒▒▒{/}████▄";
        static readonly deadHeadI =
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "       ▄█████████▄  \n" +
            "    ▄▄████████████▄ \n" +
            "▄█████{#A02000-fg}▒▒▒▒▒▒▒▒▒▒▒{/}██▄";
        static readonly deadHeadJ =
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "       ▄█████████▄  \n" +
            "    ▄▄████████████▄ \n{#A02000-fg}" +
            "▄▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄{/}";

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
        deadHead: string[];
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
            deadHead: [
                Texture.Dino.deadHeadA,
                Texture.Dino.deadHeadB,
                Texture.Dino.deadHeadC,
                Texture.Dino.deadHeadD,
                Texture.Dino.deadHeadE,
                Texture.Dino.deadHeadF,
                Texture.Dino.deadHeadA,
                Texture.Dino.deadHeadB,
                Texture.Dino.deadHeadC,
                Texture.Dino.deadHeadD,
                Texture.Dino.deadHeadE,
                Texture.Dino.deadHeadF,
                Texture.Dino.deadHeadA,
                Texture.Dino.deadHeadG,
                Texture.Dino.deadHeadH,
                Texture.Dino.deadHeadI,
                Texture.Dino.deadHeadJ,
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
            deadHead: [
                SpriteClass.flip(Texture.Dino.deadHeadA),
                SpriteClass.flip(Texture.Dino.deadHeadB),
                SpriteClass.flip(Texture.Dino.deadHeadC),
                SpriteClass.flip(Texture.Dino.deadHeadD),
                SpriteClass.flip(Texture.Dino.deadHeadE),
                SpriteClass.flip(Texture.Dino.deadHeadF),
                SpriteClass.flip(Texture.Dino.deadHeadA),
                SpriteClass.flip(Texture.Dino.deadHeadB),
                SpriteClass.flip(Texture.Dino.deadHeadC),
                SpriteClass.flip(Texture.Dino.deadHeadD),
                SpriteClass.flip(Texture.Dino.deadHeadE),
                SpriteClass.flip(Texture.Dino.deadHeadF),
                SpriteClass.flip(Texture.Dino.deadHeadA),
                SpriteClass.flip(Texture.Dino.deadHeadG),
                SpriteClass.flip(Texture.Dino.deadHeadH),
                SpriteClass.flip(Texture.Dino.deadHeadI),
                SpriteClass.flip(Texture.Dino.deadHeadJ),
            ],
        };
    }
}