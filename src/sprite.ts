import {box, Widgets} from "blessed";
import Screen = Widgets.Screen;
import BoxElement = Widgets.BoxElement;
import {ApplicationPublisher} from "./application_publisher";

export type onDestroyCallback = (sprite: Sprite) => void;

export abstract class Sprite {
    private static _last_id: number = 0;

    readonly id: number;

    protected readonly _scr: Screen;

    private readonly _onDestroy?: onDestroyCallback;

    protected constructor(scr: Screen, onDestroy?: onDestroyCallback) {
        this.id = Sprite._last_id++;
        this._scr = scr;
        this._onDestroy = onDestroy;
        ApplicationPublisher.getInstance().addListener("onWindowResize", this._onWindowResizeHandler);
    }

    destroy(): void {
        ApplicationPublisher.getInstance().removeListener("onWindowResize", this._onWindowResizeHandler);
        if (this._onDestroy)
            this._onDestroy(this);
    }

    abstract update(): void;

    protected abstract _onWindowResizeHandler(width: number, height: number): void;

    static flip(tex: string): string {
        const rows: string[] = tex.split("\n");
        let result: string = "";
        rows.forEach(row => {
            if (result.length > 0) result += "\n";
            result += row.split("").reverse().join("");
        });
        result = result
            .replace(/\u2596/g, "Б")
            .replace(/\u2597/g, "Г")
            .replace(/\u2598/g, "Д")
            .replace(/\u259d/g, "Ж")
            .replace(/\u2599/g, "Й")
            .replace(/\u259b/g, "Л")
            .replace(/\u259c/g, "П")
            .replace(/\u259f/g, "Ф");
        result = result
            .replace(/Б/g, "\u2597")
            .replace(/Г/g, "\u2596")
            .replace(/Д/g, "\u259d")
            .replace(/Ж/g, "\u2598")
            .replace(/Й/g, "\u259f")
            .replace(/Л/g, "\u259c")
            .replace(/П/g, "\u259b")
            .replace(/Ф/g, "\u2599");

        return result;
    }

    static createBox(column: number, row: number, width: number, height: number): BoxElement {
        return box({
            width: width,
            height: height,
            top: row,
            left: column,
            tags: true,
            style: {
                fg: 'green',
                // bg: 'magenta',
                // border: {
                //     fg: '#f0f0f0'
                // },
                // hover: {
                //     bg: 'green'
                // }
            }
        });
    }
}