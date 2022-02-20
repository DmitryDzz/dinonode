import {Application} from "./application";
import {Texture} from "./resources/dino_resources";
import {Sprite as SpriteClass} from "./sprite";

const main = (): void => {
    console.log("Hello Dino world!\n");
    // console.log(Texture.Dino.deadTailA);
    console.log(SpriteClass.flip(Texture.Dino.deadTailA));
    console.log(Texture.Dino.deadTailA.length, SpriteClass.flip(Texture.Dino.deadTailA).length);
    // console.log(Texture.Dino.deadTailB);
    console.log(SpriteClass.flip(Texture.Dino.deadTailB));
    console.log(Texture.Dino.deadTailB.length, SpriteClass.flip(Texture.Dino.deadTailB).length);
    // console.log(Texture.Dino.deadTailC);
    console.log(SpriteClass.flip(Texture.Dino.deadTailC));
    console.log(Texture.Dino.deadTailC.length, SpriteClass.flip(Texture.Dino.deadTailC).length);
    // console.log(Texture.Dino.deadTailD);
    console.log(SpriteClass.flip(Texture.Dino.deadTailD));
    // console.log(Texture.Dino.deadTailE);
    console.log(SpriteClass.flip(Texture.Dino.deadTailE));
    const application: Application = new Application();
    application.start();
}

main();