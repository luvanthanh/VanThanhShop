(() => {
    const windows1252Bytes = new Map([
        [0x20ac, 0x80], [0x201a, 0x82], [0x0192, 0x83], [0x201e, 0x84],
        [0x2026, 0x85], [0x2020, 0x86], [0x2021, 0x87], [0x02c6, 0x88],
        [0x2030, 0x89], [0x0160, 0x8a], [0x2039, 0x8b], [0x0152, 0x8c],
        [0x017d, 0x8e], [0x2018, 0x91], [0x2019, 0x92], [0x201c, 0x93],
        [0x201d, 0x94], [0x2022, 0x95], [0x2013, 0x96], [0x2014, 0x97],
        [0x02dc, 0x98], [0x2122, 0x99], [0x0161, 0x9a], [0x203a, 0x9b],
        [0x0153, 0x9c], [0x017e, 0x9e], [0x0178, 0x9f]
    ]);
    const mojibakePattern = /(?:Ã|Â|Ä|Å|Æ|â|ä|å|æ|ç|ð|ñ|ø|þ)[\u0080-\u00ff\u2013\u2014\u2018\u2019\u20ac]|á(?:º|»)[\u0080-\u00ff\u2013-\u203a\u20ac]/g;

    const mojibakeCount = value => (value.match(mojibakePattern) || []).length;

    const recoverUtf8 = value => {
        value = value.replace(/Ã /g, "Ã\u00a0");
        const encoder = new TextEncoder();
        const bytes = [];
        const originalCharacters = [];

        for (const character of value) {
            const codePoint = character.codePointAt(0);
            const byte = codePoint <= 0xff
                ? codePoint
                : windows1252Bytes.get(codePoint);

            if (byte !== undefined) {
                bytes.push(byte);
                originalCharacters.push(character);
            } else {
                const encoded = encoder.encode(character);
                bytes.push(...encoded);
                originalCharacters.push(...Array(encoded.length).fill(character));
            }
        }

        const decoder = new TextDecoder("utf-8", { fatal: true });
        let recovered = "";
        for (let index = 0; index < bytes.length;) {
            const firstByte = bytes[index];
            const sequenceLength = firstByte < 0x80 ? 1
                : firstByte >= 0xc2 && firstByte <= 0xdf ? 2
                    : firstByte >= 0xe0 && firstByte <= 0xef ? 3
                        : firstByte >= 0xf0 && firstByte <= 0xf4 ? 4
                            : 0;

            if (sequenceLength > 0 && index + sequenceLength <= bytes.length) {
                try {
                    recovered += decoder.decode(new Uint8Array(bytes.slice(index, index + sequenceLength)));
                    index += sequenceLength;
                    continue;
                } catch {
                    // Keep an invalid byte as-is and continue recovering later sequences.
                }
            }

            recovered += originalCharacters[index];
            index += 1;
        }

        return recovered;
    };

    window.repairVietnameseText = value => {
        if (typeof value !== "string") return value;

        let current = value.replace(/([Cc])hÃnh/g, (_, firstLetter) => `${firstLetter}hính`);
        for (let attempt = 0; attempt < 3 && mojibakeCount(current) > 0; attempt += 1) {
            const recovered = recoverUtf8(current);
            if (recovered === current) break;
            current = recovered;
        }

        return current;
    };
})();
