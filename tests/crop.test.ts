import {Enemy} from "../src/characters/enemy";

describe("Test sprite crop", () => {
    const frame: string =
        "0123\n" +
        "4567\n" +
        "89AB";

    const scrW = 8;
    const scrH = 5;

    /**
     *  01234567
     * 0--------
     * 1--0123--
     * 2--4567--
     * 3--89AB--
     * 4--------
     */
    it("No crop", () => {
        const croppedFrame = Enemy.cropFrame({c: 2, r: 1, w: 4, h: 3}, scrW, scrH, frame)
        expect(croppedFrame.spriteRect).toBeDefined();
        expect(croppedFrame.frameContent).toBeDefined();
        expect(croppedFrame.spriteRect).toEqual( frame);
    });
});