import {State} from "../states";
import {Sprite} from "../resources/pterosaur_resources";

export class FlyLeft extends State {
    constructor() {
        super(Sprite.Pterosaur.left.fly);
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
        super(Sprite.Pterosaur.right.fly);
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