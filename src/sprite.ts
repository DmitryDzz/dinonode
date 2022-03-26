import {box, Widgets} from "blessed";
import {ApplicationPublisher} from "./application_publisher";
import {integer} from "./types";
import Screen = Widgets.Screen;
import BoxElement = Widgets.BoxElement;
import {RectW} from "./rect";

export type OnDestroyCallback = (sprite: Sprite) => void;

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
    private readonly _onDestroy?: OnDestroyCallback;

    get column() { return this._column; }
    get row() { return this._row; }
    get width() { return this._width; }
    get height() { return this._height; }

    protected constructor(scr: Screen,
                          column: integer, row: integer, width: integer, height: integer,
                          baseColor: string, onDestroy?: OnDestroyCallback) {
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

    private _onWindowResizeHandler = (width: number, height: number): void => {
        this._onWindowResize(width, height);
    };

    protected abstract _onWindowResize(width: number, height: number): void;

    static flip(tex: string): string {
        const rows: string[] = tex.split("\n");
        let result: string = "";
        rows.forEach(row => {
            if (result.length > 0) result += "\n";
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

    static createBox(column: number, row: number, width: number, height: number, fgColor: string, bgColor?: string): BoxElement {
        return box({
            width: width,
            height: height,
            top: row,
            left: column,
            tags: true,
            style: {
                fg: fgColor,
                bg: bgColor,
            }
        });
    }

    static cropFrame(spriteRect: RectW, scrWidth: integer, scrHeight: integer, frameContent: string):
        { spriteRect?: RectW, frameContent?: string } {

        const meta: ContentMeta = Sprite.extractMeta(frameContent);
        frameContent = meta.strippedLines.join("\n");

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
                croppedFrameContent = Sprite.deleteFirstColumns(meta, columnsToRemove);
                croppedRect.c = 0;
            } else {
                croppedFrameContent = Sprite.deleteLastColumns(meta, columnsToRemove);
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

    private static getTagToTheLeft(rowTags: LineColorTags, position: number): string {
        let result: string = "";
        for (let i = 0; i < rowTags.length; i++) {
            const tag = rowTags[i];
            if (tag.position < position && tag.tag !== "{/}") result = tag.tag;
            else break;
        }
        return result;
    }

    private static getTagToTheRight(rowTags: LineColorTags, position: number): string {
        return "";
    }

    static deleteFirstColumns(meta: ContentMeta, columnsToDelete: number): string {
        // Сделать всё тут: meta.coloredLines[i]
        // Считать "раздетые" символы, проходя по строке, игнорируя символы в тегах.
        // Затем добавить спереди тег, если надо. См. getTagToTheLeft().
        const rows: string[] = meta.coloredLines;
        let croppedFrameContent: string = "";
        rows.forEach((row: string, i: number) => {
            const rowTags: LineColorTags = meta.coloredLinesMeta[i];
            const tag: string = Sprite.getTagToTheLeft(rowTags, columnsToDelete);
            croppedFrameContent += tag + row.slice(columnsToDelete);
            if (i < rows.length - 1)
                croppedFrameContent += "\n";
        });
        return croppedFrameContent;
    }

    static deleteLastColumns(meta: ContentMeta, columnsToDelete: number): string {
        const rows: string[] = meta.coloredLines;
        let croppedFrameContent: string = "";
        rows.forEach((row: string, i: number) => {
            const rowTags: LineColorTags = meta.coloredLinesMeta[i];
            const tag: string = Sprite.getTagToTheRight(rowTags, row.length - columnsToDelete);
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

    static extractMeta(frameContent: string): ContentMeta {
        const sourceLines = frameContent.split("\n");
        const result: ContentMeta = {
            source: frameContent,
            sourceLines,
            linesCount: sourceLines.length,
            strippedLines: [],
            sourceMeta: [],
            coloredLines: [],
            coloredLinesMeta: [],
        };

        let colorTag: ColorTag | undefined = undefined;
        for (let lineIndex = 0; lineIndex < sourceLines.length; lineIndex++) {
            let strippedLine = "";
            const line: string = sourceLines[lineIndex];
            const lineColorTags: ColorTag[] = [];
            for (let i = 0; i < line.length; i++) {
                const ch: string = line[i];
                if (colorTag) {
                    colorTag.tag += ch;
                    if (ch === "}") {
                        lineColorTags.push(colorTag);
                        colorTag = undefined;
                    }
                } else {
                    if (ch === "{") {
                        colorTag = {position: strippedLine.length, tag: ch};
                    } else {
                        strippedLine += ch;
                    }
                }
            }

            result.strippedLines.push(strippedLine);
            result.sourceMeta.push(lineColorTags);
        }

        let unclosedLineTag: string = "";
        for (let lineIndex = 0; lineIndex < result.sourceLines.length; lineIndex++) {
            const sourceLine: string = result.sourceLines[lineIndex];
            const strippedLine: string = result.strippedLines[lineIndex];
            let coloredLine: string = unclosedLineTag + sourceLine;
            result.coloredLinesMeta[lineIndex] = [];
            if (unclosedLineTag !== "") {
                result.coloredLinesMeta[lineIndex].push({position: 0, tag: unclosedLineTag});
            }
            result.coloredLinesMeta[lineIndex].push(...result.sourceMeta[lineIndex]);
            if (result.coloredLinesMeta[lineIndex].length > 0) {
                const tags: LineColorTags = result.coloredLinesMeta[lineIndex];
                const lastTagInLine = tags[tags.length - 1].tag;
                if (lastTagInLine === "{/}") {
                    unclosedLineTag = "";
                } else {
                    unclosedLineTag = lastTagInLine;
                    result.coloredLinesMeta[lineIndex].push({tag: "{/}", position: strippedLine.length});
                    coloredLine += "{/}";
                }
            }
            result.coloredLines[lineIndex] = coloredLine;
        }

        return result;
    }

    static toColoredLines(frameContent: string): string {
        const meta: ContentMeta = Sprite.extractMeta(frameContent);
        return meta.coloredLines.join("\n");
    }

    static toStrippedLines(frameContent: string): string {
        const meta: ContentMeta = Sprite.extractMeta(frameContent);
        return meta.strippedLines.join("\n");
    }
}

interface BlessCommand {
    beginCmd: string;
    beginCmdPos: number;
    endCmd?: string;
    endCmdPos?: number;
}

export interface ColorTag {
    position: number;
    tag: string;
}

export type LineColorTags = ColorTag[];

export interface ContentMeta {
    source: string;
    linesCount: number;
    sourceLines: string[];
    strippedLines: string[];
    coloredLines: string[];
    sourceMeta: LineColorTags[];
    coloredLinesMeta: LineColorTags[];
}