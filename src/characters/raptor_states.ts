import {State} from "../states";
import {Raptor} from "./raptor";

export class RunLeft extends State {
    constructor() {
        super(Raptor.sprites.left.run);
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

export class RunRight extends State {
    constructor() {
        super(Raptor.sprites.right.run);
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