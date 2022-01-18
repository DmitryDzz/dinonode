import {Widgets} from "blessed";
import Screen = Widgets.Screen;
import {Dino} from "./dino";

export class Scene {
    private readonly _src: Screen;

    private readonly _dino: Dino;

    constructor(scr: Screen) {
        this._src = scr;
        this._dino = new Dino(scr);
    }

    destroy() {
        this._dino.destroy();
    }

    update() {
        this._dino.update();
    }
}