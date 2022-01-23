import {Widgets} from "blessed";
import Screen = Widgets.Screen;
import {Sprite} from "../sprite";
import {Texture} from "../resources/score";

export class Score extends Sprite {
    private static readonly WIDTH = 67;
    private static readonly HEIGHT = 5;

    constructor(scr: Screen) {
        super(scr, scr.width as number - Score.WIDTH - 1, 1, Score.WIDTH, Score.HEIGHT);
    }

    protected _onWindowResizeHandler(width: number, height: number): void {
        //TODO DZZ
        // console.log("Score", width, height);
    }

    update(): void {
        this._box.setContent(Texture.Score.text);
    }
}