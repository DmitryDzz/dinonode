import {Application} from "./application";
import yargs from "yargs";
import {GameDifficulty, Options} from "./options";

const main = (): void => {
    const argv = yargs(process.argv.slice(2))
        .version("1.0.1")
        .options({
            s: {
                alias: "maxScore",
                type: "number",
                default: 10,
                description: "Score to win the game",
            },
            d: {
                alias: "difficulty",
                choices: [GameDifficulty.Easy, GameDifficulty.Medium, GameDifficulty.Hard],
                default: GameDifficulty.Medium,
                description: "Game difficulty"
            },
        })
        .check((args) => {
            if (isNaN(args.s) || args.s <= 0)
                throw new Error("Wrong maxScore argument value. It should be a positive integer.");
            return true;
        })
        .parseSync();

    Options.maxScore = Math.floor(argv.s);
    Options.difficulty = argv.d;

    console.log(Options.maxScore);
    console.log(Options.difficulty);

    const application: Application = new Application();
    application.start();
}

main();