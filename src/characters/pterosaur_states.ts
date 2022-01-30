import {State} from "../states";
import {Sprite} from "../resources/pterosaur_resources";

export abstract class PterosaurState extends State {
    abstract isLeftDirection(): boolean;
}

export class FlyLeftState extends PterosaurState {
    constructor() {
        super(Sprite.Pterosaur.left.fly, true);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.125;
    }

    isLeftDirection(): boolean {
        return true;
    }
}

export class FlyRightState extends PterosaurState {
    constructor() {
        super(Sprite.Pterosaur.right.fly, true);
    }

    protected setFrameDuration() {
        this._frameDuration = 0.125;
    }

    isLeftDirection(): boolean {
        return false;
    }
}