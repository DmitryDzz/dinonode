import {State} from "../states";
import {Pterosaur} from "./pterosaur";

export class FlyLeft extends State {
    constructor() {
        super(Pterosaur.sprites.left.fly);
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

export class FlyRight extends State {
    constructor() {
        super(Pterosaur.sprites.right.fly);
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