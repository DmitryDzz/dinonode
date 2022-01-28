import {box, Widgets} from "blessed";
import Screen = Widgets.Screen;
import BoxElement = Widgets.BoxElement;
import {ApplicationPublisher} from "./application_publisher";
import {integer, RectW} from "./types";

export type onDestroyCallback = (sprite: Sprite) => void;

export abstract class Sprite {
    private static _last_id: number = 0;

    readonly id: number;

    protected _column: integer;
    protected _row: integer;
    protected readonly _width: integer;
    protected readonly _height: integer;

    protected readonly _scr: Screen;
    protected _box: BoxElement;

    protected _destroyed: boolean = false;
    private readonly _onDestroy?: onDestroyCallback;

    protected constructor(scr: Screen,
                          column: integer, row: integer, width: integer, height: integer,
                          baseColor: string, onDestroy?: onDestroyCallback) {
        this.id = Sprite._last_id++;
        this._scr = scr;
        this._onDestroy = onDestroy;
        ApplicationPublisher.getInstance().addListener("onWindowResize", this._onWindowResizeHandler);

        this._column = column;
        this._row = row;
        this._width = width;
        this._height = height;

        this._box = Sprite.createBox(this._column, this._row, this._width, this._height, baseColor);
        scr.append(this._box);
    }

    destroy(): void {
        if (this._destroyed) return;
        this._scr.remove(this._box);
        this._destroyed = true;
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
            // result += row.split("").reverse().join("");
            result += Sprite.flipRow(row);
        });
        result = result
            .replace(/\u2596/g, "Б")
            .replace(/\u2597/g, "Г")
            .replace(/\u2598/g, "Д")
            .replace(/\u259d/g, "Ж")
            .replace(/\u2599/g, "Й")
            .replace(/\u259b/g, "Л")
            .replace(/\u259c/g, "П")
            .replace(/\u259f/g, "Ф")
            .replace(/\u259a/g, "Ц")
            .replace(/\u259e/g, "Ч");
        result = result
            .replace(/Б/g, "\u2597")
            .replace(/Г/g, "\u2596")
            .replace(/Д/g, "\u259d")
            .replace(/Ж/g, "\u2598")
            .replace(/Й/g, "\u259f")
            .replace(/Л/g, "\u259c")
            .replace(/П/g, "\u259b")
            .replace(/Ф/g, "\u2599")
            .replace(/Ц/g, "\u259e")
            .replace(/Ч/g, "\u259a");

        return result;
    }

    static flipRow(row: string): string {
        let result: string = "";
        const commands: BlessCommand[] = [];
        let command: BlessCommand | undefined = undefined;
        let inCommand: boolean = false;
        let commandText: string = "";
        for (let i = 0, col = 0; i < row.length; i++) {
            const ch: string = row[i];
            if (ch === "{") {
                inCommand = true;
                commandText = ch;
            } else if (ch === "}") {
                commandText += ch;
                if (command === undefined) {
                    command = {
                        beginCmd: commandText,
                        beginCmdPos: col,
                    };
                } else {
                    command.endCmd = commandText;
                    command.endCmdPos = col;
                    commands.push(Object.assign({}, command));
                    command = undefined;
                }
                inCommand = false;
            } else if (inCommand) {
                commandText += ch;
            } else {
                result += ch;
                col++;
            }
        }
        result = result.split("").reverse().join("");
        const rowLength = result.length;
        for (let i = 0; i < commands.length; i++) {
            const c: BlessCommand = commands[i];
            const beginPos = rowLength - c.endCmdPos!;
            const endPos = rowLength - c.beginCmdPos;
            result = result.substring(0, endPos) + c.endCmd + result.substring(endPos);
            result = result.substring(0, beginPos) + c.beginCmd + result.substring(beginPos);
        }
        return result;
    }

    static createBox(column: number, row: number, width: number, height: number, baseColor: string): BoxElement {
        return box({
            width: width,
            height: height,
            top: row,
            left: column,
            tags: true,
            style: {
                fg: baseColor,
                // bg: 'magenta',
            }
        });
    }

    static cropFrame(spriteRect: RectW, scrWidth: integer, scrHeight: integer, frameContent: string):
        { spriteRect?: RectW, frameContent?: string } {

        let croppedRect: RectW = Object.assign({}, spriteRect);

        croppedRect.w = spriteRect.c < 0
            ? spriteRect.c + spriteRect.w
            : (spriteRect.c + spriteRect.w >= scrWidth ? scrWidth - spriteRect.c : spriteRect.w);
        if (croppedRect.w <= 0)
            return {};

        croppedRect.h = spriteRect.r < 0
            ? spriteRect.r + spriteRect.h
            : (spriteRect.r + spriteRect.h >= scrHeight ? scrHeight - spriteRect.r : spriteRect.h);
        if (croppedRect.h <= 0)
            return {};

        if (croppedRect.w === spriteRect.w && croppedRect.h === spriteRect.h)
            return {spriteRect: croppedRect, frameContent: frameContent};

        let croppedFrameContent: string = frameContent;
        if (croppedRect.w !== spriteRect.w) {
            const columnsToRemove: number = spriteRect.w - croppedRect.w;
            if (spriteRect.c < 0) {
                croppedFrameContent = Sprite.deleteFirstColumns(croppedFrameContent, columnsToRemove);
                croppedRect.c = 0;
            } else {
                croppedFrameContent = Sprite.deleteLastColumns(croppedFrameContent, columnsToRemove);
            }
        }
        if (croppedRect.h !== spriteRect.h) {
            const rowsToRemove: number = spriteRect.h - croppedRect.h;
            if (spriteRect.r < 0) {
                croppedFrameContent = Sprite.deleteFirstRows(croppedFrameContent, rowsToRemove);
                croppedRect.r = 0;
            } else {
                croppedFrameContent = Sprite.deleteLastRows(croppedFrameContent, rowsToRemove);
            }
        }
        return {spriteRect: croppedRect, frameContent: croppedFrameContent};
    }

    static deleteFirstColumns(frameContent: string, columnsToDelete: number): string {
        const rows: string[] = frameContent.split("\n");
        let croppedFrameContent: string = "";
        rows.forEach((row: string, i: number) => {
            croppedFrameContent += row.slice(columnsToDelete);
            if (i < rows.length - 1)
                croppedFrameContent += "\n";
        });
        return croppedFrameContent;
    }

    static deleteLastColumns(frameContent: string, columnsToDelete: number): string {
        const rows: string[] = frameContent.split("\n");
        let croppedFrameContent: string = "";
        rows.forEach((row: string, i: number) => {
            croppedFrameContent += row.slice(0, -columnsToDelete);
            if (i < rows.length - 1)
                croppedFrameContent += "\n";
        });
        return croppedFrameContent;
    }

    static deleteFirstRows(frameContent: string, rowsToDelete: number): string {
        let rows: string[] = frameContent.split("\n");
        rows = rows.slice(rowsToDelete);
        return rows.join("\n");
    }

    static deleteLastRows(frameContent: string, rowsToDelete: number): string {
        let rows: string[] = frameContent.split("\n");
        rows = rows.slice(0, -rowsToDelete);
        return rows.join("\n");
    }
}

interface BlessCommand {
    beginCmd: string;
    beginCmdPos: number;
    endCmd?: string;
    endCmdPos?: number;
}