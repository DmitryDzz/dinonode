export enum GameDifficulty {
    Easy = "easy",
    Medium = "medium",
    Hard = "hard",
}

export interface GameProfile {
    maxScore: number;
    maxSpeedFactor: number;
}

export class Options {
    static debug = {
        showColliders: false,
    };

    static readonly profiles: Map<GameDifficulty, GameProfile> = new Map<GameDifficulty, GameProfile>([
        [GameDifficulty.Easy, {maxScore: 99, maxSpeedFactor: 1.0}],
        [GameDifficulty.Medium, {maxScore: 499, maxSpeedFactor: 1.2}],
        [GameDifficulty.Hard, {maxScore: 999, maxSpeedFactor: 1.5}],
    ]);

    static difficulty: GameDifficulty = GameDifficulty.Medium;
    static maxScore: number = Options.profiles.get(Options.difficulty)!.maxScore;
    static maxSpeedFactor: number = Options.profiles.get(Options.difficulty)!.maxSpeedFactor;
}