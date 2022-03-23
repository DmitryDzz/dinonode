import {ContentMeta, Sprite} from "../src/sprite";

describe("Test meta data extraction", () => {
    it("Empty content", () => {
        const tex = "";
        const meta: ContentMeta = Sprite.extractMeta(tex);
        expect(meta.source).toBe(tex);
        expect(meta.linesCount).toBe(1);
        expect(meta.sourceLines[0]).toBe("");
        expect(meta.strippedLines[0]).toBe("");
        expect(meta.sourceMeta[0].length).toBe(0);
        expect(meta.coloredLines[0]).toBe("");
        expect(meta.coloredLinesMeta[0].length).toBe(0);
    });

    it("A content without tags", () => {
        const tex =
            "abcd\n" +
            "efgh\n" +
            "ijkl";
        const meta: ContentMeta = Sprite.extractMeta(tex);
        expect(meta.source).toBe(tex);
        expect(meta.linesCount).toBe(3);
        expect(meta.sourceLines[0]).toBe("abcd");
        expect(meta.sourceLines[1]).toBe("efgh");
        expect(meta.sourceLines[2]).toBe("ijkl");
        expect(meta.strippedLines[0]).toBe("abcd");
        expect(meta.strippedLines[1]).toBe("efgh");
        expect(meta.strippedLines[2]).toBe("ijkl");
        expect(meta.sourceMeta[0].length).toBe(0);
        expect(meta.sourceMeta[1].length).toBe(0);
        expect(meta.sourceMeta[1].length).toBe(0);
        expect(meta.coloredLines[0]).toBe("abcd");
        expect(meta.coloredLines[1]).toBe("efgh");
        expect(meta.coloredLines[2]).toBe("ijkl");
        expect(meta.coloredLinesMeta[0].length).toBe(0);
        expect(meta.coloredLinesMeta[1].length).toBe(0);
        expect(meta.coloredLinesMeta[2].length).toBe(0);
    });

    it("A content with tags in lines", () => {
        const tex =
            "{#123}abcd{/}\n" +
            "efgh\n" +
            "i{#321}jk{/}l";
        const meta: ContentMeta = Sprite.extractMeta(tex);
        expect(meta.source).toBe(tex);
        expect(meta.linesCount).toBe(3);

        expect(meta.sourceLines[0]).toBe("{#123}abcd{/}");
        expect(meta.sourceLines[1]).toBe("efgh");
        expect(meta.sourceLines[2]).toBe("i{#321}jk{/}l");

        expect(meta.strippedLines[0]).toBe("abcd");
        expect(meta.strippedLines[1]).toBe("efgh");
        expect(meta.strippedLines[2]).toBe("ijkl");

        expect(meta.sourceMeta[0].length).toBe(2);
        expect(meta.sourceMeta[0][0].tag).toBe("{#123}");
        expect(meta.sourceMeta[0][0].position).toBe(0);
        expect(meta.sourceMeta[0][1].tag).toBe("{/}");
        expect(meta.sourceMeta[0][1].position).toBe(4);
        expect(meta.sourceMeta[1].length).toBe(0);
        expect(meta.sourceMeta[2].length).toBe(2);
        expect(meta.sourceMeta[2][0].tag).toBe("{#321}");
        expect(meta.sourceMeta[2][0].position).toBe(1);
        expect(meta.sourceMeta[2][1].tag).toBe("{/}");
        expect(meta.sourceMeta[2][1].position).toBe(3);

        expect(meta.coloredLines[0]).toBe("{#123}abcd{/}");
        expect(meta.coloredLines[1]).toBe("efgh");
        expect(meta.coloredLines[2]).toBe("i{#321}jk{/}l");

        expect(meta.coloredLinesMeta[0].length).toBe(2);
        expect(meta.coloredLinesMeta[0][0].tag).toBe("{#123}");
        expect(meta.coloredLinesMeta[0][0].position).toBe(0);
        expect(meta.coloredLinesMeta[0][1].tag).toBe("{/}");
        expect(meta.coloredLinesMeta[0][1].position).toBe(4);
        expect(meta.coloredLinesMeta[1].length).toBe(0);
        expect(meta.coloredLinesMeta[2].length).toBe(2);
        expect(meta.coloredLinesMeta[2][0].tag).toBe("{#321}");
        expect(meta.coloredLinesMeta[2][0].position).toBe(1);
        expect(meta.coloredLinesMeta[2][1].tag).toBe("{/}");
        expect(meta.coloredLinesMeta[2][1].position).toBe(3);
    });

    it("A content with tags through lines", () => {
        const tex =
            "{#123}abcd\n" +
            "efgh\n" +
            "ijk{/}l";
        const meta: ContentMeta = Sprite.extractMeta(tex);
        expect(meta.source).toBe(tex);
        expect(meta.linesCount).toBe(3);

        expect(meta.sourceLines[0]).toBe("{#123}abcd");
        expect(meta.sourceLines[1]).toBe("efgh");
        expect(meta.sourceLines[2]).toBe("ijk{/}l");

        expect(meta.strippedLines[0]).toBe("abcd");
        expect(meta.strippedLines[1]).toBe("efgh");
        expect(meta.strippedLines[2]).toBe("ijkl");

        expect(meta.sourceMeta[0].length).toBe(1);
        expect(meta.sourceMeta[0][0].tag).toBe("{#123}");
        expect(meta.sourceMeta[0][0].position).toBe(0);
        expect(meta.sourceMeta[1].length).toBe(0);
        expect(meta.sourceMeta[2].length).toBe(1);
        expect(meta.sourceMeta[2][0].tag).toBe("{/}");
        expect(meta.sourceMeta[2][0].position).toBe(3);

        expect(meta.coloredLines[0]).toBe("{#123}abcd{/}");
        expect(meta.coloredLines[1]).toBe("{#123}efgh{/}");
        expect(meta.coloredLines[2]).toBe("{#123}ijk{/}l");

        expect(meta.coloredLinesMeta[0].length).toBe(2);
        expect(meta.coloredLinesMeta[0][0].tag).toBe("{#123}");
        expect(meta.coloredLinesMeta[0][0].position).toBe(0);
        expect(meta.coloredLinesMeta[0][1].tag).toBe("{/}");
        expect(meta.coloredLinesMeta[0][1].position).toBe(4);
        expect(meta.coloredLinesMeta[1].length).toBe(2);
        expect(meta.coloredLinesMeta[1][0].tag).toBe("{#123}");
        expect(meta.coloredLinesMeta[1][0].position).toBe(0);
        expect(meta.coloredLinesMeta[1][1].tag).toBe("{/}");
        expect(meta.coloredLinesMeta[1][1].position).toBe(4);
        expect(meta.coloredLinesMeta[2].length).toBe(2);
        expect(meta.coloredLinesMeta[2][0].tag).toBe("{#123}");
        expect(meta.coloredLinesMeta[2][0].position).toBe(0);
        expect(meta.coloredLinesMeta[2][1].tag).toBe("{/}");
        expect(meta.coloredLinesMeta[2][1].position).toBe(3);
    });
});

describe("Test colored content to colored lines content conversion", () => {
    it("Empty content should be the same", () => {
        const tex = "";
        expect(Sprite.toColoredLines(tex)).toBe("");
    });

    it("No colors content should be the same", () => {
        const tex =
            "abcd\n" +
            "efgh\n" +
            "ijkl";
        expect(Sprite.toColoredLines(tex)).toBe("abcd\nefgh\nijkl");
    });

    it("Colored lines should be the same", () => {
        const tex =
            "{abc}0123{/}\n" +
            "4567\n" +
            "8{def}9A{/}B";
        expect(Sprite.toColoredLines(tex)).toBe(tex);
    });

    it("Colors through lines", () => {
        const tex =
            "01{abc}23\n" +
            "4567\n" +
            "89A{/}B";
        expect(Sprite.toColoredLines(tex)).toBe(
            "01{abc}23{/}\n" +
            "{abc}4567{/}\n" +
            "{abc}89A{/}B"
        );
    });
});

describe("Test colored content to stripped lines content conversion", () => {
    it("Empty content should be the same", () => {
        const tex = "";
        expect(Sprite.toStrippedLines(tex)).toBe("");
    });

    it("No colors content should be the same", () => {
        const tex =
            "abcd\n" +
            "efgh\n" +
            "ijkl";
        expect(Sprite.toStrippedLines(tex)).toBe("abcd\nefgh\nijkl");
    });

    it("Colored lines should be the same", () => {
        const tex =
            "0123\n" +
            "4567\n" +
            "89AB";
        expect(Sprite.toStrippedLines(tex)).toBe(tex);
    });

    it("Colors through lines", () => {
        const tex =
            "01{abc}23\n" +
            "4567\n" +
            "89A{/}B";
        expect(Sprite.toStrippedLines(tex)).toBe(
            "0123\n" +
            "4567\n" +
            "89AB"
        );
    });
});