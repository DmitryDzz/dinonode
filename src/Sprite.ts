import {box, Widgets} from "blessed";
import Screen = Widgets.Screen;
import BoxElement = Widgets.BoxElement;
import {Position} from "./position";
import {Application} from "./application";

export abstract class Sprite {
    protected readonly _scr: Screen;

    constructor(scr: Screen) {
        this._scr = scr;
        Application.getInstance().addListener("onWindowResize", this._onWindowResizeHandler);
    }

    destroy(): void {
        Application.getInstance().removeListener("onWindowResize", this._onWindowResizeHandler);
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

    static createBox(column: number, row: number): BoxElement {
        return box({
            width: Position.DEFAULT_WIDTH,
            height: Position.DEFAULT_HEIGHT,
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