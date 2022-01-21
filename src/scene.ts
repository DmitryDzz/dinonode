import {Widgets} from "blessed";
import {Dino} from "./dino";
import {MoveDirection, Pterosaur} from "./pterosaur";
import Screen = Widgets.Screen;

export class Scene {
    private readonly _scr: Screen;

    private readonly _dino: Dino;
    private _pterosaur?: Pterosaur;

    constructor(scr: Screen) {
        this._scr = scr;
        this._pterosaur = new Pterosaur(scr, MoveDirection.MoveRight);
        this._dino = new Dino(scr);
    }

    destroy() {
        this._pterosaur?.destroy();
        this._dino.destroy();
    }

    update() {
        this._dino.update();
        this._pterosaur?.update();
    }
}