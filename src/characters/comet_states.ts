import {State} from "../states";
import {Sprite} from "../resources/comet_resources";

export class FallState extends State {
    constructor() {
        super(Sprite.Comet.fall, true);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.025;
    }
}