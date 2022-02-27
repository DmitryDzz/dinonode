import {Widgets} from "blessed";
import {DinoState, DinoStates, DinoStateType} from "./dino_states";
import {DinoRect} from "./dino_rect";
import {Sprite} from "../sprite";
import {float} from "../types";
import {Time} from "../time";
import {DinoColliders} from "./dino_colliders";
import {Options} from "../options";
import {Enemy, EnemyType} from "./enemy";
import BoxElement = Widgets.BoxElement;
import Screen = Widgets.Screen;
import IKeyEventArg = Widgets.Events.IKeyEventArg;

enum Key {
    Left = "a",
    LeftAlt = "left",
    Right = "d",
    RightAlt = "right",
    Jump = "w",
    JumpAlt = "up",
    Lean = "s",
    LeanAlt = "down",
    // Stop = "z",
    // Dead = "1",
    // DeadHead = "2",
    // DeadTail = "3",
    // DeadLegs = "4",
}

export type OnDeathCallback = () => void;

export class Dino extends Sprite {
    private static readonly JUMP_HEIGHT = 8;
    private static readonly JUMP_DURATION = 0.8;
    private static readonly LEAN_DURATION = 0.6;

    private static readonly ABS_NORMAL_SPEED: float = 40.0; // symbols per second
    private static readonly ABS_FAST_SPEED: float = 52.0; // symbols per second

    private readonly _onDeathCallback?: OnDeathCallback;

    private readonly _dinoRect: DinoRect;
    private _dinoColliders: DinoColliders;

    private _states: DinoStates;
    private _state: DinoState;

    private _returnToPrevStateTime?: number;

    private _isPaused: boolean = false;

    private _debugHeadColliderBox?: BoxElement;
    private _debugTailColliderBox?: BoxElement;
    private _debugBodyColliderBox?: BoxElement;

    constructor(scr: Screen, onDeathCallback?: OnDeathCallback) {
        super(scr, 0, 0, DinoRect.DEFAULT_WIDTH, DinoRect.DEFAULT_HEIGHT, "#608000");
        this._onDeathCallback = onDeathCallback;

        this._dinoRect = new DinoRect(scr, (scr.width as number - DinoRect.DEFAULT_WIDTH) / 2);

        this._box.left = this._dinoRect.column;
        this._box.top = this._dinoRect.row;

        this._states = new DinoStates();
        this._state = this._states.getState("idleR");

        this._dinoColliders = new DinoColliders(this._dinoRect);
        this._dinoColliders.updateLocalColliders(this._state.type);

        scr.on("keypress", this._keyPressed);
    }

    destroy() {
        this._scr.off("keypress", this._keyPressed);
        this._debugHeadColliderBox?.destroy();
        this._debugTailColliderBox?.destroy();
        this._debugBodyColliderBox?.destroy();
        super.destroy();
    }

    reborn() {
        this._dinoRect.column = (this._scr.width as number - DinoRect.DEFAULT_WIDTH) / 2;

        this._box.left = this._dinoRect.column;
        this._box.top = this._dinoRect.row;

        this._state = this._states.getState("idleR");

        this._dinoColliders.updateLocalColliders(this._state.type);

        this._dinoRect.reborn();
    }

    pause() {
        this._isPaused = true;
    }

    unpause() {
        this._isPaused = false;
    }

    get isDead(): boolean { return this._dinoRect.isDead; }
    get isAlive(): boolean { return !this.isDead; }
    get isWin(): boolean { return this._dinoRect.isWin; }

    protected _onWindowResizeHandler(width: number, height: number): void {
        //TODO DZZ
        //console.log("Dino", width, height);
    }

    private _updatePrevState() {
        if (this._returnToPrevStateTime !== undefined && Time.time >= this._returnToPrevStateTime) {
            this._dinoRect.setLean(false);
            if (this.isWin) {
                this._changeState(this._state.isLeftDirection() ? "idleL" : "idleR");
            } else {
                if (this._state.isLeftDirection()) {
                    this._dinoRect.speed = -Dino.ABS_NORMAL_SPEED;
                    this._state = this._changeState("runL");
                } else {
                    this._dinoRect.speed = Dino.ABS_NORMAL_SPEED;
                    this._state = this._changeState("runR");
                }
            }
            this._returnToPrevStateTime = undefined;
        }
    }

    private readonly _keyPressed = (_ch: string, key: IKeyEventArg) => {
        if (this._isPaused || this.isDead || this.isWin) return;

        const jumpAction = () => {
            this._dinoRect.jump(Dino.JUMP_HEIGHT, Dino.JUMP_DURATION);
            this._returnToPrevStateTime = Time.time + Dino.JUMP_DURATION;
            const jumpState: DinoStateType = this._state.isLeftDirection() ? "jumpL" : "jumpR";
            this._state = this._changeState(jumpState);
        };

        const leanAction = () => {
            this._dinoRect.setLean(true);
            if (this._state.isLeftDirection()) {
                this._dinoRect.speed = -Dino.ABS_FAST_SPEED;
                this._state = this._changeState("leanRunL");
            } else {
                this._dinoRect.speed = Dino.ABS_FAST_SPEED;
                this._state = this._changeState("leanRunR");
            }
            this._returnToPrevStateTime = Time.time + Dino.LEAN_DURATION;
        };

        const leftPressed: boolean = key.name === Key.Left || key.name === Key.LeftAlt;
        const rightPressed: boolean = key.name === Key.Right || key.name === Key.RightAlt;
        const jumpPressed: boolean = key.name === Key.Jump || key.name === Key.JumpAlt;
        const leanPressed: boolean = key.name === Key.Lean || key.name === Key.LeanAlt;
        if (leftPressed) {
            this._dinoRect.speed = this._dinoRect.leaning ? -Dino.ABS_FAST_SPEED : -Dino.ABS_NORMAL_SPEED;
            this._state = this._dinoRect.jumping
                ? this._changeState("jumpL")
                : this._changeState(this._dinoRect.leaning ? "leanRunL" : "runL");
        } else if (rightPressed) {
            this._dinoRect.speed = this._dinoRect.leaning ? Dino.ABS_FAST_SPEED : Dino.ABS_NORMAL_SPEED;
            this._state = this._dinoRect.jumping
                ? this._changeState("jumpR")
                : this._changeState(this._dinoRect.leaning ? "leanRunR" : "runR");
        } else if (jumpPressed && !this._dinoRect.jumping && !this._dinoRect.leaning) {
            jumpAction();
        } else if (leanPressed && !this._dinoRect.jumping && !this._dinoRect.leaning) {
            leanAction();
        }
    }

    private _changeState(stateType: DinoStateType): DinoState {
        if (this._state.type === stateType || this.isDead) return this._state;
        this._state = this._states.getState(stateType);
        this._state.clear();
        this._dinoColliders.updateLocalColliders(this._state.type);
        return this._state;
    }

    update() {
        if (this._destroyed) return;

        const bx = this._box;

        if (this._state.update()) {
            if (this._dinoRect.width !== bx.width) bx.width = this._dinoRect.width;
            if (this._dinoRect.height !== bx.height) bx.height = this._dinoRect.height;
            bx.setContent(this._state.frame);
        }

        this._dinoRect.update();
        this._column = this._dinoRect.column;
        this._row = this._dinoRect.row;
        bx.left = this._dinoRect.column;
        bx.top = this._dinoRect.row;

        this._updatePrevState();

        this._dinoColliders.update();
        if (Options.debug.showColliders) {
            this._debugUpdateColliderBoxes();
        }
    }

    checkColliders(enemies: Enemy[]) {
        enemies.forEach((enemy: Enemy) => {
            if (enemy.isDead) return;

            const headCollision = this._dinoColliders.headCollider.intersects(enemy.collider);
            let collision = headCollision;
            const tailCollision = collision || this._dinoColliders.tailCollider.intersects(enemy.collider);
            collision = tailCollision;
            const bodyCollision = collision || this._dinoColliders.bodyCollider.intersects(enemy.collider);
            collision = bodyCollision;

            if (collision) {
                if (enemy.enemyType === EnemyType.Comet) {
                    this._state = this._state.isLeftDirection()
                        ? this._changeState("deadBurnedL") : this._changeState("deadBurnedR");
                } else {
                    if (headCollision) {
                        this._state = this._state.isLeftDirection()
                            ? this._changeState("deadHeadL") : this._changeState("deadHeadR");
                    } else if (tailCollision) {
                        this._state = this._state.isLeftDirection()
                            ? this._changeState("deadTailL") : this._changeState("deadTailR");
                    } else if (bodyCollision) {
                        this._state = this._state.isLeftDirection()
                            ? this._changeState("deadLegsL") : this._changeState("deadLegsR");
                    }
                }
                this._die();
                enemy.onCollision(this);
            }
        });
    }

    private _die() {
        if (this.isDead) return;
        this._dinoRect.die();

        //TODO DZZ Add animations and remove these two lines:
        this._changeState(this._state.isLeftDirection() ? "runL" : "runR");
        this._dinoRect.setLean(false);

        if (this._onDeathCallback !== undefined) {
            this._onDeathCallback();
        }
    }

    win() {
        this._dinoRect.win();
        this._changeState(this._state.isLeftDirection() ? "idleL" : "idleR");
        this._dinoRect.setLean(false);
    }

    private _debugUpdateColliderBoxes() {
        if (this._debugHeadColliderBox === undefined) {
            this._debugHeadColliderBox = Sprite.createBox(0, 0, 0, 0, "#000000", "#882200");
            this._scr.append(this._debugHeadColliderBox);
        }
        if (this._debugTailColliderBox === undefined) {
            this._debugTailColliderBox = Sprite.createBox(0, 0, 0, 0, "#000000", "#882200");
            this._scr.append(this._debugTailColliderBox);
        }
        if (this._debugBodyColliderBox === undefined) {
            this._debugBodyColliderBox = Sprite.createBox(0, 0, 0, 0, "#000000", "#882200");
            this._scr.append(this._debugBodyColliderBox);
        }

        this._debugHeadColliderBox.left = this._dinoColliders.headCollider.c0;
        this._debugHeadColliderBox.top = this._dinoColliders.headCollider.r0;
        this._debugHeadColliderBox.width = this._dinoColliders.headCollider.c1 - this._dinoColliders.headCollider.c0 + 1;
        this._debugHeadColliderBox.height = this._dinoColliders.headCollider.r1 - this._dinoColliders.headCollider.r0 + 1;

        this._debugTailColliderBox.left = this._dinoColliders.tailCollider.c0;
        this._debugTailColliderBox.top = this._dinoColliders.tailCollider.r0;
        this._debugTailColliderBox.width = this._dinoColliders.tailCollider.c1 - this._dinoColliders.tailCollider.c0 + 1;
        this._debugTailColliderBox.height = this._dinoColliders.tailCollider.r1 - this._dinoColliders.tailCollider.r0 + 1;

        this._debugBodyColliderBox.left = this._dinoColliders.bodyCollider.c0;
        this._debugBodyColliderBox.top = this._dinoColliders.bodyCollider.r0;
        this._debugBodyColliderBox.width = this._dinoColliders.bodyCollider.c1 - this._dinoColliders.bodyCollider.c0 + 1;
        this._debugBodyColliderBox.height = this._dinoColliders.bodyCollider.r1 - this._dinoColliders.bodyCollider.r0 + 1;
    }
}