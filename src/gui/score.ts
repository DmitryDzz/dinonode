import {Widgets} from "blessed";
import Screen = Widgets.Screen;
import {Sprite} from "../sprite";
import {Texture} from "../resources/score";
import BoxElement = Widgets.BoxElement;
import {Options} from "../options";

export class Score extends Sprite {
    private static readonly DESCR_WIDTH = 27;
    private static readonly DIGIT_WIDTH = 4;
    private static readonly HEIGHT = 3;
    private static readonly TOP = 1;
    private static readonly DESCR_RIGHT = 43;
    private static readonly DIGIT_2_RIGHT = 15;
    private static readonly DIGIT_1_RIGHT = 10;
    private static readonly DIGIT_0_RIGHT = 5;

    private readonly _boxD2: BoxElement;
    private readonly _boxD1: BoxElement;
    private readonly _boxD0: BoxElement;

    private _value: number = 0;

    private static readonly COLOR = "#008000";

    constructor(scr: Screen) {
        const w = scr.width as number;
        super(scr, scr.width as number - Score.DESCR_RIGHT, Score.TOP, Score.DESCR_WIDTH, Score.HEIGHT, Score.COLOR);
        this._boxD2 = Sprite.createBox(w - Score.DIGIT_2_RIGHT, Score.TOP, Score.DIGIT_WIDTH, Score.HEIGHT, Score.COLOR);
        this._boxD1 = Sprite.createBox(w - Score.DIGIT_1_RIGHT, Score.TOP, Score.DIGIT_WIDTH, Score.HEIGHT, Score.COLOR);
        this._boxD0 = Sprite.createBox(w - Score.DIGIT_0_RIGHT, Score.TOP, Score.DIGIT_WIDTH, Score.HEIGHT, Score.COLOR);
        scr.append(this._boxD2);
        scr.append(this._boxD1);
        scr.append(this._boxD0);
    }

    destroy() {
        if (this._destroyed) return;
        this._scr.remove(this._boxD2);
        this._scr.remove(this._boxD1);
        this._scr.remove(this._boxD0);
        super.destroy();
    }

    protected _onWindowResize(width: number, height: number): void {
        this._box.left = width - Score.DESCR_RIGHT;
        this._boxD2.left = width - Score.DIGIT_2_RIGHT;
        this._boxD1.left = width - Score.DIGIT_1_RIGHT;
        this._boxD0.left = width - Score.DIGIT_0_RIGHT;
    }

    get value(): number {
        return this._value;
    }

    set value(value: number) {
        this._value = value > Options.maxScore ? Options.maxScore : value;
    }

    update(): void {
        // Score: 765
        //   d2 = 765 % 100 = 7
        //   d1 = (765 - 7 * 100) % 10 = 6
        //   d0 = (765 - 7 * 100 - 6 * 10) = 5
        this._box.setContent(Texture.Score.description);
        const d2: number = Math.floor(this._value / 100);
        const d1: number = Math.floor((this._value - d2 * 100) / 10);
        const d0: number = this._value - d2 * 100 - d1 * 10;
        this._boxD2.setContent(Score._getDigitTexture(d2));
        this._boxD1.setContent(Score._getDigitTexture(d1));
        this._boxD0.setContent(Score._getDigitTexture(d0));
    }

    private static _getDigitTexture(digit: number): string {
        switch (digit) {
            case 1: return Texture.Score.digit1;
            case 2: return Texture.Score.digit2;
            case 3: return Texture.Score.digit3;
            case 4: return Texture.Score.digit4;
            case 5: return Texture.Score.digit5;
            case 6: return Texture.Score.digit6;
            case 7: return Texture.Score.digit7;
            case 8: return Texture.Score.digit8;
            case 9: return Texture.Score.digit9;
            default: return Texture.Score.digit0;
        }
    }
}