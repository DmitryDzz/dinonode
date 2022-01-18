import {Application} from "./application";

const main = (): void => {
    console.log("Hello Dino world!\n");
    const application: Application = Application.getInstance();
    application.start();
}

main();