import {AfterAnimationCallback, State} from "../states";
import {Sprite} from "../resources/dino_resources";

export class DinoStates {
    private readonly _states: Map<DinoStateType, DinoState>;

    constructor(afterDeathAnimationCallback: AfterAnimationCallback) {
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
            ["deadL", new DeadLeftState(afterDeathAnimationCallback)],
            ["deadR", new DeadRightState(afterDeathAnimationCallback)],
            ["deadHeadL", new DeadHeadLeftState(afterDeathAnimationCallback)],
            ["deadHeadR", new DeadHeadRightState(afterDeathAnimationCallback)],
            ["deadTailL", new DeadTailLeftState(afterDeathAnimationCallback)],
            ["deadTailR", new DeadTailRightState(afterDeathAnimationCallback)],
            ["deadLegsL", new DeadLegsLeftState(afterDeathAnimationCallback)],
            ["deadLegsR", new DeadLegsRightState(afterDeathAnimationCallback)],
            ["deadBurnedL", new DeadBurnedLeftState(afterDeathAnimationCallback)],
            ["deadBurnedR", new DeadBurnedRightState(afterDeathAnimationCallback)],
        ]);
    }

    getState(type: DinoStateType): DinoState {
        return this._states.get(type)!;
    }
}

export type DinoStateType =
    "idleL" | "idleR" | "runL" | "runR" | "jumpL" | "jumpR" | "leanIdleL" | "leanIdleR" | "leanRunL" | "leanRunR" |
    "deadL" | "deadR" | "deadHeadL" | "deadHeadR" | "deadTailL" | "deadTailR" | "deadLegsL" | "deadLegsR" |
    "deadBurnedL" | "deadBurnedR";

export abstract class DinoState extends State {
    private readonly _type: DinoStateType;
    get type(): DinoStateType { return this._type; }

    protected constructor(type: DinoStateType, frames: string[], isLooped: boolean,
                          afterAnimationCallback: AfterAnimationCallback = null) {
        super(frames, isLooped, afterAnimationCallback);
        this._type = type;
    }

    abstract isLeftDirection(): boolean;
}

export class IdleLeftState extends DinoState {
    constructor() {
        super("idleL", Sprite.Dino.left.idle, true);
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
        super("idleR", Sprite.Dino.right.idle, true);
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
        super("runL", Sprite.Dino.left.run, true);
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
        super("runR", Sprite.Dino.right.run, true);
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
        super("jumpL", Sprite.Dino.left.jump, true);
    }

    protected setFrameDuration() {}

    isLeftDirection(): boolean {
        return true;
    }
}

export class JumpRightState extends DinoState {
    constructor() {
        super("jumpR", Sprite.Dino.right.jump, true);
    }

    protected setFrameDuration() {}

    isLeftDirection(): boolean {
        return false;
    }
}

export class LeanIdleLeftState extends DinoState {
    constructor() {
        super("leanIdleL", Sprite.Dino.left.leanIdle, true);
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
        super("leanIdleR", Sprite.Dino.right.leanIdle, true);
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
        super("leanRunL", Sprite.Dino.left.leanRun, true);
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
        super("leanRunR", Sprite.Dino.right.leanRun, true);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.096;
    }

    isLeftDirection(): boolean {
        return false;
    }
}

export class DeadLeftState extends DinoState {
    constructor(afterAnimationCallback: AfterAnimationCallback) {
        super("deadL", Sprite.Dino.left.dead, true, afterAnimationCallback);
    }

    protected setFrameDuration() {}

    isLeftDirection(): boolean {
        return true;
    }
}

export class DeadRightState extends DinoState {
    constructor(afterAnimationCallback: AfterAnimationCallback) {
        super("deadR", Sprite.Dino.right.dead, true, afterAnimationCallback);
    }

    protected setFrameDuration() {}

    isLeftDirection(): boolean {
        return false;
    }
}

export class DeadHeadLeftState extends DinoState {
    constructor(afterAnimationCallback: AfterAnimationCallback) {
        super("deadHeadL", Sprite.Dino.left.deadHead, false, afterAnimationCallback);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.2;
    }

    isLeftDirection(): boolean {
        return true;
    }
}

export class DeadHeadRightState extends DinoState {
    constructor(afterAnimationCallback: AfterAnimationCallback) {
        super("deadHeadR", Sprite.Dino.right.deadHead, false, afterAnimationCallback);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.125;
    }

    isLeftDirection(): boolean {
        return false;
    }
}

export class DeadTailLeftState extends DinoState {
    constructor(afterAnimationCallback: AfterAnimationCallback) {
        super("deadTailL", Sprite.Dino.left.deadTail, false, afterAnimationCallback);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.2;
    }

    isLeftDirection(): boolean {
        return true;
    }
}

export class DeadTailRightState extends DinoState {
    constructor(afterAnimationCallback: AfterAnimationCallback) {
        super("deadTailR", Sprite.Dino.right.deadTail, false, afterAnimationCallback);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.2;
    }

    isLeftDirection(): boolean {
        return false;
    }
}

export class DeadLegsLeftState extends DinoState {
    constructor(afterAnimationCallback: AfterAnimationCallback) {
        super("deadLegsL", Sprite.Dino.left.deadLegs, false, afterAnimationCallback);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.2;
    }

    isLeftDirection(): boolean {
        return true;
    }
}

export class DeadLegsRightState extends DinoState {
    constructor(afterAnimationCallback: AfterAnimationCallback) {
        super("deadLegsR", Sprite.Dino.right.deadLegs, false, afterAnimationCallback);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.2;
    }

    isLeftDirection(): boolean {
        return false;
    }
}

export class DeadBurnedLeftState extends DinoState {
    constructor(afterAnimationCallback: AfterAnimationCallback) {
        super("deadBurnedL", Sprite.Dino.left.deadBurned, false, afterAnimationCallback);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.1;
    }

    isLeftDirection(): boolean {
        return true;
    }
}

export class DeadBurnedRightState extends DinoState {
    constructor(afterAnimationCallback: AfterAnimationCallback) {
        super("deadBurnedR", Sprite.Dino.right.deadBurned, false, afterAnimationCallback);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.1;
    }

    isLeftDirection(): boolean {
        return false;
    }
}
