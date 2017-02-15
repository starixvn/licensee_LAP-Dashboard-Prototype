import NumberFormat from '../Number';

describe('formatCurrency()', () => {
    test('format without param currency', () => {
        expect(NumberFormat.formatCurrency(1234.1)).toBe("1,234.10");
    });

    test('format without incorrect currency', () => {
        expect(NumberFormat.formatCurrency(1234.1, "THB")).toBe("1,234.10");
    });

    test('format without correct currency', () => {
        expect(NumberFormat.formatCurrency(1234.1, "CNY")).toBe("¥1,234.10");
    });
});

describe('formatDecimal()', () => {
    test('has default 2 decimal places', () => {
        expect(NumberFormat.formatDecimal(1234.1)).toBe("1,234.10");
    });
});

describe('format()', () => {
    test('format an integer number with 3 decimal places', () => {
        expect(NumberFormat.format(1234, 3)).toBe("1,234.000");
    });

    test('format an decimal number with 2 decimal places', () => {
        expect(NumberFormat.format(1234.149, 2)).toBe("1,234.15");
    });
});
