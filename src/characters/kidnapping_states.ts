import {AfterAnimationCallback, State} from "../states";
import {Sprite} from "../resources/kidnapping_resources";

export abstract class KidnappingState extends State {
    protected static readonly FRAME_DURATION = 0.075;
}

export class KidnappingLeftState extends KidnappingState {
    constructor(afterAnimationCallback: AfterAnimationCallback) {
        super(Sprite.Kidnapping.left.light, false, afterAnimationCallback);
    }

    protected setFrameDuration() {
        this._frameDuration = KidnappingState.FRAME_DURATION;
    }
}

export class KidnappingRightState extends KidnappingState {
    constructor(afterAnimationCallback: AfterAnimationCallback) {
        super(Sprite.Kidnapping.right.light, false, afterAnimationCallback);
    }

    protected setFrameDuration() {
        this._frameDuration = KidnappingState.FRAME_DURATION;
    }
}