import {State} from "../states";
import {Sprite} from "../resources/raptor_resources";

export class RunLeft extends State {
    constructor() {
        super(Sprite.Raptor.left.run);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.08;
    }

    protected setFramesCount() {
        this._framesCount = 2;
    }

    isLeftDirection(): boolean {
        return true;
    }
}

export class RunRight extends State {
    constructor() {
        super(Sprite.Raptor.right.run);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.08;
    }

    protected setFramesCount() {
        this._framesCount = 2;
    }

    isLeftDirection(): boolean {
        return false;
    }
}