import {State} from "../states";
import {Sprite} from "../resources/dino_resources";

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
            ["deadHeadL", new DeadHeadLeftState()],
            ["deadHeadR", new DeadHeadRightState()],
        ]);
    }

    getState(type: DinoStateType): DinoState {
        return this._states.get(type)!;
    }
}

export type DinoStateType =
    "idleL" | "idleR" | "runL" | "runR" | "jumpL" | "jumpR" | "leanIdleL" | "leanIdleR" | "leanRunL" | "leanRunR" |
    "deadL" | "deadR" | "deadHeadL" | "deadHeadR";

export abstract class DinoState extends State {
    private readonly _type: DinoStateType;
    get type(): DinoStateType { return this._type; }

    protected constructor(type: DinoStateType, frames: string[]) {
        super(frames);
        this._type = type;
    }

    protected setFramesCount() {
        this._framesCount = this._frames.length;
    }

    abstract isLeftDirection(): boolean;
}

export class IdleLeftState extends DinoState {
    constructor() {
        super("idleL", Sprite.Dino.left.idle);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.2;
    }

    isLeftDirection(): boolean {
        return true;
    }
}

export class IdleRightState extends DinoState {
    constructor() {
        super("idleR", Sprite.Dino.right.idle);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.2;
    }

    isLeftDirection(): boolean {
        return false;
    }
}

export class RunLeftState extends DinoState {
    constructor() {
        super("runL", Sprite.Dino.left.run);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.125;
    }

    isLeftDirection(): boolean {
        return true;
    }
}

export class RunRightState extends DinoState {
    constructor() {
        super("runR", Sprite.Dino.right.run);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.125;
    }

    isLeftDirection(): boolean {
        return false;
    }
}

export class JumpLeftState extends DinoState {
    constructor() {
        super("jumpL", Sprite.Dino.left.jump);
    }

    protected setFrameDuration() {}

    isLeftDirection(): boolean {
        return true;
    }
}

export class JumpRightState extends DinoState {
    constructor() {
        super("jumpR", Sprite.Dino.right.jump);
    }

    protected setFrameDuration() {}

    isLeftDirection(): boolean {
        return false;
    }
}

export class LeanIdleLeftState extends DinoState {
    constructor() {
        super("leanIdleL", Sprite.Dino.left.leanIdle);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.125;
    }

    isLeftDirection(): boolean {
        return true;
    }
}

export class LeanIdleRightState extends DinoState {
    constructor() {
        super("leanIdleR", Sprite.Dino.right.leanIdle);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.125;
    }

    isLeftDirection(): boolean {
        return false;
    }
}

export class LeanRunLeftState extends DinoState {
    constructor() {
        super("leanRunL", Sprite.Dino.left.leanRun);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.096;
    }

    isLeftDirection(): boolean {
        return true;
    }
}

export class LeanRunRightState extends DinoState {
    constructor() {
        super("leanRunR", Sprite.Dino.right.leanRun);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.096;
    }

    isLeftDirection(): boolean {
        return false;
    }
}

export class DeadLeftState extends DinoState {
    constructor() {
        super("deadL", Sprite.Dino.left.dead);
    }

    protected setFrameDuration() {}

    isLeftDirection(): boolean {
        return true;
    }
}

export class DeadRightState extends DinoState {
    constructor() {
        super("deadR", Sprite.Dino.right.dead);
    }

    protected setFrameDuration() {}

    isLeftDirection(): boolean {
        return false;
    }
}

export class DeadHeadLeftState extends DinoState {
    constructor() {
        super("deadHeadL", Sprite.Dino.left.deadHead);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.2;
    }

    isLeftDirection(): boolean {
        return true;
    }
}

export class DeadHeadRightState extends DinoState {
    constructor() {
        super("deadHeadR", Sprite.Dino.right.deadHead);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.125;
    }

    isLeftDirection(): boolean {
        return false;
    }
}
