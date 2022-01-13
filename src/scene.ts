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

    update(time: number) {
        this._dino.update(time);
    }
}