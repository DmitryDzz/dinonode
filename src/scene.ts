import {Widgets} from "blessed";
import {Dino} from "./characters/dino";
import {Pterosaur} from "./characters/pterosaur";
import {Raptor} from "./characters/raptor";
import {EnemyMoveDirection} from "./characters/enemy";
import Screen = Widgets.Screen;
import {onDestroyCallback, Sprite} from "./sprite";

interface SpriteObject {
    sprite: Sprite;
    id: number;
}

export class Scene {
    private static readonly MIN_ANIMAL_SPAWN_INTERVAL = 5_000;
    private static readonly MAX_ANIMAL_SPAWN_INTERVAL = 9_000;

    private readonly _scr: Screen;

    private readonly _dino: Dino;
    private _sprites: SpriteObject[] = [];

    private _createAnimalInterval?: NodeJS.Timer;

    constructor(scr: Screen) {
        this._scr = scr;
        this._dino = new Dino(scr);
        this._createRandomAnimal();
    }

    destroy() {
        if (this._createAnimalInterval !== undefined) clearInterval(this._createAnimalInterval);
        this._sprites.forEach(x => x.sprite.destroy());
        this._dino.destroy();
    }

    update() {
        this._dino.update();
        this._sprites.forEach(x => x.sprite.update());
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
}