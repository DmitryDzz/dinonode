import {screen} from "blessed";
import {Scene} from "./scene";
import {Time} from "./time";

const main = (): void => {
    console.log("Hello world!");

    const scr = screen({
        title: "Dinonode",
        smartCSR: true
    });

    // scr.addListener("resize", () => {
    // });

    Time.update();
    const scene = new Scene(scr);

    const interval = setInterval(() => {
        Time.update();
        scene.update();
        scr.render();
    }, 20);

    scr.key(['escape', 'q', 'C-c'], function(_ch, _key) {
        clearInterval(interval);
        return process.exit(0);
    });
}

main();