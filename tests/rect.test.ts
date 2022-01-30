import {Rect} from "../src/rect";

describe("Intersection tests", () => {
    /**
     *  0123456
     * 0┌───┐
     * 1│ ┏━┿━┓
     * 2└─╂─┘ ┃
     * 3  ┗━━━┛
     */
    it("Intersection test #1", () => {
        const rThis: Rect = new Rect({c0: 2, r0: 1, c1: 6, r1: 3});
        const rOther: Rect = new Rect({c0: 0, r0: 0, c1: 4, r1: 2});
        expect(rThis.intersects(rOther)).toBe(true);
    });

    /**
     *  0123456
     * 0 ┌───┐
     * 1┏┿━━━┿┓
     * 2┃└───┘┃
     * 3┗━━━━━┛
     */
    it("Intersection test #2", () => {
        const rThis: Rect = new Rect({c0: 0, r0: 1, c1: 6, r1: 3});
        const rOther: Rect = new Rect({c0: 1, r0: 0, c1: 5, r1: 2});
        expect(rThis.intersects(rOther)).toBe(true);
    });

    /**
     *  0123456
     * 0  ┌───┐
     * 1┏━┿━┓ │
     * 2┃ └─╂─┘
     * 3┗━━━┛
     */
    it("Intersection test #3", () => {
        const rThis: Rect = new Rect({c0: 0, r0: 1, c1: 4, r1: 3});
        const rOther: Rect = new Rect({c0: 2, r0: 0, c1: 6, r1: 2});
        expect(rThis.intersects(rOther)).toBe(true);
    });

    /**
     *  0123456
     * 0┏━━━┓
     * 1┃ ┌─╂─┐
     * 2┃ │ ┃ │
     * 3┃ └─╂─┘
     * 4┗━━━┛
     */
    it("Intersection test #4", () => {
        const rThis: Rect = new Rect({c0: 0, r0: 0, c1: 4, r1: 4});
        const rOther: Rect = new Rect({c0: 2, r0: 1, c1: 6, r1: 3});
        expect(rThis.intersects(rOther)).toBe(true);
    });

    /**
     *  0123456
     * 0┏━━━┓
     * 1┃ ┌─╂─┐
     * 2┗━┿━┛ │
     * 3  └───┘
     */
    it("Intersection test #5", () => {
        const rThis: Rect = new Rect({c0: 0, r0: 0, c1: 4, r1: 2});
        const rOther: Rect = new Rect({c0: 2, r0: 1, c1: 6, r1: 3});
        expect(rThis.intersects(rOther)).toBe(true);
    });

    /**
     *  0123456
     * 0┏━━━━━┓
     * 1┃┌───┐┃
     * 2┗┿━━━┿┛
     * 3 └───┘
     */
    it("Intersection test #6", () => {
        const rThis: Rect = new Rect({c0: 0, r0: 0, c1: 6, r1: 2});
        const rOther: Rect = new Rect({c0: 1, r0: 1, c1: 5, r1: 3});
        expect(rThis.intersects(rOther)).toBe(true);
    });

    /**
     *  0123456
     * 0  ┏━━━┓
     * 1┌─╂─┐ ┃
     * 2│ ┗━┿━┛
     * 3└───┘
     */
    it("Intersection test #7", () => {
        const rThis: Rect = new Rect({c0: 2, r0: 0, c1: 6, r1: 2});
        const rOther: Rect = new Rect({c0: 0, r0: 1, c1: 4, r1: 3});
        expect(rThis.intersects(rOther)).toBe(true);
    });

    /**
     *  0123456
     * 0  ┏━━━┓
     * 1┌─╂─┐ ┃
     * 2│ ┃ │ ┃
     * 3└─╂─┘ ┃
     * 4  ┗━━━┛
     */
    it("Intersection test #8", () => {
        const rThis: Rect = new Rect({c0: 2, r0: 0, c1: 6, r1: 4});
        const rOther: Rect = new Rect({c0: 0, r0: 1, c1: 4, r1: 3});
        expect(rThis.intersects(rOther)).toBe(true);
    });

    /**
     *  0123456
     * 0┏━━━━━┓
     * 1┃┌───┐┃
     * 2┃│   │┃
     * 3┃└───┘┃
     * 4┗━━━━━┛
     */
    it("Intersection test #9", () => {
        const rThis: Rect = new Rect({c0: 0, r0: 0, c1: 6, r1: 4});
        const rOther: Rect = new Rect({c0: 1, r0: 1, c1: 5, r1: 3});
        expect(rThis.intersects(rOther)).toBe(true);
    });

    /**
     *  01234567
     * 0┌──────┐
     * 1│┏━━━━┓│
     * 2│┃    ┃│
     * 3│┃    ┃│
     * 4│┃    ┃│
     * 5│┗━━━━┛│
     * 6└──────┘
     */
    it("Intersection test #10", () => {
        const rThis: Rect = new Rect({c0: 1, r0: 1, c1: 6, r1: 5});
        const rOther: Rect = new Rect({c0: 0, r0: 0, c1: 7, r1: 6});
        expect(rThis.intersects(rOther)).toBe(true);
    });
});

describe("No intersection tests", () => {
    /**
     *  0123456789
     * 0┌──┐
     * 1│  │
     * 2└──┘
     * 3    ┏━━━━┓
     * 4    ┃    ┃
     * 5    ┃    ┃
     * 6    ┃    ┃
     * 7    ┗━━━━┛
     */
    it("No intersection test #1", () => {
        const rThis: Rect = new Rect({c0: 4, r0: 3, c1: 9, r1: 7});
        const rOther: Rect = new Rect({c0: 0, r0: 0, c1: 3, r1: 2});
        expect(rThis.intersects(rOther)).toBe(false);
    });

    /**
     *  01234567
     * 0┌──┐
     * 1│  │
     * 2└──┘
     * 3  ┏━━━━┓
     * 4  ┃    ┃
     * 5  ┃    ┃
     * 6  ┃    ┃
     * 7  ┗━━━━┛
     */
    it("No intersection test #2", () => {
        const rThis: Rect = new Rect({c0: 2, r0: 3, c1: 7, r1: 7});
        const rOther: Rect = new Rect({c0: 0, r0: 0, c1: 3, r1: 2});
        expect(rThis.intersects(rOther)).toBe(false);
    });

    /**
     *  012345
     * 0 ┌──┐
     * 1 │  │
     * 2 └──┘
     * 3┏━━━━┓
     * 4┃    ┃
     * 5┃    ┃
     * 6┃    ┃
     * 7┗━━━━┛
     */
    it("No intersection test #3", () => {
        const rThis: Rect = new Rect({c0: 0, r0: 3, c1: 5, r1: 7});
        const rOther: Rect = new Rect({c0: 1, r0: 0, c1: 4, r1: 2});
        expect(rThis.intersects(rOther)).toBe(false);
    });

    /**
     *  01234567
     * 0    ┌──┐
     * 1    │  │
     * 2    └──┘
     * 3┏━━━━┓
     * 4┃    ┃
     * 5┃    ┃
     * 6┃    ┃
     * 7┗━━━━┛
     */
    it("No intersection test #4", () => {
        const rThis: Rect = new Rect({c0: 0, r0: 3, c1: 5, r1: 7});
        const rOther: Rect = new Rect({c0: 4, r0: 0, c1: 7, r1: 2});
        expect(rThis.intersects(rOther)).toBe(false);
    });

    /**
     *  0123456789
     * 0      ┌──┐
     * 1      │  │
     * 2      └──┘
     * 3┏━━━━┓
     * 4┃    ┃
     * 5┃    ┃
     * 6┃    ┃
     * 7┗━━━━┛
     */
    it("No intersection test #5", () => {
        const rThis: Rect = new Rect({c0: 0, r0: 3, c1: 5, r1: 7});
        const rOther: Rect = new Rect({c0: 6, r0: 0, c1: 9, r1: 2});
        expect(rThis.intersects(rOther)).toBe(false);
    });

    /**
     *  0123456789
     * 0      ┌──┐
     * 1┏━━━━┓│  │
     * 2┃    ┃└──┘
     * 3┃    ┃
     * 4┃    ┃
     * 5┗━━━━┛
     */
    it("No intersection test #6", () => {
        const rThis: Rect = new Rect({c0: 0, r0: 1, c1: 5, r1: 5});
        const rOther: Rect = new Rect({c0: 6, r0: 0, c1: 9, r1: 2});
        expect(rThis.intersects(rOther)).toBe(false);
    });

    /**
     *  0123456789
     * 0┏━━━━┓
     * 1┃    ┃┌──┐
     * 2┃    ┃│  │
     * 3┃    ┃└──┘
     * 4┗━━━━┛
     */
    it("No intersection test #7", () => {
        const rThis: Rect = new Rect({c0: 0, r0: 0, c1: 5, r1: 4});
        const rOther: Rect = new Rect({c0: 6, r0: 1, c1: 9, r1: 3});
        expect(rThis.intersects(rOther)).toBe(false);
    });

    /**
     *  0123456789
     * 0┏━━━━┓
     * 1┃    ┃
     * 2┃    ┃
     * 3┃    ┃┌──┐
     * 4┗━━━━┛│  │
     * 5      └──┘
     */
    it("No intersection test #8", () => {
        const rThis: Rect = new Rect({c0: 0, r0: 0, c1: 5, r1: 4});
        const rOther: Rect = new Rect({c0: 6, r0: 3, c1: 9, r1: 5});
        expect(rThis.intersects(rOther)).toBe(false);
    });

    /**
     *  0123456789
     * 0┏━━━━┓
     * 1┃    ┃
     * 2┃    ┃
     * 3┃    ┃
     * 4┗━━━━┛
     * 5      ┌──┐
     * 6      │  │
     * 7      └──┘
     */
    it("No intersection test #9", () => {
        const rThis: Rect = new Rect({c0: 0, r0: 0, c1: 5, r1: 4});
        const rOther: Rect = new Rect({c0: 6, r0: 5, c1: 9, r1: 7});
        expect(rThis.intersects(rOther)).toBe(false);
    });

    /**
     *  01234567
     * 0┏━━━━┓
     * 1┃    ┃
     * 2┃    ┃
     * 3┃    ┃
     * 4┗━━━━┛
     * 5    ┌──┐
     * 6    │  │
     * 7    └──┘
     */
    it("No intersection test #10", () => {
        const rThis: Rect = new Rect({c0: 0, r0: 0, c1: 5, r1: 4});
        const rOther: Rect = new Rect({c0: 4, r0: 5, c1: 7, r1: 7});
        expect(rThis.intersects(rOther)).toBe(false);
    });

    /**
     *  012345
     * 0┏━━━━┓
     * 1┃    ┃
     * 2┃    ┃
     * 3┃    ┃
     * 4┗━━━━┛
     * 5 ┌──┐
     * 6 │  │
     * 7 └──┘
     */
    it("No intersection test #11", () => {
        const rThis: Rect = new Rect({c0: 0, r0: 0, c1: 5, r1: 4});
        const rOther: Rect = new Rect({c0: 1, r0: 5, c1: 4, r1: 7});
        expect(rThis.intersects(rOther)).toBe(false);
    });

    /**
     *  01234567
     * 0  ┏━━━━┓
     * 1  ┃    ┃
     * 2  ┃    ┃
     * 3  ┃    ┃
     * 4  ┗━━━━┛
     * 5┌──┐
     * 6│  │
     * 7└──┘
     */
    it("No intersection test #12", () => {
        const rThis: Rect = new Rect({c0: 2, r0: 0, c1: 7, r1: 4});
        const rOther: Rect = new Rect({c0: 0, r0: 5, c1: 3, r1: 7});
        expect(rThis.intersects(rOther)).toBe(false);
    });

    /**
     *  0123456789
     * 0    ┏━━━━┓
     * 1    ┃    ┃
     * 2    ┃    ┃
     * 3    ┃    ┃
     * 4    ┗━━━━┛
     * 5┌──┐
     * 6│  │
     * 7└──┘
     */
    it("No intersection test #13", () => {
        const rThis: Rect = new Rect({c0: 4, r0: 0, c1: 9, r1: 4});
        const rOther: Rect = new Rect({c0: 0, r0: 5, c1: 3, r1: 7});
        expect(rThis.intersects(rOther)).toBe(false);
    });

    /**
     *  0123456789
     * 0    ┏━━━━┓
     * 1    ┃    ┃
     * 2    ┃    ┃
     * 3┌──┐┃    ┃
     * 4│  │┗━━━━┛
     * 5└──┘
     */
    it("No intersection test #14", () => {
        const rThis: Rect = new Rect({c0: 4, r0: 0, c1: 9, r1: 4});
        const rOther: Rect = new Rect({c0: 0, r0: 3, c1: 3, r1: 5});
        expect(rThis.intersects(rOther)).toBe(false);
    });

    /**
     *  0123456789
     * 0    ┏━━━━┓
     * 1┌──┐┃    ┃
     * 2│  │┃    ┃
     * 3└──┘┃    ┃
     * 4    ┗━━━━┛
     */
    it("No intersection test #15", () => {
        const rThis: Rect = new Rect({c0: 4, r0: 0, c1: 9, r1: 4});
        const rOther: Rect = new Rect({c0: 0, r0: 1, c1: 3, r1: 3});
        expect(rThis.intersects(rOther)).toBe(false);
    });

    /**
     *  0123456789
     * 0┌──┐
     * 1│  │┏━━━━┓
     * 2└──┘┃    ┃
     * 3    ┃    ┃
     * 4    ┃    ┃
     * 5    ┗━━━━┛
     */
    it("No intersection test #16", () => {
        const rThis: Rect = new Rect({c0: 4, r0: 1, c1: 9, r1: 5});
        const rOther: Rect = new Rect({c0: 0, r0: 0, c1: 3, r1: 2});
        expect(rThis.intersects(rOther)).toBe(false);
    });
});