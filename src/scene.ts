import {Widgets} from "blessed";
import {Dino} from "./characters/dino";
import {Pterosaur} from "./characters/pterosaur";
import {Raptor} from "./characters/raptor";
import {Enemy, EnemyMoveDirection} from "./characters/enemy";
import Screen = Widgets.Screen;
import {OnDestroyCallback, Sprite} from "./sprite";
import {Comet} from "./characters/comet";
import {Score} from "./gui/score";
import {Lives} from "./gui/lives";
import {Time} from "./time";
import IKeyEventArg = Widgets.Events.IKeyEventArg;
import {ContinueDialog} from "./gui/dialogs/continue_dialog";
import {FailFinalDialog} from "./gui/dialogs/fail_final_dialog";
import {SuccessFinalDialog} from "./gui/dialogs/success_final_dialog";

enum Key {
    Pause = "p",
}

export class Scene {
    private static readonly MIN_ANIMAL_SPAWN_INTERVAL_SECONDS = 5.0;
    private static readonly MAX_ANIMAL_SPAWN_INTERVAL_SECONDS = 9.0;
    private static readonly MIN_COMET_SPAWN_INTERVAL_SECONDS = 1.0;
    private static readonly MAX_COMET_SPAWN_INTERVAL_SECONDS = 2.0;

    private readonly _scr: Screen;

    private readonly _score: Score;
    private readonly _lives: Lives;
    private readonly _dino: Dino;
    private _enemies: Enemy[] = [];

    private readonly _continueDialog: ContinueDialog;
    private readonly _failFinalDialog: FailFinalDialog;
    private readonly _successFinalDialog: SuccessFinalDialog;

    private _createAnimalTime?: number;
    private _createCometTime?: number;

    private _isPaused: boolean = false;
    private _spawningEnemies: boolean = true;

    constructor(scr: Screen) {
        this._scr = scr;
        this._score = new Score(scr);
        this._lives = new Lives(scr);
        this._dino = new Dino(scr, () => {
            this._lives.decreaseHealth();
            this._spawningEnemies = false;
            if (this._lives.value > 0) {
                this._continueDialog.show();
            } else {
                this._failFinalDialog.show();
            }
        });

        const onDialogHideHandler = () => {
            this._spawningEnemies = true;
            this._createAnimalTime = undefined;
            this._createCometTime = undefined;
            this._dino.reborn();
        }
        this._continueDialog = new ContinueDialog(scr, onDialogHideHandler);
        this._failFinalDialog = new FailFinalDialog(scr, onDialogHideHandler);
        this._successFinalDialog = new SuccessFinalDialog(scr);

        scr.key([Key.Pause], this._keyPressed);
    }

    destroy() {
        this._scr.unkey(Key.Pause, this._keyPressed);
        this._enemies.forEach(x => x.destroy());
        this._dino.destroy();
        this._score.destroy();
        this._lives.destroy();
        this._continueDialog.destroy();
        this._failFinalDialog.destroy();
        this._successFinalDialog.destroy();
    }

    update() {
        this._dino.update();
        this._updateRandomAnimalRespawn();
        this._updateCometRespawn();
        this._enemies.forEach(x => x.update());
        this._score.update();
        this._lives.update();
        this._continueDialog.update();
        this._failFinalDialog.update();
        this._successFinalDialog.update();
    }

    private readonly _keyPressed = (ch: string, _key: IKeyEventArg) => {
        if (ch === Key.Pause) {
            this._switchPause();
        }
    }

    private _switchPause() {
        if (this._isPaused) {
            Time.setFactor(1.0);
            this._dino.unpause();
        } else {
            Time.setFactor(0.0);
            this._dino.pause();
        }
        this._isPaused = !this._isPaused;
    }

    private readonly _onEnemyDestroy: OnDestroyCallback = (sprite: Sprite): void => {
        if (this._dino.isAlive) {
            this._score.value++;
            if (this._score.value === 999) {
                this._spawningEnemies = false;
            }
        }
        this._enemies = this._enemies.filter(s => s.id !== sprite.id);
        if (this._score.value === 999 && this._dino.isAlive && this._enemies.length === 0) {
            this._spawningEnemies = false;
            this._dino.win();
            this._successFinalDialog.show();
        }
    }

    private _updateRandomAnimalRespawn() {
        if (this._createAnimalTime === undefined && this._spawningEnemies) {
            const delaySeconds = Scene.MIN_ANIMAL_SPAWN_INTERVAL_SECONDS + Math.random() *
                (Scene.MAX_ANIMAL_SPAWN_INTERVAL_SECONDS - Scene.MIN_ANIMAL_SPAWN_INTERVAL_SECONDS);
            this._createAnimalTime = Time.time + delaySeconds;
        }

        if (this._createAnimalTime !== undefined && Time.time >= this._createAnimalTime && this._spawningEnemies) {
            const direction = Math.random() > 0.5 ? EnemyMoveDirection.MoveLeft : EnemyMoveDirection.MoveRight;
            const enemy = Math.random() > 0.5
                ? new Pterosaur(this._scr, direction, this._onEnemyDestroy)
                : new Raptor(this._scr, direction, this._onEnemyDestroy);
            this._enemies.push(enemy);

            this._createAnimalTime = undefined;
        }
    }

    private _updateCometRespawn() {
        if (this._createCometTime === undefined && this._spawningEnemies) {
            const delaySeconds = Scene.MIN_COMET_SPAWN_INTERVAL_SECONDS + Math.random() *
                    (Scene.MAX_COMET_SPAWN_INTERVAL_SECONDS - Scene.MIN_COMET_SPAWN_INTERVAL_SECONDS);
            this._createCometTime = Time.time + delaySeconds;
        }

        if (this._createCometTime !== undefined && Time.time >= this._createCometTime && this._spawningEnemies) {
            const comet = new Comet(this._scr, this._onEnemyDestroy);
            this._enemies.push(comet);

            this._createCometTime = undefined;
        }
    }

    checkColliders() {
        this._dino.checkColliders(this._enemies);
        this._enemies.forEach((x: Enemy) => x.checkColliders(this._enemies));
    }
}