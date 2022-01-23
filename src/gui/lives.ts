import {Widgets} from "blessed";
import Screen = Widgets.Screen;
import {Sprite} from "../sprite";
import {Texture} from "../resources/lives";

export class Lives extends Sprite {
    private static readonly WIDTH = 32;
    private static readonly HEIGHT = 4;

    constructor(scr: Screen) {
        super(scr, 1, 1, Lives.WIDTH, Lives.HEIGHT);
    }

    protected _onWindowResizeHandler(width: number, height: number): void {
        //TODO DZZ
        // console.log("Lives", width, height);
    }

    update(): void {
        this._box.setContent(Texture.Lives.hearts);
    }
}