import {Dino} from "../src/characters/dino";

describe("Test horizontal flip sprites", () => {
    it("flip empty texture", () => {
        const tex = "";
        expect(Dino.flip(tex)).toBe("");
    });

    it("flip one-row texture", () => {
        const tex = "12345";
        expect(Dino.flip(tex)).toBe("54321");
    });

    it("flip one-column texture", () => {
        const tex = "1\n2\n3\n4\n5";
        expect(Dino.flip(tex)).toBe(tex);
    });
});