export enum GameDifficulty {
    Easy = "easy",
    Medium = "medium",
    Hard = "hard",
}

export class Options {
    static debug = {
        showColliders: false,
    };

    static maxScore: number = 99;

    static difficulty: GameDifficulty = GameDifficulty.Medium;
}