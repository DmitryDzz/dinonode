import {Widgets} from "blessed";
import {Dino} from "./characters/dino";
import {Pterosaur} from "./characters/pterosaur";
import {Raptor} from "./characters/raptor";
import {EnemyMoveDirection} from "./characters/enemy";
import Screen = Widgets.Screen;
import {onDestroyCallback, Sprite} from "./sprite";
import {Comet} from "./characters/comet";
import {Score} from "./gui/score";
import {Lives} from "./gui/lives";
import {Time} from "./time";
import IKeyEventArg = Widgets.Events.IKeyEventArg;

enum Key {
    Pause = "p",
}

interface SpriteObject {
    sprite: Sprite;
    id: number;
}

export class Scene {
    private static readonly MIN_ANIMAL_SPAWN_INTERVAL = 5_000;
    private static readonly MAX_ANIMAL_SPAWN_INTERVAL = 9_000;
    private static readonly MIN_COMET_SPAWN_INTERVAL = 1_000;
    private static readonly MAX_COMET_SPAWN_INTERVAL = 2_000;

    private readonly _scr: Screen;

    private readonly _score: Score;
    private readonly _lives: Lives;
    private readonly _dino: Dino;
    private _sprites: SpriteObject[] = [];

    private _createAnimalTimeout?: NodeJS.Timer;
    private _createCometTimeout?: NodeJS.Timer;

    private _isPaused: boolean = false;

    constructor(scr: Screen) {
        this._scr = scr;
        this._dino = new Dino(scr);
        this._startEnemySpawning();

        this._score = new Score(scr);
        this._lives = new Lives(scr);

        scr.key([Key.Pause], this._keyPressed);
    }

    destroy() {
        this._stopEnemySpawning();
        this._sprites.forEach(x => x.sprite.destroy());
        this._dino.destroy();
        this._score.destroy();
        this._lives.destroy();
    }

    update() {
        this._dino.update();
        this._sprites.forEach(x => x.sprite.update());
        this._score.update();
        this._lives.update();
    }

    private _startEnemySpawning() {
        this._createRandomAnimal();
        this._createComet();
    }

    private _stopEnemySpawning() {
        if (this._createAnimalTimeout !== undefined) clearTimeout(this._createAnimalTimeout);
        if (this._createCometTimeout !== undefined) clearTimeout(this._createCometTimeout);
        this._createAnimalTimeout = undefined;
        this._createCometTimeout = undefined;
    }

    private readonly _keyPressed = (ch: string, _key: IKeyEventArg) => {
        if (ch === Key.Pause) {
            this._switchPause();
        }
    }

    private _switchPause() {
        if (this._isPaused) {
            Time.setFactor(1.0);
            this._startEnemySpawning();
            this._dino.unpause();
        } else {
            Time.setFactor(0.0);
            this._stopEnemySpawning();
            this._dino.pause();
        }
        this._isPaused = !this._isPaused;
    }

    private readonly _onSpriteDestroy: onDestroyCallback = (sprite: Sprite): void => {
        this._score.value++;
        this._sprites = this._sprites.filter(s => s.id !== sprite.id);
        //console.log("onDestroy", sprite.id, "count", this._sprites.length);
    }

    private _createRandomAnimal() {
        const delayMillis = Math.random() * (Scene.MAX_ANIMAL_SPAWN_INTERVAL - Scene.MIN_ANIMAL_SPAWN_INTERVAL) +
            Scene.MIN_ANIMAL_SPAWN_INTERVAL;
        this._createAnimalTimeout = setTimeout(() => {
            const direction = Math.random() > 0.5 ? EnemyMoveDirection.MoveLeft : EnemyMoveDirection.MoveRight;
            const enemy = Math.random() > 0.5
                ? new Pterosaur(this._scr, direction, this._onSpriteDestroy)
                : new Raptor(this._scr, direction, this._onSpriteDestroy);
            this._sprites.push({sprite: enemy, id: enemy.id});

            if (this._createAnimalTimeout !== undefined) clearTimeout(this._createAnimalTimeout);
            this._createRandomAnimal();
        }, delayMillis);
    }

    private _createComet() {
        const delayMillis = Math.random() * (Scene.MAX_COMET_SPAWN_INTERVAL - Scene.MIN_COMET_SPAWN_INTERVAL) +
            Scene.MIN_COMET_SPAWN_INTERVAL;
        this._createCometTimeout = setTimeout(() => {
            const comet = new Comet(this._scr, this._onSpriteDestroy);
            this._sprites.push({sprite: comet, id: comet.id});

            if (this._createCometTimeout !== undefined) clearTimeout(this._createCometTimeout);
            this._createComet();
        }, delayMillis);
    }
}