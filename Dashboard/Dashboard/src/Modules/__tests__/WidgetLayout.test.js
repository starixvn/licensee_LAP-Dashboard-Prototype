import WidgetLayout from '../WidgetLayout';
import LocalStorageHelper from '../LocalStorageHelper';
import { Wglayouts } from '../../config';

jest.mock('../LocalStorageHelper')

describe('removeWidgetFromLayout(layouts, key)', () => {
    const layouts = {
        a:[{ i: 'a' }, { i: 'bb' }, { i: 'ccc' }],
        b:[{ i: 'a' }, { i: 'bb' }, { i: 'ccc' }],
        c:[{ i: 'a' }, { i: 'bb' }, { i: 'ccc' }],
    };

    test('key is found: remove widget from all breakpoints', () => {
        const newLayout = WidgetLayout._removeWidgetFromLayout(layouts, 'bb');
        expect(newLayout).toEqual({
            a:[{ i: 'a' }, { i: 'ccc' }],
            b:[{ i: 'a' }, { i: 'ccc' }],
            c:[{ i: 'a' }, { i: 'ccc' }],
        });
    });

    test('key is nout found: return layouts', () => {
        const newLayout = WidgetLayout._removeWidgetFromLayout(layouts, 'not found');
        expect(newLayout).toEqual(layouts);
    });

    test('no layouts: return empty object', () => {
        const newLayout = WidgetLayout._removeWidgetFromLayout(null, 'anykey');
        expect(newLayout).toEqual({});
    });
});

describe('_addWidgetToLayout(layouts, widgetLayout)', () => {
    test('add given layout to layout settings', () => {
        const layouts = {
            lg:[{ i: 'aaa' }, { i: 'bb' }, { i: 'c' }],
            md:[{ i: 'aaa' }, { i: 'bb' }, { i: 'c' }],
            sm:[{ i: 'aaa' }, { i: 'bb' }, { i: 'c' }],
            xs:[{ i: 'aaa' }, { i: 'bb' }, { i: 'c' }],
            xxs:[{ i: 'aaa' }, { i: 'bb' }, { i: 'c' }]
        };
        const widgetLayout = {
            lg: { i: 'n_reg_customer', a:1, b:2 },
            md: { i: 'n_reg_customer', a:1, b:2 },
            sm: { i: 'n_reg_customer', a:1, b:2 },
            xs: { i: 'n_reg_customer', a:1, b:2 },
            xxs: { i: 'n_reg_customer', a:1, b:2 }
        };

        const newLayouts = WidgetLayout._addWidgetToLayout(layouts, widgetLayout);
        expect(newLayouts).toEqual({
            lg:[{ i: 'aaa' }, { i: 'bb' }, { i: 'c' }, { i: 'n_reg_customer', a:1, b:2 }],
            md:[{ i: 'aaa' }, { i: 'bb' }, { i: 'c' }, { i: 'n_reg_customer', a:1, b:2 }],
            sm:[{ i: 'aaa' }, { i: 'bb' }, { i: 'c' }, { i: 'n_reg_customer', a:1, b:2 }],
            xs:[{ i: 'aaa' }, { i: 'bb' }, { i: 'c' }, { i: 'n_reg_customer', a:1, b:2 }],
            xxs:[{ i: 'aaa' }, { i: 'bb' }, { i: 'c' },{ i: 'n_reg_customer', a:1, b:2 }]
        });
    });

    test('invalid widget layout: do not add', () => {
        const layouts = {
            lg:[{ i: 'aaa' }, { i: 'bb' }, { i: 'c' }],
            md:[{ i: 'aaa' }, { i: 'bb' }, { i: 'c' }],
            sm:[{ i: 'aaa' }, { i: 'bb' }, { i: 'c' }],
            xs:[{ i: 'aaa' }, { i: 'bb' }, { i: 'c' }],
            xxs:[{ i: 'aaa' }, { i: 'bb' }, { i: 'c' }]
        };
        const invalidWidgetLayout = {
            lg:null,
            md:'i dont know',
            sm:null,
            xs:null,
            xxs:'something else'
        };

        const newLayouts = WidgetLayout._addWidgetToLayout(layouts, invalidWidgetLayout);
        expect(newLayouts).toBe(layouts);
    });
});

describe('getWidgetLayoutSettings()', () => {
    const widgetIsEnabledFilter = w => enabledWidgets.indexOf(w.i) >= 0;
    const enabledWidgets = ['c_turnover', 'c_online_customer', 'n_deposit', 'n_withdrawal'];
    LocalStorageHelper.getWidgetStatus.mockImplementation(() => [
        {key: 'c_turnover', enable: true},
        {key: 'c_licWL',enable: false},
        {key: 'n_reg_customer',enable: false},
        {key: 'c_online_customer',enable: true},
        {key: 'n_customer_balance',enable: false},
        {key: 'n_pending_funds',enable: false},
        {key: 'n_deposit',enable: true},
        {key: 'n_withdrawal',enable: true}
    ]);

    test('don\'t have local settings: store default settings but remove disabled items', () => {
        LocalStorageHelper.getWidgetLayout.mockImplementation(() => null);
        LocalStorageHelper.saveWidgetLayout.mockReset();
        const actual = WidgetLayout.getWidgetLayoutSettings();
        const expected = {
            lg: Wglayouts.lg.filter(widgetIsEnabledFilter),
            md: Wglayouts.md.filter(widgetIsEnabledFilter),
            sm: Wglayouts.sm.filter(widgetIsEnabledFilter),
            xs: Wglayouts.xs.filter(widgetIsEnabledFilter),
            xxs:Wglayouts.xxs.filter(widgetIsEnabledFilter),
        };

        expect(LocalStorageHelper.saveWidgetLayout).toBeCalledWith(expected);
        expect(actual).toEqual(expected);
    });

    test('return local settings but remove disabled items', () => {
        const emptyLayouts = {lg:[], md:[], sm:[], xs:[], xxs:[]};
        let userLayouts = WidgetLayout._addWidgetToLayout(emptyLayouts, WidgetLayout._getWidgetLayoutByKey(Wglayouts, 'c_turnover'));
        userLayouts = WidgetLayout._addWidgetToLayout(userLayouts, WidgetLayout._getWidgetLayoutByKey(Wglayouts, 'n_reg_customer'));
        
        LocalStorageHelper.getWidgetLayout.mockImplementation(() => userLayouts);
        LocalStorageHelper.saveWidgetLayout.mockReset();
        const actual = WidgetLayout.getWidgetLayoutSettings();
        let expected = WidgetLayout._addWidgetToLayout(emptyLayouts, WidgetLayout._getWidgetLayoutByKey(Wglayouts, 'c_turnover'));
        expected = WidgetLayout._addWidgetToLayout(expected, WidgetLayout._getWidgetLayoutByKey(Wglayouts, 'c_online_customer'));
        expected = WidgetLayout._addWidgetToLayout(expected, WidgetLayout._getWidgetLayoutByKey(Wglayouts, 'n_deposit'));
        expected = WidgetLayout._addWidgetToLayout(expected, WidgetLayout._getWidgetLayoutByKey(Wglayouts, 'n_withdrawal'));
        
        expect(LocalStorageHelper.saveWidgetLayout).toBeCalledWith(expected);
        expect(actual).toEqual(expected);
    });
});