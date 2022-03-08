import {Application} from "./application";
import yargs from "yargs";
import {GameDifficulty, Options} from "./options";

const main = (): void => {
    const argv = yargs(process.argv.slice(2))
        .version("1.0.1")
        .alias("v", "version")
        .alias("h", "help")
        .options({
            s: {
                alias: "maxScore",
                type: "number",
                default: -1,
                description: "Score to win the game",
            },
            f: {
                alias: "maxSpeedFactor",
                type: "number",
                default: -1,
                description: "Maximum speed factor at the end of the game",
            },
            d: {
                alias: "difficulty",
                choices: [GameDifficulty.Easy, GameDifficulty.Medium, GameDifficulty.Hard],
                default: GameDifficulty.Medium,
                description: "Game difficulty"
            },
        })
        .check((args) => {
            if (isNaN(args.s))
                throw new Error("Wrong maxScore argument value. It should be a positive integer.");
            return true;
        })
        .parseSync();

    Options.difficulty = argv.d;
    const profile = Options.profiles.get(argv.d);

    const maxScore = Math.floor(argv.s);
    Options.maxScore = maxScore > 0 ? maxScore : profile!.maxScore;

    const maxSpeedFactor = argv.f;
    Options.maxSpeedFactor = maxSpeedFactor > 0 ? maxSpeedFactor : profile!.maxSpeedFactor;

    // console.log("difficulty:", Options.difficulty);
    // console.log("maxScore:", Options.maxScore);
    // console.log("maxSpeedFactor:", Options.maxSpeedFactor);

    const application: Application = new Application();
    application.start();
}

main();