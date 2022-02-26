import {AfterAnimationCallback, State} from "../states";
import {Sprite} from "../resources/raptor_resources";

export abstract class RaptorState extends State {
    abstract isLeftDirection(): boolean;
}

export class RunLeftState extends RaptorState {
    constructor() {
        super(Sprite.Raptor.left.run, true);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.08;
    }

    isLeftDirection(): boolean {
        return true;
    }
}

export class RunRightState extends RaptorState {
    constructor() {
        super(Sprite.Raptor.right.run, true);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.08;
    }

    isLeftDirection(): boolean {
        return false;
    }
}

export class DeadLeftState extends RaptorState {
    constructor(afterAnimationCallback: AfterAnimationCallback) {
        super(Sprite.Raptor.left.dead, false, afterAnimationCallback);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.125;
    }

    isLeftDirection(): boolean {
        return true;
    }
}

export class DeadRightState extends RaptorState {
    constructor(afterAnimationCallback: AfterAnimationCallback) {
        super(Sprite.Raptor.right.dead, false, afterAnimationCallback);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.125;
    }

    isLeftDirection(): boolean {
        return false;
    }
}
