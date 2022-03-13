import {Sprite as SpriteClass} from "../sprite";

export namespace Texture {
    export class Kidnapping {
        static readonly BASE_COLOR = "#ffee95";

        static readonly lightA =
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "               ▄████████▄      \n" +
            "               ██▄███████      \n" +
            "               ██████████      \n" +
            "               █████▄▄▄        \n" +
            "     █      ▗▄█████            \n" +
            "     ██▄  ▄████████▀█          \n" +
            "     ▜█████████████            \n" +
            "      ▀███████████▘            \n" +
            "        ▀████████▘             \n" +
            "          ██▀ ▀█               \n" +
            "          █▄   █▄              ";
        static readonly lightB =
            "         ░           ░         \n" +
            "         ░           ░         \n" +
            "        ░             ░        \n" +
            "        ░             ░        \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                ▄▄▄▄▄▄▄▄       \n" +
            "               ██▀███████      \n" +
            "               ██████████      \n" +
            "               █████▀▀▀▀▀      \n" +
            "     ▟▘     ▗▄█████▀▀▀▀        \n" +
            "     ██▄  ▄████████▀█          \n" +
            "     ▜█████████████            \n" +
            "      ▀███████████▘            \n" +
            "        ▀████████▘             \n" +
            "          ██▀ ▀█               \n" +
            "          █▄ _ █▄              ";
        static readonly lightC =
            "         ░           ░         \n" +
            "         ░           ░         \n" +
            "        ░             ░        \n" +
            "        ░             ░        \n" +
            "       ░               ░       \n" +
            "       ░               ░       \n" +
            "      ░                 ░      \n" +
            "      ░                 ░      \n" +
            "                               \n" +
            "               ▄████████▄      \n" +
            "               ██▄███████      \n" +
            "               ██████████      \n" +
            "               █████▄▄▄        \n" +
            "     █      ▗▄█████            \n" +
            "     ██▄  ▄████████▀█          \n" +
            "     ▜█████████████            \n" +
            "      ▀███████████▘            \n" +
            "        ▀████████▘             \n" +
            "          ██▀ ▀█               \n" +
            "          █▄___█▄___           ";
        static readonly lightD =
            "         ░           ░         \n" +
            "         ░           ░         \n" +
            "        ░             ░        \n" +
            "        ░             ░        \n" +
            "       ░               ░       \n" +
            "       ░               ░       \n" +
            "      ░                 ░      \n" +
            "      ░                 ░      \n" +
            "     ░                   ░     \n" +
            "                ▄▄▄▄▄▄▄▄ ░     \n" +
            "    ░          ██▀███████ ░    \n" +
            "    ░          ██████████ ░    \n" +
            "               █████▀▀▀▀▀      \n" +
            "     ▟▘     ▗▄█████▀▀▀▀        \n" +
            "     ██▄  ▄████████▀█          \n" +
            "     ▜█████████████            \n" +
            "      ▀███████████▘            \n" +
            "        ▀████████▘             \n" +
            "          ██▀ ▀█               \n" +
            "        __█▄___█▄_____         ";
        static readonly lightE =
            "         ░           ░         \n" +
            "         ░           ░         \n" +
            "        ░             ░        \n" +
            "        ░             ░        \n" +
            "       ░               ░       \n" +
            "       ░               ░       \n" +
            "      ░                 ░      \n" +
            "      ░                 ░      \n" +
            "     ░                   ░     \n" +
            "     ░         ▄████████▄░     \n" +
            "    ░          ██  ██████ ░    \n" +
            "    ░          ██████████ ░    \n" +
            "   ░           █████▄▄▄    ░   \n" +
            "   ░ █      ▗▄█████        ░   \n" +
            "  ░  ██▄  ▄████████▀█       ░  \n" +
            "  ░  ▜█████████████         ░  \n" +
            "      ▀███████████▘            \n" +
            "        ▀████████▘             \n" +
            "          ██▀ ▀█               \n" +
            "      ____█▄___█▄_______       ";
        static readonly lightF =
            "         ░           ░         \n" +
            "         ░           ░         \n" +
            "        ░             ░        \n" +
            "        ░             ░        \n" +
            "       ░               ░       \n" +
            "       ░               ░       \n" +
            "      ░                 ░      \n" +
            "      ░                 ░      \n" +
            "     ░                   ░     \n" +
            "     ░         ▄████████▄░     \n" +
            "    ░          ██  ██████ ░    \n" +
            "    ░          ██████████ ░    \n" +
            "   ░           █████▄▄▄    ░   \n" +
            "   ░ █      ▗▄█████        ░   \n" +
            "  ░  ██▄  ▄████████▀█       ░  \n" +
            "  ░  ▜█████████████         ░  \n" +
            " ░    ▀███████████▘          ░ \n" +
            " ░      ▀████████▘           ░ \n" +
            "░         ██▀ ▀█              ░\n" +
            "░   ______█▄___█▄_________    ░";
        static readonly lightG =
            "         ░           ░         \n" +
            "         ░           ░         \n" +
            "        ░             ░        \n" +
            "        ░             ░        \n" +
            "       ░               ░       \n" +
            "       ░               ░       \n" +
            "      ░        ▄██████▄ ░      \n" +
            "      ░        ██▙▟████ ░      \n" +
            "     ░        ▄██████▀▀  ░     \n" +
            "     ░ █▄   ▄██████      ░     \n" +
            "    ░  ▜██▄████████▀▌     ░    \n" +
            "    ░   ▜█████████        ░    \n" +
            "   ░     ▀██████▀          ░   \n" +
            "   ░       ▀█ ▀█           ░   \n" +
            "  ░         ▀▘ ▀▘           ░  \n" +
            "  ░                         ░  \n" +
            " ░                           ░ \n" +
            " ░                           ░ \n" +
            "░                             ░\n" +
            "░          ________           ░";
        static readonly lightH =
            "         ░     ▄████▄░         \n" +
            "         ░     █▙▟███░         \n" +
            "        ░▙   ▄███▀▀▘  ░        \n" +
            "        ░▜█▄████▛▀    ░        \n" +
            "       ░  ▝▜███▛       ░       \n" +
            "       ░     ▙ ▙       ░       \n" +
            "      ░                 ░      \n" +
            "      ░                 ░      \n" +
            "     ░                   ░     \n" +
            "     ░                   ░     \n" +
            "    ░                     ░    \n" +
            "    ░                     ░    \n" +
            "   ░                       ░   \n" +
            "   ░                       ░   \n" +
            "  ░                         ░  \n" +
            "  ░                         ░  \n" +
            " ░                           ░ \n" +
            " ░                           ░ \n" +
            "░                             ░\n" +
            "░                             ░";
        static readonly lightI =
            "         ░           ░         \n" +
            "         ░           ░         \n" +
            "        ░             ░        \n" +
            "        ░             ░        \n" +
            "       ░               ░       \n" +
            "       ░               ░       \n" +
            "      ░                 ░      \n" +
            "      ░                 ░      \n" +
            "     ░                   ░     \n" +
            "     ░                   ░     \n" +
            "    ░                     ░    \n" +
            "    ░                     ░    \n" +
            "   ░                       ░   \n" +
            "   ░                       ░   \n" +
            "  ░                         ░  \n" +
            "  ░                         ░  \n" +
            " ░                           ░ \n" +
            " ░                           ░ \n" +
            "░                             ░\n" +
            "░                             ░";
        static readonly lightJ =
            "         ░           ░         \n" +
            "         ░           ░         \n" +
            "        ░             ░        \n" +
            "        ░             ░        \n" +
            "       ░               ░       \n" +
            "       ░               ░       \n" +
            "      ░                 ░      \n" +
            "      ░                 ░      \n" +
            "     ░                   ░     \n" +
            "     ░                   ░     \n" +
            "    ░                     ░    \n" +
            "    ░                     ░    \n" +
            "   ░                       ░   \n" +
            "   ░                       ░   \n" +
            "  ░                         ░  \n" +
            "  ░                         ░  \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               ";
        static readonly lightK =
            "         ░           ░         \n" +
            "         ░           ░         \n" +
            "        ░             ░        \n" +
            "        ░             ░        \n" +
            "       ░               ░       \n" +
            "       ░               ░       \n" +
            "      ░                 ░      \n" +
            "      ░                 ░      \n" +
            "     ░                   ░     \n" +
            "     ░                   ░     \n" +
            "    ░                     ░    \n" +
            "    ░                     ░    \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               ";
        static readonly lightL =
            "         ░           ░         \n" +
            "         ░           ░         \n" +
            "        ░             ░        \n" +
            "        ░             ░        \n" +
            "       ░               ░       \n" +
            "       ░               ░       \n" +
            "      ░                 ░      \n" +
            "      ░                 ░      \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               ";
        static readonly lightM =
            "         ░           ░         \n" +
            "         ░           ░         \n" +
            "        ░             ░        \n" +
            "        ░             ░        \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               ";
        static readonly lightN =
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               \n" +
            "                               ";
    }
}

export namespace Sprite {
    export interface KidnappingAnimations {
        light: string[];
    }

    export class Kidnapping {
        static readonly right: KidnappingAnimations = {
            light: [
                Texture.Kidnapping.lightA,
                Texture.Kidnapping.lightB,
                Texture.Kidnapping.lightC,
                Texture.Kidnapping.lightD,
                Texture.Kidnapping.lightE,
                Texture.Kidnapping.lightF, //1
                Texture.Kidnapping.lightF, //2
                Texture.Kidnapping.lightF, //3
                Texture.Kidnapping.lightF, //4
                Texture.Kidnapping.lightF, //5
                Texture.Kidnapping.lightF, //6
                Texture.Kidnapping.lightG,
                Texture.Kidnapping.lightH,
                Texture.Kidnapping.lightI,
                Texture.Kidnapping.lightJ,
                Texture.Kidnapping.lightK,
                Texture.Kidnapping.lightL,
                Texture.Kidnapping.lightM,
                Texture.Kidnapping.lightN, //1
                Texture.Kidnapping.lightN, //2
                Texture.Kidnapping.lightN, //3
                Texture.Kidnapping.lightN, //4
                Texture.Kidnapping.lightN, //5
                Texture.Kidnapping.lightN, //6
                Texture.Kidnapping.lightN, //7
                Texture.Kidnapping.lightN, //8
                Texture.Kidnapping.lightN, //9
                Texture.Kidnapping.lightN, //10
                Texture.Kidnapping.lightN, //11
                Texture.Kidnapping.lightN, //12
                Texture.Kidnapping.lightN, //13
                Texture.Kidnapping.lightN, //14
                Texture.Kidnapping.lightN, //15
                Texture.Kidnapping.lightN, //16
            ],
        };

        static readonly left: KidnappingAnimations = {
            light: [
                SpriteClass.flip(Texture.Kidnapping.lightA),
                SpriteClass.flip(Texture.Kidnapping.lightB),
                SpriteClass.flip(Texture.Kidnapping.lightC),
                SpriteClass.flip(Texture.Kidnapping.lightD),
                SpriteClass.flip(Texture.Kidnapping.lightE),
                SpriteClass.flip(Texture.Kidnapping.lightF), //1
                SpriteClass.flip(Texture.Kidnapping.lightF), //2
                SpriteClass.flip(Texture.Kidnapping.lightF), //3
                SpriteClass.flip(Texture.Kidnapping.lightF), //4
                SpriteClass.flip(Texture.Kidnapping.lightF), //5
                SpriteClass.flip(Texture.Kidnapping.lightF), //6
                SpriteClass.flip(Texture.Kidnapping.lightG),
                SpriteClass.flip(Texture.Kidnapping.lightH),
                SpriteClass.flip(Texture.Kidnapping.lightI),
                SpriteClass.flip(Texture.Kidnapping.lightJ),
                SpriteClass.flip(Texture.Kidnapping.lightK),
                SpriteClass.flip(Texture.Kidnapping.lightL),
                SpriteClass.flip(Texture.Kidnapping.lightM),
                SpriteClass.flip(Texture.Kidnapping.lightN), //1
                SpriteClass.flip(Texture.Kidnapping.lightN), //2
                SpriteClass.flip(Texture.Kidnapping.lightN), //3
                SpriteClass.flip(Texture.Kidnapping.lightN), //4
                SpriteClass.flip(Texture.Kidnapping.lightN), //5
                SpriteClass.flip(Texture.Kidnapping.lightN), //6
                SpriteClass.flip(Texture.Kidnapping.lightN), //7
                SpriteClass.flip(Texture.Kidnapping.lightN), //8
                SpriteClass.flip(Texture.Kidnapping.lightN), //9
                SpriteClass.flip(Texture.Kidnapping.lightN), //10
                SpriteClass.flip(Texture.Kidnapping.lightN), //11
                SpriteClass.flip(Texture.Kidnapping.lightN), //12
                SpriteClass.flip(Texture.Kidnapping.lightN), //13
                SpriteClass.flip(Texture.Kidnapping.lightN), //14
                SpriteClass.flip(Texture.Kidnapping.lightN), //15
                SpriteClass.flip(Texture.Kidnapping.lightN), //16
            ],
        };
    }
}