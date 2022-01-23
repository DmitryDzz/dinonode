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

    private _createAnimalInterval?: NodeJS.Timer;
    private _createCometInterval?: NodeJS.Timer;

    constructor(scr: Screen) {
        this._scr = scr;
        this._dino = new Dino(scr);
        this._createRandomAnimal();
        this._createComet();

        this._score = new Score(scr);
        this._lives = new Lives(scr);
    }

    destroy() {
        if (this._createAnimalInterval !== undefined) clearInterval(this._createAnimalInterval);
        if (this._createCometInterval !== undefined) clearInterval(this._createCometInterval);
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

    private readonly _onSpriteDestroy: onDestroyCallback = (sprite: Sprite): void => {
        this._sprites = this._sprites.filter(s => s.id !== sprite.id);
        //console.log("onDestroy", sprite.id, "count", this._sprites.length);
    }

    private _createRandomAnimal() {
        const delayMillis = Math.random() * (Scene.MAX_ANIMAL_SPAWN_INTERVAL - Scene.MIN_ANIMAL_SPAWN_INTERVAL) +
            Scene.MIN_ANIMAL_SPAWN_INTERVAL;
        this._createAnimalInterval = setInterval(() => {
            const direction = Math.random() > 0.5 ? EnemyMoveDirection.MoveLeft : EnemyMoveDirection.MoveRight;
            const enemy = Math.random() > 0.5
                ? new Pterosaur(this._scr, direction, this._onSpriteDestroy)
                : new Raptor(this._scr, direction, this._onSpriteDestroy);
            this._sprites.push({sprite: enemy, id: enemy.id});

            if (this._createAnimalInterval !== undefined) clearInterval(this._createAnimalInterval);
            this._createRandomAnimal();
        }, delayMillis);
    }

    private _createComet() {
        const delayMillis = Math.random() * (Scene.MAX_COMET_SPAWN_INTERVAL - Scene.MIN_COMET_SPAWN_INTERVAL) +
            Scene.MIN_COMET_SPAWN_INTERVAL;
        this._createCometInterval = setInterval(() => {
            const comet = new Comet(this._scr, this._onSpriteDestroy);
            this._sprites.push({sprite: comet, id: comet.id});

            if (this._createCometInterval !== undefined) clearInterval(this._createCometInterval);
            this._createComet();
        }, delayMillis);
    }
}