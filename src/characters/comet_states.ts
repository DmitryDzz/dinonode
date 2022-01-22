import {State} from "../states";
import {Sprite} from "../resources/comet_resources";

export class Fall extends State {
    constructor() {
        super(Sprite.Comet.fall);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.025;
    }

    protected setFramesCount() {
        this._framesCount = 3;
    }

    isLeftDirection(): boolean {
        return false;
    }
}