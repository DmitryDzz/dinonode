import {Sprite} from "../src/sprite";
import {RectW} from "../src/rect";

describe("Test sprite crop", () => {
    const frame: string =
        "0{abc}123\n" +
        "4567\n" +
        "8{/}9AB";

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
        const croppedFrame = Sprite.cropFrame(sprite, scrW, scrH, frame)
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
        const croppedFrame = Sprite.cropFrame(sprite, scrW, scrH, frame)
        expect(croppedFrame.spriteRect).toBeDefined();
        expect(croppedFrame.frameContent).toBeDefined();
        expect(croppedFrame.spriteRect).toMatchObject({c: 0, r: 1, w: 2, h: 3});
        expect(croppedFrame.frameContent).toBe("{abc}23{/}\n{abc}67{/}\nAB");
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
        const croppedFrame = Sprite.cropFrame(sprite, scrW, scrH, frame)
        expect(croppedFrame.spriteRect).toBeDefined();
        expect(croppedFrame.frameContent).toBeDefined();
        expect(croppedFrame.spriteRect).toMatchObject(sprite);
        expect(croppedFrame.frameContent).toBe("0{abc}123{/}\n{abc}4567{/}\n{abc}8{/}9AB");
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
        const croppedFrame = Sprite.cropFrame(sprite, scrW, scrH, frame)
        expect(croppedFrame.spriteRect).toBeDefined();
        expect(croppedFrame.frameContent).toBeDefined();
        expect(croppedFrame.spriteRect).toMatchObject({c: 6, r: 1, w: 2, h: 3});
        expect(croppedFrame.frameContent).toBe("{abc}01{/}\n{abc}45{/}\n{abc}8{/}9");
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
        const croppedFrame = Sprite.cropFrame(sprite, scrW, scrH, frame)
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
        const croppedFrame = Sprite.cropFrame(sprite, scrW, scrH, frame)
        expect(croppedFrame.spriteRect).toBeUndefined();
        expect(croppedFrame.frameContent).toBeUndefined();
    });

    /**
     *     01234567+
     * -1    0123
     *  0  --4567--
     *  1  --89AB--
     *  2  --------
     *  3  --------
     *  4  --------
     */
    it("On the top border", () => {
        const sprite: RectW = {c: 2, r: -1, w: 4, h: 3};
        const croppedFrame = Sprite.cropFrame(sprite, scrW, scrH, frame)
        expect(croppedFrame.spriteRect).toBeDefined();
        expect(croppedFrame.frameContent).toBeDefined();
        expect(croppedFrame.spriteRect).toMatchObject({c: 2, r: 0, w: 4, h: 2});
        expect(croppedFrame.frameContent).toBe("{abc}4567{/}\n{abc}8{/}9AB");
    });

    /**
     *     01234567+
     *  0  --------
     *  1  --------
     *  2  --------
     *  3  --0123--
     *  4  --4567--
     *  5    89AB
     */
    it("On the bottom border", () => {
        const sprite: RectW = {c: 2, r: 3, w: 4, h: 3};
        const croppedFrame = Sprite.cropFrame(sprite, scrW, scrH, frame)
        expect(croppedFrame.spriteRect).toBeDefined();
        expect(croppedFrame.frameContent).toBeDefined();
        expect(croppedFrame.spriteRect).toMatchObject({c: 2, r: 3, w: 4, h: 2});
        expect(croppedFrame.frameContent).toBe("{abc}0123{/}\n{abc}4567{/}");
    });

    /**
     *    -2101234567+
     * -1  0123
     *  0  4567------
     *  1  89AB------
     *  2    --------
     *  3    --------
     *  4    --------
     */
    it("On the top-left corner", () => {
        const sprite: RectW = {c: -2, r: -1, w: 4, h: 3};
        const croppedFrame = Sprite.cropFrame(sprite, scrW, scrH, frame)
        expect(croppedFrame.spriteRect).toBeDefined();
        expect(croppedFrame.frameContent).toBeDefined();
        expect(croppedFrame.spriteRect).toMatchObject({c: 0, r: 0, w: 2, h: 2});
        expect(croppedFrame.frameContent).toBe("{abc}67{/}\nAB");
    });

    /**
     *    -2101234567+
     *  0    --------
     *  1    --------
     *  2    --------
     *  3  0123------
     *  4  4567------
     *  5  89AB
     */
    it("On the bottom-left corner", () => {
        const sprite: RectW = {c: -2, r: 3, w: 4, h: 3};
        const croppedFrame = Sprite.cropFrame(sprite, scrW, scrH, frame)
        expect(croppedFrame.spriteRect).toBeDefined();
        expect(croppedFrame.frameContent).toBeDefined();
        expect(croppedFrame.spriteRect).toMatchObject({c: 0, r: 3, w: 2, h: 2});
        expect(croppedFrame.frameContent).toBe("{abc}23{/}\n{abc}67{/}");
    });

    /**
     *     0123456789+
     *  0  --------
     *  1  --------
     *  2  --------
     *  3  ------0123
     *  4  ------4567
     *  5        89AB
     */
    it("On the bottom-right corner", () => {
        const sprite: RectW = {c: 6, r: 3, w: 4, h: 3};
        const croppedFrame = Sprite.cropFrame(sprite, scrW, scrH, frame)
        expect(croppedFrame.spriteRect).toBeDefined();
        expect(croppedFrame.frameContent).toBeDefined();
        expect(croppedFrame.spriteRect).toMatchObject({c: 6, r: 3, w: 2, h: 2});
        expect(croppedFrame.frameContent).toBe("{abc}01{/}\n{abc}45{/}");
    });

    /**
     *     0123456789+
     * -1        0123
     *  0  ------4567
     *  1  ------89AB
     *  2  --------
     *  3  --------
     *  4  --------
     */
    it("On the top-right corner", () => {
        const sprite: RectW = {c: 6, r: -1, w: 4, h: 3};
        const croppedFrame = Sprite.cropFrame(sprite, scrW, scrH, frame)
        expect(croppedFrame.spriteRect).toBeDefined();
        expect(croppedFrame.frameContent).toBeDefined();
        expect(croppedFrame.spriteRect).toMatchObject({c: 6, r: 0, w: 2, h: 2});
        expect(croppedFrame.frameContent).toBe("{abc}45{/}\n{abc}8{/}9");
    });
});