import {Widgets} from "blessed";
import Screen = Widgets.Screen;
import {Heart} from "./heart";
import {ApplicationPublisher} from "../application_publisher";
import IKeyEventArg = Widgets.Events.IKeyEventArg;

enum ChangeHealthDirection {
    INCREASE,
    DECREASE
}

export class Lives {
    private static readonly COUNT = 3;

    private readonly _hearts: Heart[] = [];
    private _value: number = Lives.COUNT;

    constructor(scr: Screen) {
        for (let i = 0; i < Lives.COUNT; i++) {
            const heart = new Heart(scr);
            this._hearts.push(heart);
            heart.column = i * heart.width + 1;
            heart.row = 1;
        }
        ApplicationPublisher.getInstance().addListener("onWindowResize", this._onWindowResizeHandler);
        scr.key(["[", "]"], this._keyPressed);
    }

    destroy() {
        ApplicationPublisher.getInstance().removeListener("onWindowResize", this._onWindowResizeHandler);
        this._hearts.forEach(heart => heart.destroy());
    }

    protected _onWindowResizeHandler(_width: number, _height: number): void {
        //TODO DZZ
        // console.log("Lives", width, height);
    }

    private readonly _keyPressed = (ch: string, _key: IKeyEventArg) => {
        if (ch === "[") {
            this.decreaseHealth();
        } else if (ch === "]") {
            this.increaseHealth();
        }
    }

    update(): void {
        this._hearts.forEach(heart => heart.update());
    }

    private _changeHealth(direction: ChangeHealthDirection) {
        if (direction === ChangeHealthDirection.INCREASE) {
            if (this._value < Lives.COUNT) this._value++;
            else return;
        } else if (direction === ChangeHealthDirection.DECREASE) {
            if (this._value > 0) this._value--;
            else return;
        }

        let animatedIndex: number | undefined = undefined;
        if (direction === ChangeHealthDirection.INCREASE) {
            animatedIndex = this._value - 1;
            this._hearts[animatedIndex].changeState("appear");
        } else if (direction === ChangeHealthDirection.DECREASE) {
            animatedIndex = this._value;
            this._hearts[animatedIndex].changeState("disappear");
        }
        if (animatedIndex !== undefined) {
            for (let i = 0; i < animatedIndex; i++) {
                this._hearts[i].changeState("alive");
            }
            for (let i = animatedIndex + 1; i < Lives.COUNT; i++) {
                this._hearts[i].changeState("dead");
            }
        }
    }

    increaseHealth() {
        this._changeHealth(ChangeHealthDirection.INCREASE);
    }

    decreaseHealth() {
        this._changeHealth(ChangeHealthDirection.DECREASE);
    }
}