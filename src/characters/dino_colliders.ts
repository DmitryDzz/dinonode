import {Rect} from "../rect";
import {DinoStateType} from "./dino_states";
import {DinoRect} from "./dino_rect";

export class DinoColliders {
    private _headLocalCollider: Rect = new Rect({c0: 0, r0: 0, c1: 0, r1: 0});
    private _tailLocalCollider: Rect = new Rect({c0: 0, r0: 0, c1: 0, r1: 0});
    private _bodyLocalCollider: Rect = new Rect({c0: 0, r0: 0, c1: 0, r1: 0});

    readonly headCollider: Rect = new Rect({c0: 0, r0: 0, c1: 0, r1: 0});
    readonly tailCollider: Rect = new Rect({c0: 0, r0: 0, c1: 0, r1: 0});
    readonly bodyCollider: Rect = new Rect({c0: 0, r0: 0, c1: 0, r1: 0});

    private readonly _dinoRect: DinoRect;

    constructor(dinoRect: DinoRect) {
        this._dinoRect = dinoRect;
    }

    updateLocalColliders(state: DinoStateType) {
        switch (state) {
            case "idleR":
            case "runR":
            case "jumpR":
            case "deadR":
                this._headLocalCollider = new Rect({c0: 10, r0: 0, c1: 19, r1: 4});
                this._tailLocalCollider = new Rect({c0: 0, r0: 4, c1: 4, r1: 8});
                this._bodyLocalCollider = new Rect({c0: 5, r0: 4, c1: 13, r1: 10});
                break;
            case "deadHeadR":
                this._headLocalCollider = new Rect({c0: 2, r0: 8, c1: 18, r1: 10});
                this._tailLocalCollider = new Rect({c0: 2, r0: 8, c1: 18, r1: 10});
                this._bodyLocalCollider = new Rect({c0: 2, r0: 8, c1: 18, r1: 10});
                break;
            case "deadTailR":
            case "deadLegsR":
                this._headLocalCollider = new Rect({c0: 2, r0: 8, c1: 18, r1: 10});
                this._tailLocalCollider = new Rect({c0: 2, r0: 8, c1: 18, r1: 10});
                this._bodyLocalCollider = new Rect({c0: 2, r0: 8, c1: 18, r1: 10});
                break;
            case "leanIdleR":
            case "leanRunR":
                this._headLocalCollider = new Rect({c0: 17, r0: 0, c1: 26, r1: 4});
                this._tailLocalCollider = new Rect({c0: 0, r0: 1, c1: 4, r1: 4});
                this._bodyLocalCollider = new Rect({c0: 5, r0: 2, c1: 15, r1: 6});
                break;
            case "idleL":
            case "runL":
            case "jumpL":
            case "deadL":
                this._headLocalCollider = new Rect({c0: 0, r0: 0, c1: 9, r1: 4});
                this._tailLocalCollider = new Rect({c0: 15, r0: 4, c1: 19, r1: 8});
                this._bodyLocalCollider = new Rect({c0: 6, r0: 4, c1: 14, r1: 10});
                break;
            case "deadHeadL":
                this._headLocalCollider = new Rect({c0: 1, r0: 8, c1: 17, r1: 10});
                this._tailLocalCollider = new Rect({c0: 1, r0: 8, c1: 17, r1: 10});
                this._bodyLocalCollider = new Rect({c0: 1, r0: 8, c1: 17, r1: 10});
                break;
            case "deadTailL":
            case "deadLegsL":
                this._headLocalCollider = new Rect({c0: 1, r0: 8, c1: 17, r1: 10});
                this._tailLocalCollider = new Rect({c0: 1, r0: 8, c1: 17, r1: 10});
                this._bodyLocalCollider = new Rect({c0: 1, r0: 8, c1: 17, r1: 10});
                break;
            case "leanIdleL":
            case "leanRunL":
                this._headLocalCollider = new Rect({c0: 0, r0: 0, c1: 9, r1: 4});
                this._tailLocalCollider = new Rect({c0: 22, r0: 1, c1: 26, r1: 4});
                this._bodyLocalCollider = new Rect({c0: 11, r0: 2, c1: 21, r1: 6});
                break;
            default:
                this._headLocalCollider = new Rect({c0: 0, r0: 0, c1: 0, r1: 0});
                this._tailLocalCollider = new Rect({c0: 0, r0: 0, c1: 0, r1: 0});
                this._bodyLocalCollider = new Rect({c0: 0, r0: 0, c1: 0, r1: 0});
                console.error("DinoCollider error: Unknown state", state);
                break;
        }
    }

    update() {
        this.headCollider.c0 = this._dinoRect.column + this._headLocalCollider.c0;
        this.headCollider.c1 = this._dinoRect.column + this._headLocalCollider.c1;
        this.headCollider.r0 = this._dinoRect.row + this._headLocalCollider.r0;
        this.headCollider.r1 = this._dinoRect.row + this._headLocalCollider.r1;

        this.tailCollider.c0 = this._dinoRect.column + this._tailLocalCollider.c0;
        this.tailCollider.c1 = this._dinoRect.column + this._tailLocalCollider.c1;
        this.tailCollider.r0 = this._dinoRect.row + this._tailLocalCollider.r0;
        this.tailCollider.r1 = this._dinoRect.row + this._tailLocalCollider.r1;

        this.bodyCollider.c0 = this._dinoRect.column + this._bodyLocalCollider.c0;
        this.bodyCollider.c1 = this._dinoRect.column + this._bodyLocalCollider.c1;
        this.bodyCollider.r0 = this._dinoRect.row + this._bodyLocalCollider.r0;
        this.bodyCollider.r1 = this._dinoRect.row + this._bodyLocalCollider.r1;
    }
}