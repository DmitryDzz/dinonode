import {Enemy} from "../src/characters/enemy";
import {RectW} from "../src/types";

describe("Test sprite crop", () => {
    const frame: string =
        "0123\n" +
        "4567\n" +
        "89AB";

    const scrW = 8;
    const scrH = 5;

    /**
     *    -5432101234567+
     *  0       --------
     *  1  0123 --------
     *  2  4567 --------
     *  3  89AB --------
     *  4       --------
     */
    it("On the left", () => {
        const sprite: RectW = {c: -5, r: 1, w: 4, h: 3};
        const croppedFrame = Enemy.cropFrame(sprite, scrW, scrH, frame)
        expect(croppedFrame.spriteRect).toBeUndefined();
        expect(croppedFrame.frameContent).toBeUndefined();
    });

    /**
     *    -2101234567+
     *  0    --------
     *  1  0123------
     *  2  4567------
     *  3  89AB------
     *  4    --------
     */
    it("On the left border", () => {
        const sprite: RectW = {c: -2, r: 1, w: 4, h: 3};
        const croppedFrame = Enemy.cropFrame(sprite, scrW, scrH, frame)
        expect(croppedFrame.spriteRect).toBeDefined();
        expect(croppedFrame.frameContent).toBeDefined();
        expect(croppedFrame.spriteRect).toMatchObject({c: 0, r: 1, w: 2, h: 3});
        expect(croppedFrame.frameContent).toBe("23\n67\nAB");
    });

    /**
     *     01234567+
     *  0  --------
     *  1  --0123--
     *  2  --4567--
     *  3  --89AB--
     *  4  --------
     */
    it("No crop", () => {
        const sprite: RectW = {c: 2, r: 1, w: 4, h: 3};
        const croppedFrame = Enemy.cropFrame(sprite, scrW, scrH, frame)
        expect(croppedFrame.spriteRect).toBeDefined();
        expect(croppedFrame.frameContent).toBeDefined();
        expect(croppedFrame.spriteRect).toMatchObject(sprite);
        expect(croppedFrame.frameContent).toBe(frame);
    });

    /**
     *     0123456789+
     *  0  --------
     *  1  ------0123
     *  2  ------4567
     *  3  ------89AB
     *  4  --------
     */
    it("On the right border", () => {
        const sprite: RectW = {c: 6, r: 1, w: 4, h: 3};
        const croppedFrame = Enemy.cropFrame(sprite, scrW, scrH, frame)
        expect(croppedFrame.spriteRect).toBeDefined();
        expect(croppedFrame.frameContent).toBeDefined();
        expect(croppedFrame.spriteRect).toMatchObject({c: 6, r: 1, w: 2, h: 3});
        expect(croppedFrame.frameContent).toBe("01\n45\n89");
    });

    /**
     *     0123456789+
     *  0  --------
     *  1  -------- 0123
     *  2  -------- 4567
     *  3  -------- 89AB
     *  4  --------
     */
    it("On the right", () => {
        const sprite: RectW = {c: 9, r: 1, w: 4, h: 3};
        const croppedFrame = Enemy.cropFrame(sprite, scrW, scrH, frame)
        expect(croppedFrame.spriteRect).toBeUndefined();
        expect(croppedFrame.frameContent).toBeUndefined();
    });

    /**
     *     01234567+
     * -4    0123
     * -3    4567
     * -2    89AB
     * -1
     *  0  --------
     *  1  --------
     *  2  --------
     *  3  --------
     *  4  --------
     */
    it("On top", () => {
        const sprite: RectW = {c: 2, r: -4, w: 4, h: 3};
        const croppedFrame = Enemy.cropFrame(sprite, scrW, scrH, frame)
        expect(croppedFrame.spriteRect).toBeUndefined();
        expect(croppedFrame.frameContent).toBeUndefined();
    });
});