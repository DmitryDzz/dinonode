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

        static readonly deadTailA =
            "          ▄████████▄\n" +
            "          ██  ██████\n" +
            "          ██████████\n" +
            "          ████████▀▀\n" +
            "       ▗▄█████      \n" +
            "     ▄████████▀█    \n" +
            "     ▜████████      \n" +
            "      ███████▘      \n" +
            "      ██████▘       \n" +
            "     ▟█▀ ▀█         \n" +
            "     █▄   █▄        ";
        static readonly deadTailB =
            "          ▄████████▄\n" +
            "          ██  ██████\n" +
            "          ██████████\n" +
            "          ████████▀▀\n" +
            "       ▗▄█████      \n" +
            "     ▄████████▀█    \n" +
            "     ▜████████      \n" +
            "{#A02000-fg}  ▄▛▀▀{/}███████▘      \n" +
            "{#A02000-fg}   ▗▛▀{/}██████▘       \n" +
            "     ▟█▀ ▀█         \n" +
            "     █▄   █▄        ";
        static readonly deadTailC =
            "          ▄████████▄\n" +
            "          ██  ██████\n" +
            "          ██████████\n" +
            "          ████████▀▀\n" +
            "       ▗▄█████      \n" +
            "     ▄████████▀█    \n" +
            "     ▜████████      \n" +
            "{#A02000-fg} ▄▄▛▀▀{/}███████▘      \n" +
            "{#A02000-fg}▟▘ ▄▛▀{/}██████▘       \n" +
            "{#A02000-fg}▀  ▀ {/}▟█▀ ▀█         \n" +
            "     █▄   █▄        ";
        static readonly deadTailD =
            "          ▄████████▄\n" +
            "          ██  ██████\n" +
            "          ██████████\n" +
            "          ████████▀▀\n" +
            "       ▗▄█████      \n" +
            "     ▄████████▀█    \n" +
            "     ▜████████      \n" +
            "{#A02000-fg} ▄▄▛▀▀{/}███████▘      \n" +
            "{#A02000-fg}▟▘ ▄▛▀{/}██████▘       \n" +
            "{#A02000-fg}█  █{/} ▟█▀ ▀█         \n" +
            "{#A02000-fg}█  █{/} █▄   █▄        ";
        static readonly deadTailE =
            "          ▄████████▄\n" +
            "          ██  ██████\n" +
            "          ██████████\n" +
            "          ████████▀▀\n" +
            "       ▗▄█████      \n" +
            "     ▄████████▀█    \n" +
            "     ▜████████      \n" +
            "{#A02000-fg} ▄   {/} ███████▘      \n" +
            "{#A02000-fg}▟▘ ▟▘{/} ██████▘       \n" +
            "{#A02000-fg}█  █ {/}▟█▀ ▀█         \n" +
            "{#A02000-fg}█▄ █▄{/}█▄   █▄        ";
        static readonly deadTailF =
            "          ▄████████▄\n" +
            "          ██  ██████\n" +
            "          ██████████\n" +
            "          ████████▀▀\n" +
            "       ▗▄█████      \n" +
            "     ▄████████▀█    \n" +
            "     ▜████████      \n" +
            "      ███████▘      \n" +
            "      ██████▘       \n" +
            "{#A02000-fg}▄  ▄ {/}▟█▀ ▀█         \n" +
            "{#A02000-fg}█▄▄█▄{/}█▄   █▄        ";
        static readonly deadTailG =
            "          ▄████████▄\n" +
            "          ██  ██████\n" +
            "          ██████████\n" +
            "          ████████▀▀\n" +
            "       ▗▄█████      \n" +
            "     ▄████████▀█    \n" +
            "     ▜████████      \n" +
            "      ███████▘      \n" +
            "      ██████▘       \n" +
            "     ▟█▀ ▀█         \n" +
            "{#A02000-fg}▄▄▄▄▄{/}█▄   █▄        ";
        static readonly deadTailH =
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "          ▄████████▄\n" +
            "          ██▄▄██████\n" +
            "          ██████████\n" +
            "       ▄██████████▀▀\n" +
            "      ████████▜▖    \n" +
            "     ▟███████ ▄█    \n" +
            "{#A02000-fg}   ▄▄██▀{/}▄█▀         ";
        static readonly deadTailI =
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "       ▄█████████▄  \n" +
            "     ▄████████████▄ \n" +
            "{#A02000-fg}▄▒▒▒▒▒▒▒▒▒{/}█████████▄";
        static readonly deadTailJ =
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "       ▄█████████▄  \n" +
            "     ▄████████████▄ \n" +
            "{#A02000-fg}▄▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒{/}███▄";
        static readonly deadTailK =
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "       ▄█████████▄  \n" +
            "     ▄████████████▄ \n" +
            "{#A02000-fg}▄▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄{/}";

        static readonly deadLegsA =
            "          ▄████████▄\n" +
            "          ██  ██████\n" +
            "          ██████████\n" +
            "          ████████▀▀\n" +
            "█      ▗▄█████      \n" +
            "██▄  ▄████████▀█    \n" +
            "▜█████████████      \n" +
            " ▀███████████▘      \n" +
            "   ▀████████▘       \n" +
            "     ██▀ ▘▝         \n" +
            "     █▄             ";
        static readonly deadLegsB =
            "          ▄████████▄\n" +
            "          ██  ██████\n" +
            "          ██████████\n" +
            "          ████████▀▀\n" +
            "█      ▗▄█████      \n" +
            "██▄  ▄████████▀█    \n" +
            "▜█████████████      \n" +
            " ▀███████████▘      \n" +
            "   ▀████████▘       \n" +
            "     ██▀ ▌▐         \n" +
            "     █▄             ";
        static readonly deadLegsC =
            "          ▄████████▄\n" +
            "          ██  ██████\n" +
            "          ██████████\n" +
            "          ████████▀▀\n" +
            "█      ▗▄█████      \n" +
            "██▄  ▄████████▀█    \n" +
            "▜█████████████      \n" +
            " ▀███████████▘      \n" +
            "   ▀████████▘       \n" +
            "     ██▀ ▌▐         \n" +
            "     █▄  ▘▝         ";
        static readonly deadLegsD =
            "          ▄████████▄\n" +
            "          ██  ██████\n" +
            "          ██████████\n" +
            "          ████████▀▀\n" +
            "█      ▗▄█████      \n" +
            "██▄  ▄████████▀█    \n" +
            "▜█████████████      \n" +
            " ▀███████████▘      \n" +
            "   ▀████████▘       \n" +
            "     ██▀ ▖▗         \n" +
            "     █▄  ▌▐         ";
        static readonly deadLegsE =
            "          ▄████████▄\n" +
            "          ██  ██████\n" +
            "          ██████████\n" +
            "          ████████▀▀\n" +
            "█      ▗▄█████      \n" +
            "██▄  ▄████████▀█    \n" +
            "▜█████████████      \n" +
            " ▀███████████▘      \n" +
            "   ▀████████▘       \n" +
            "     ██▀ ▘▝         \n" +
            "     █▄ ▗▙▟▖        ";
        static readonly deadLegsF =
            "          ▄████████▄\n" +
            "          ██  ██████\n" +
            "          ██████████\n" +
            "          ████████▀▀\n" +
            "█      ▗▄█████      \n" +
            "██▄  ▄████████▀█    \n" +
            "▜█████████████      \n" +
            " ▀███████████▘      \n" +
            "   ▀████████▘       \n" +
            "     ██▀ ▖▗         \n" +
            "     █▄ ▄▄▄▄        ";
        static readonly deadLegsG =
            "          ▄████████▄\n" +
            "          ██  ██████\n" +
            "          ██████████\n" +
            "          ████████▀▀\n" +
            "█      ▗▄█████      \n" +
            "██▄  ▄████████▀█    \n" +
            "▜█████████████      \n" +
            " ▀███████████▘      \n" +
            "   ▀████████▘       \n" +
            "     ██▀            \n" +
            "     █▄▄▄▙▟▄▄       ";
        static readonly deadLegsH =
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "          ▄████████▄\n" +
            "▄▄        ██▄▄██████\n" +
            " ███▄     ██████████\n" +
            "  ▜███▙▄██████████▀▀\n" +
            "   ▀██████████▜▖    \n" +
            "     ▟███████ ▄█    \n" +
            "   ▄▄██▄▄█▄█▄▄      ";
        static readonly deadLegsI =
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
            "▄██████████████████▄";
        static readonly deadLegsJ =
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
            "▄██████████████████▄";
        static readonly deadLegsK =
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
            "▄██████████████████▄";
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
        deadTail: string[];
        deadLegs: string[];
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
            deadTail: [
                Texture.Dino.deadTailA,
                Texture.Dino.deadTailB,
                Texture.Dino.deadTailC,
                Texture.Dino.deadTailD,
                Texture.Dino.deadTailE,
                Texture.Dino.deadTailF,
                Texture.Dino.deadTailG,
                Texture.Dino.deadTailH,
                Texture.Dino.deadTailI,
                Texture.Dino.deadTailJ,
                Texture.Dino.deadTailK,
            ],
            deadLegs: [
                Texture.Dino.deadLegsA,
                Texture.Dino.deadLegsB,
                Texture.Dino.deadLegsC,
                Texture.Dino.deadLegsD,
                Texture.Dino.deadLegsE,
                Texture.Dino.deadLegsF,
                Texture.Dino.deadLegsG,
                Texture.Dino.deadLegsH,
                Texture.Dino.deadLegsI,
                Texture.Dino.deadLegsJ,
                Texture.Dino.deadLegsK,
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
            deadTail: [
                SpriteClass.flip(Texture.Dino.deadTailA),
                SpriteClass.flip(Texture.Dino.deadTailB),
                SpriteClass.flip(Texture.Dino.deadTailC),
                SpriteClass.flip(Texture.Dino.deadTailD),
                SpriteClass.flip(Texture.Dino.deadTailE),
                SpriteClass.flip(Texture.Dino.deadTailF),
                SpriteClass.flip(Texture.Dino.deadTailG),
                SpriteClass.flip(Texture.Dino.deadTailH),
                SpriteClass.flip(Texture.Dino.deadTailI),
                SpriteClass.flip(Texture.Dino.deadTailJ),
                SpriteClass.flip(Texture.Dino.deadTailK),
            ],
            deadLegs: [
                SpriteClass.flip(Texture.Dino.deadLegsA),
                SpriteClass.flip(Texture.Dino.deadLegsB),
                SpriteClass.flip(Texture.Dino.deadLegsC),
                SpriteClass.flip(Texture.Dino.deadLegsD),
                SpriteClass.flip(Texture.Dino.deadLegsE),
                SpriteClass.flip(Texture.Dino.deadLegsF),
                SpriteClass.flip(Texture.Dino.deadLegsG),
                SpriteClass.flip(Texture.Dino.deadLegsH),
                SpriteClass.flip(Texture.Dino.deadLegsI),
                SpriteClass.flip(Texture.Dino.deadLegsJ),
                SpriteClass.flip(Texture.Dino.deadLegsK),
            ],
        };
    }
}