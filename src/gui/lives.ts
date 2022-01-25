import {Widgets} from "blessed";
import Screen = Widgets.Screen;
import {Heart} from "./heart";
import {ApplicationPublisher} from "../application_publisher";

export class Lives {
    private static readonly COUNT = 3;

    private readonly _hearts: Heart[] = [];

    constructor(scr: Screen) {
        for (let i = 0; i < Lives.COUNT; i++) {
            const heart = new Heart(scr);
            this._hearts.push(heart);
            heart.column = i * (heart.width + 1);
            heart.row = 1;
        }
        this.setHealth(3);
        ApplicationPublisher.getInstance().addListener("onWindowResize", this._onWindowResizeHandler);
    }

    destroy() {
        ApplicationPublisher.getInstance().removeListener("onWindowResize", this._onWindowResizeHandler);
        this._hearts.forEach(heart => heart.destroy());
    }

    protected _onWindowResizeHandler(width: number, height: number): void {
        //TODO DZZ
        // console.log("Lives", width, height);
    }

    update(): void {
        this._hearts.forEach(heart => heart.update());
    }

    setHealth(value: number) {
        if (value < 0) value = 0;
        else if (value > Lives.COUNT) value = Lives.COUNT;
        this._hearts.forEach((heart: Heart, index: number) => {
            heart.setColor(index < value ? Heart.ALIVE_COLOR : Heart.DEAD_COLOR);
        });
    }
}