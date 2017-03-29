import LanguageApi from '../LanguageApi';

test('getRes(langcode,resKey) return correct result with correct langcode', () => {
        expect(LanguageApi.getRes("cs", "licensee_winloss_month_todate")).toBe("投注输赢(当月累计)");
});

test('getRes(langcode,resKey) return english result with incorrect langcode', () => {
        expect(LanguageApi.getRes("abc", "c_turnover")).toBe("Turnover by Platform");
});