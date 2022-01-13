import {screen} from "blessed";
import {Scene} from "./scene";

const main = (): void => {
    console.log("Hello world!");

    const scr = screen({
        title: "Dinonode",
        smartCSR: true
    });

    // scr.addListener("resize", () => {
    // });

    const scene = new Scene(scr);

    const interval = setInterval(() => {
        const time: number = Date.now(); // absolute millis
        scene.update(time);
        scr.render();
    }, 20);

    scr.key(['escape', 'q', 'C-c'], function(ch, key) {
        clearInterval(interval);
        return process.exit(0);
    });
}

main();