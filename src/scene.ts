import {Widgets} from "blessed";
import {Dino} from "./characters/dino";
import {EnemyMoveDirection, Pterosaur} from "./characters/pterosaur";
import Screen = Widgets.Screen;

export class Scene {
    private readonly _scr: Screen;

    private readonly _dino: Dino;
    private _pterosaur?: Pterosaur;

    constructor(scr: Screen) {
        this._scr = scr;
        this._pterosaur = new Pterosaur(scr, EnemyMoveDirection.MoveRight);
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