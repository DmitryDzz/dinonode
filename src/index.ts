import {box, screen} from "blessed";

console.log("Hello world!");

const scr = screen({
    smartCSR: true
});

scr.title = "Dinonode game";

// scr.addListener("resize", () => {
// });

const bx = box({
    top: 'center',
    left: 0,
    width: 12,
    height: 3,
    content: 'Hello {bold}world{/bold}!\ndsfsd',
    tags: true,
    // border: {
    //     type: 'line'
    // },
    style: {
        fg: 'white',
        bg: 'magenta',
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
    scr.render();
}, 20);

scr.key(['escape', 'q', 'C-c'], function(ch, key) {
    clearInterval(interval);
    return process.exit(0);
});
