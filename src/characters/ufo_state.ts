import {State} from "../states";
import {Sprite} from "../resources/ufo_resources";

export class UfoState extends State {
    constructor() {
        super(Sprite.Ufo.idle, true);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.05;
    }
}