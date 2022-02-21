import {Application} from "./application";

const main = (): void => {
    // console.log("Hello Dino world!\n");
    const application: Application = new Application();
    application.start();
}

main();