import {Widgets} from "blessed";
import {Dino} from "./characters/dino";
import {Pterosaur} from "./characters/pterosaur";
import {Raptor} from "./characters/raptor";
import {EnemyMoveDirection} from "./characters/enemy";
import Screen = Widgets.Screen;

export class Scene {
    private readonly _scr: Screen;

    private readonly _dino: Dino;
    private _pterosaur?: Pterosaur;
    private _raptor?: Raptor;

    constructor(scr: Screen) {
        this._scr = scr;
        this._dino = new Dino(scr);
        this._pterosaur = new Pterosaur(scr, EnemyMoveDirection.MoveRight);
        this._raptor = new Raptor(scr, EnemyMoveDirection.MoveRight);
    }

    destroy() {
        this._pterosaur?.destroy();
        this._raptor?.destroy();
        this._dino.destroy();
    }

    update() {
        this._dino.update();
        this._pterosaur?.update();
        this._raptor?.update();
    }
}