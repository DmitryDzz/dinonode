import {Sprite} from "../resources/heart_resources";
import {State} from "../states";

export type HeartStateType =
    "alive" | "dead" | "appear" | "disappear";

export class HeartStates {
    private readonly _states: Map<HeartStateType, HeartState>;

    constructor() {
        this._states = new Map<HeartStateType, HeartState>([
            ["alive", new AliveState()],
            ["dead", new DeadState()],
            ["appear", new AppearState()],
            ["disappear", new DisappearState()],
        ]);
    }

    getState(type: HeartStateType): HeartState {
        return this._states.get(type)!;
    }
}

export abstract class HeartState extends State {
    private readonly _type: HeartStateType;
    get type(): HeartStateType { return this._type; }

    protected constructor(type: HeartStateType, frames: string[]) {
        super(frames);
        this._type = type;
    }
}

export class AliveState extends HeartState {
    constructor() {
        super("alive", Sprite.Heart.alive);
    }

    protected setFrameDuration() {}
    protected setFramesCount() {}
}

export class DeadState extends HeartState {
    constructor() {
        super("dead", Sprite.Heart.dead);
    }

    protected setFrameDuration() {}
    protected setFramesCount() {}
}

export class AppearState extends HeartState {
    constructor() {
        super("appear", Sprite.Heart.appear);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.125;
    }

    protected setFramesCount() {
        this._framesCount = 2;
    }
}

export class DisappearState extends HeartState {
    constructor() {
        super("disappear", Sprite.Heart.disappear);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.125;
    }

    protected setFramesCount() {
        this._framesCount = 2;
    }
}
