import {Dino} from "./dino";
import {State} from "../states";

export class DinoStates {
    private readonly _states: Map<DinoStateType, DinoState>;

    constructor() {
        this._states = new Map<DinoStateType, DinoState>([
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

    getState(type: DinoStateType): DinoState {
        return this._states.get(type)!;
    }
}

export type DinoStateType =
    "idleL" | "idleR" | "runL" | "runR" | "jumpL" | "jumpR" | "leanIdleL" | "leanIdleR" | "leanRunL" | "leanRunR" | "deadL" | "deadR";

export abstract class DinoState extends State {
    private readonly _type: DinoStateType;
    get type(): DinoStateType { return this._type; }

    protected constructor(type: DinoStateType, frames: string[]) {
        super(frames);
        this._type = type;
    }

}

export class IdleLeftState extends DinoState {
    constructor() {
        super("idleL", Dino.sprites.left.idle);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.2;
    }

    protected setFramesCount() {
        this._framesCount = 2;
    }

    isLeftDirection(): boolean {
        return true;
    }
}

export class IdleRightState extends DinoState {
    constructor() {
        super("idleR", Dino.sprites.right.idle);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.2;
    }

    protected setFramesCount() {
        this._framesCount = 2;
    }

    isLeftDirection(): boolean {
        return false;
    }
}

export class RunLeftState extends DinoState {
    constructor() {
        super("runL", Dino.sprites.left.run);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.125;
    }

    protected setFramesCount() {
        this._framesCount = 2;
    }

    isLeftDirection(): boolean {
        return true;
    }
}

export class RunRightState extends DinoState {
    constructor() {
        super("runR", Dino.sprites.right.run);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.125;
    }

    protected setFramesCount() {
        this._framesCount = 2;
    }

    isLeftDirection(): boolean {
        return false;
    }
}

export class JumpLeftState extends DinoState {
    constructor() {
        super("jumpL", Dino.sprites.left.jump);
    }

    protected setFrameDuration() {}
    protected setFramesCount() {}

    isLeftDirection(): boolean {
        return true;
    }
}

export class JumpRightState extends DinoState {
    constructor() {
        super("jumpR", Dino.sprites.right.jump);
    }

    protected setFrameDuration() {}
    protected setFramesCount() {}

    isLeftDirection(): boolean {
        return false;
    }
}

export class LeanIdleLeftState extends DinoState {
    constructor() {
        super("leanIdleL", Dino.sprites.left.leanIdle);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.125;
    }

    protected setFramesCount() {
        this._framesCount = 2;
    }

    isLeftDirection(): boolean {
        return true;
    }
}

export class LeanIdleRightState extends DinoState {
    constructor() {
        super("leanIdleR", Dino.sprites.right.leanIdle);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.125;
    }

    protected setFramesCount() {
        this._framesCount = 2;
    }

    isLeftDirection(): boolean {
        return false;
    }
}

export class LeanRunLeftState extends DinoState {
    constructor() {
        super("leanRunL", Dino.sprites.left.leanRun);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.125;
    }

    protected setFramesCount() {
        this._framesCount = 2;
    }

    isLeftDirection(): boolean {
        return true;
    }
}

export class LeanRunRightState extends DinoState {
    constructor() {
        super("leanRunR", Dino.sprites.right.leanRun);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.125;
    }

    protected setFramesCount() {
        this._framesCount = 2;
    }

    isLeftDirection(): boolean {
        return false;
    }
}

export class DeadLeftState extends DinoState {
    constructor() {
        super("deadL", Dino.sprites.left.dead);
    }

    protected setFrameDuration() {}
    protected setFramesCount() {}

    isLeftDirection(): boolean {
        return true;
    }
}

export class DeadRightState extends DinoState {
    constructor() {
        super("deadR", Dino.sprites.right.dead);
    }

    protected setFrameDuration() {}
    protected setFramesCount() {}

    isLeftDirection(): boolean {
        return false;
    }
}