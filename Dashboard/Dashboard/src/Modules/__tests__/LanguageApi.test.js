import LanguageApi from '../LanguageApi';

test('getRes(langcode,resKey) return correct result with correct langcode', () => {
        expect(LanguageApi.getRes("cs", "c_turnover")).toBe("交易額");
});

test('getRes(langcode,resKey) return english result with incorrect langcode', () => {
        expect(LanguageApi.getRes("abc", "c_turnover")).toBe("Turnover by Platform");
});