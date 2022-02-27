import {box, Widgets} from "blessed";
import BoxElement = Widgets.BoxElement;
import Screen = Widgets.Screen;
import {integer} from "../../types";
import {ApplicationPublisher} from "../../application_publisher";

interface DialogRect {
    width: integer;
    height: integer;
    column: integer;
    row: integer;
}

export type OnHideCallback = () => void;

export abstract class Dialog {
    private static _dialogVisible: boolean = false;
    static get dialogVisible(): boolean { return Dialog._dialogVisible; }

    // private static readonly BORDER_COLOR = "#008000";
    private static readonly TEXT_COLOR = "#008000";

    protected readonly _scr: Screen;
    protected readonly _onHideCallback?: OnHideCallback;
    protected _box?: BoxElement;

    private _destroyed: boolean = false;
    private _content?: string;
    private _rect?: DialogRect;

    constructor(scr: Screen, onHideCallback?: OnHideCallback) {
        this._scr = scr;
        this._onHideCallback = onHideCallback;
        ApplicationPublisher.getInstance().addListener("onWindowResize", this._onWindowResizeHandler);
    }

    destroy() {
        ApplicationPublisher.getInstance().removeListener("onWindowResize", this._onWindowResizeHandler);
        this.hide();
        this._destroyed = true;
    }

    protected _initialize(content: string): void {
        if (this._destroyed) return;
        this._content = content;
        const lines: string[] = content.split("\n");
        let maxLength = 0;
        lines.forEach((line: string) => {if (line.length > maxLength) maxLength = line.length});

        this._rect = {
            width: maxLength + 2,
            height: lines.length + 2,
            column: 0,
            row: 0,
        };
        this._setRectPosition(this._scr.width as number, this._scr.height as number);
    }

    private _setRectPosition(scrWidth: number, scrHeight: number) {
        if (this._rect) {
            this._rect.column = Math.round((scrWidth - this._rect.width) / 2);
            this._rect.row = Math.round((scrHeight - this._rect.height) / 2);
        }
    }

    private readonly _updatePosition = (scrWidth: number, scrHeight: number): void => {
        if (this._rect && this._box) {
            this._setRectPosition(scrWidth, scrHeight);
            this._box.left = this._rect.column;
            this._box.top = this._rect.row;
        }
    }

    protected readonly _onWindowResizeHandler = (width: number, height: number): void => {
        this._updatePosition(width, height);
    }

    update() {
        if (this._destroyed) return;
        if (this._content !== undefined && this._box !== undefined) {
            this._box.setContent(this._content);
        }
    }

    show() {
        if (this._destroyed) return;
        if (this._rect === undefined) {
            throw new Error("Dialog content is not defined.");
        }

        this._box = Dialog.createBox(this._rect.column, this._rect.row, this._rect.width, this._rect.height, Dialog.TEXT_COLOR);
        this._scr.append(this._box);
        Dialog._dialogVisible = true;
    }

    hide() {
        if (this._destroyed) return;
        if (this._onHideCallback !== undefined) {
            this._onHideCallback();
        }
        if (this._box !== undefined) {
            this._scr.remove(this._box);
            this._box.destroy();
            this._box = undefined;
            Dialog._dialogVisible = false;
        }
    }

    static createBox(column: number, row: number, width: number, height: number, fgColor: string): BoxElement {
        const boxOptions: Widgets.BoxOptions = {
            width: width,
            height: height,
            top: row,
            left: column,
            tags: true,
            // border: {
            //     type: 'line',
            // },
            style: {
                fg: fgColor,
                // border: {
                //     fg: Dialog.BORDER_COLOR,
                // }
            }
        };
        return box(boxOptions);
    }
}