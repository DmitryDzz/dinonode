import {Widgets} from "blessed";
import Screen = Widgets.Screen;
import {Sprite} from "../sprite";
import {Texture} from "../resources/heart_resources";
import {integer} from "../types";

export class Heart extends Sprite {
    private static readonly WIDTH = 10;
    private static readonly HEIGHT = 4;

    static readonly ALIVE_COLOR = "#F02000";
    static readonly DEAD_COLOR = "#606060";

    constructor(scr: Screen) {
        super(scr, 1, 1, Heart.WIDTH, Heart.HEIGHT, Heart.ALIVE_COLOR);
    }

    protected _onWindowResizeHandler(width: number, height: number): void {
        //TODO DZZ
        // console.log("Heart", width, height);
    }

    //TODO DZZ Remove this method, use animations instead.
    setColor(color: string) {
        const content = this._box.getContent();
        this._scr.remove(this._box);
        this._box = Sprite.createBox(this._column, this._row, this._width, this._height, color);
        this._scr.append(this._box);
        this._box.setContent(content);
    }

    get width(): integer {
        return Heart.WIDTH;
    }

    get height(): integer {
        return Heart.HEIGHT;
    }

    get column(): integer {
        return this._column;
    }

    set column(value: integer) {
        this._column = value;
        this._box.left = value;
    }

    get row(): integer {
        return this._row;
    }

    set row(value: integer) {
        this._row = value;
        this._box.top = value;
    }

    update(): void {
        this._box.setContent(Texture.Heart.alive);
    }
}