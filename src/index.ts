import {box, screen} from "blessed";
import {Dino} from "./dino";

console.log("Hello world!");

const scr = screen({
    smartCSR: true
});

scr.title = "Dinonode game";

// scr.addListener("resize", () => {
// });

const dino = new Dino();

const bx = box({
    top: 'center',
    left: 0,
    width: dino.width,
    height: dino.height,
    content: dino.sprites.left.idle[0],
    tags: true,
    // border: {
    //     type: 'line'
    // },
    style: {
        fg: 'white',
        // bg: 'magenta',
        border: {
            fg: '#f0f0f0'
        },
        hover: {
            bg: 'green'
        }
    }
});

scr.append(bx);

const interval = setInterval(() => {

    bx.left = bx.left as number + 1;
    bx.setContent((bx.left / 6 >> 0) % 2 === 0 ? dino.sprites.left.run[1] : dino.sprites.left.run[3]);
    scr.render();
}, 20);

scr.key(['escape', 'q', 'C-c'], function(ch, key) {
    clearInterval(interval);
    return process.exit(0);
});