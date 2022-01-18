import {Time} from "./time";
import {Dino} from "./dino";

export class States {
    private readonly _states: Map<StateType, State>;

    constructor() {
        this._states = new Map<StateType, State>([
            ["idleL", new IdleLeftState()],
            ["idleR", new IdleRightState()],
            ["runL", new RunLeftState()],
            ["runR", new RunRightState()],
            ["jumpL", new JumpLeftState()],
            ["jumpR", new JumpRightState()],
            ["leanIdleL", new LeanIdleLeftState()],
            ["leanIdleR", new LeanIdleRightState()],
            ["leanRunL", new LeanRunLeftState()],
            ["leanRunR", new LeanRunRightState()],
            ["deadL", new DeadLeftState()],
            ["deadR", new DeadRightState()],
        ]);
    }

    getState(type: StateType): State {
        return this._states.get(type)!;
    }
}

export type StateType =
    "idleL" | "idleR" | "runL" | "runR" | "jumpL" | "jumpR" | "leanIdleL" | "leanIdleR" | "leanRunL" | "leanRunR" | "deadL" | "deadR";

export abstract class State {
    private readonly _type: StateType;
    get type(): StateType { return this._type; }

    protected _frameDuration: number = -1;
    protected _framesCount: number = 1;

    private _frameTime?: number;
    private _frameIndex: number = 0;

    protected abstract setFrameDuration(): void;
    protected abstract setFramesCount(): void;

    private readonly _frames: string[];

    protected constructor(type: StateType, frames: string[]) {
        this._type = type;
        this._frames = frames;
        this.setFrameDuration();
        this.setFramesCount();
        this.clear();
    }

    clear() {
        this._frameTime = undefined;
        this._frameIndex = 0;
    }

    private setNextFrame(): void {
        if (this._framesCount <= 1) return;
        this._frameIndex = (++this._frameIndex) % this._framesCount;
    }

    isFrameReady(): boolean {
        if (this._frameTime === undefined) {
            this._frameTime = Time.time;
            return true;
        }

        if (this._framesCount <= 1) {
            return false;
        }

        const time = Time.time;
        if (time - this._frameTime > this._frameDuration) {
            this._frameTime = time;
            this.setNextFrame();
            return true;
        }

        return false;
    }

    get frame(): string { return this._frames[this._frameIndex]; }

    isLeftDirection(): boolean {
        const t = this._type;
        return t === "idleL" || t === "runL" || t === "jumpL" || t === "leanIdleL" || t === "leanRunL" || t === "deadL";
    }
}

export class IdleLeftState extends State {
    constructor() {
        super("idleL", Dino.sprites.left.idle);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.2;
    }

    protected setFramesCount() {
        this._framesCount = 2;
    }
}

export class IdleRightState extends State {
    constructor() {
        super("idleR", Dino.sprites.right.idle);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.2;
    }

    protected setFramesCount() {
        this._framesCount = 2;
    }
}

export class RunLeftState extends State {
    constructor() {
        super("runL", Dino.sprites.left.run);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.125;
    }

    protected setFramesCount() {
        this._framesCount = 2;
    }
}

export class RunRightState extends State {
    constructor() {
        super("runR", Dino.sprites.right.run);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.125;
    }

    protected setFramesCount() {
        this._framesCount = 2;
    }
}

export class JumpLeftState extends State {
    constructor() {
        super("jumpL", Dino.sprites.left.jump);
    }

    protected setFrameDuration() {}
    protected setFramesCount() {}
}

export class JumpRightState extends State {
    constructor() {
        super("jumpR", Dino.sprites.right.jump);
    }

    protected setFrameDuration() {}
    protected setFramesCount() {}
}

export class LeanIdleLeftState extends State {
    constructor() {
        super("leanIdleL", Dino.sprites.left.leanIdle);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.125;
    }

    protected setFramesCount() {
        this._framesCount = 2;
    }
}

export class LeanIdleRightState extends State {
    constructor() {
        super("leanIdleR", Dino.sprites.right.leanIdle);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.125;
    }

    protected setFramesCount() {
        this._framesCount = 2;
    }
}

export class LeanRunLeftState extends State {
    constructor() {
        super("leanRunL", Dino.sprites.left.leanRun);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.125;
    }

    protected setFramesCount() {
        this._framesCount = 2;
    }
}

export class LeanRunRightState extends State {
    constructor() {
        super("leanRunR", Dino.sprites.right.leanRun);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.125;
    }

    protected setFramesCount() {
        this._framesCount = 2;
    }
}

export class DeadLeftState extends State {
    constructor() {
        super("deadL", Dino.sprites.left.dead);
    }

    protected setFrameDuration() {}
    protected setFramesCount() {}
}

export class DeadRightState extends State {
    constructor() {
        super("deadR", Dino.sprites.right.dead);
    }

    protected setFrameDuration() {}
    protected setFramesCount() {}
}