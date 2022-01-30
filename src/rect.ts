import {integer} from "./types";

export class Rect {
    c0: integer;
    r0: integer;
    c1: integer;
    r1: integer;

    constructor(params: {c0: integer, r0: integer, c1: integer, r1: integer}) {
        this.c0 = params.c0;
        this.r0 = params.r0;
        this.c1 = params.c1;
        this.r1 = params.r1;
    }

    intersects(other: Rect): boolean {
        return this._isPointInside(other.c0, other.r0) || this._isPointInside(other.c1, other.r0) ||
            this._isPointInside(other.c0, other.r1) || this._isPointInside(other.c1, other.r1) ||
            other._isPointInside(this.c0, this.r0) /* in case "this" is inside "other" */;
    }

    private _isPointInside(c: integer, r: integer): boolean {
        return c >= this.c0 && c <= this.c1 && r >= this.r0 && r <= this.r1;
    }
}

export class RectW {
    c: integer;
    r: integer;
    w: integer;
    h: integer;

    constructor(params: {c: integer, r: integer, w: integer, h: integer}) {
        this.c = params.c;
        this.r = params.r;
        this.w = params.w;
        this.h = params.h;
    }
}
