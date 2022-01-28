import {Dino} from "../src/characters/dino";

describe("Test horizontal flip strings", () => {
    it("flip empty string", () => {
        expect(Dino.flipRow("")).toBe("");
    });

    it("flip string", () => {
        expect(Dino.flipRow("12345")).toBe("54321");
    });

    it("flip string with unpaired command", () => {
        expect(Dino.flipRow("12{abc}345")).toBe("54321");
    });

    it("flip string with command #1", () => {
        expect(Dino.flipRow("12{abc}34{de}5")).toBe("5{abc}43{de}21");
    });

    it("flip string with command #2", () => {
        expect(Dino.flipRow("{abc}12{de}345")).toBe("543{abc}21{de}");
    });

    it("flip string with command #3", () => {
        expect(Dino.flipRow("12{abc}345{de}")).toBe("{abc}543{de}21");
    });

    it("flip string with two commands", () => {
        expect(Dino.flipRow("01{#g}23{/g}45{#r}67{/r}89"))
            .toBe("98{#r}76{/r}54{#g}32{/g}10");
    });
});

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

    it("don\'t flip color info #1", () => {
        const tex =
            "12345\n" +
            "ab{hello}cde{world}\n" +
            "ABCDE";
        expect(Dino.flip(tex)).toBe(
            "54321\n" +
            "{hello}edc{world}ba\n" +
            "EDCBA");
    });

    it("don\'t flip color info #2", () => {
        const tex =
            "12345\n" +
            "{hello}abc{world}de\n" +
            "ABCDE";
        expect(Dino.flip(tex)).toBe(
            "54321\n" +
            "ed{hello}cba{world}\n" +
            "EDCBA");
    });
});