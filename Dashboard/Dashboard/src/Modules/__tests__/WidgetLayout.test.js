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
        const newLayout = WidgetLayout.removeWidgetFromLayout(layouts, 'bb');
        expect(newLayout).toEqual({
            a:[{ i: 'a' }, { i: 'ccc' }],
            b:[{ i: 'a' }, { i: 'ccc' }],
            c:[{ i: 'a' }, { i: 'ccc' }],
        });
    });

    test('key is nout found: return layouts', () => {
        const newLayout = WidgetLayout.removeWidgetFromLayout(layouts, 'not found');
        expect(newLayout).toEqual(layouts);
    });

    test('no layouts: return empty object', () => {
        const newLayout = WidgetLayout.removeWidgetFromLayout(null, 'anykey');
        expect(newLayout).toEqual({});
    });
});

test('when call addWidgetToLayout(layouts, widgetLayout): add given layout to layout settings', () => {
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

    const newLayouts = WidgetLayout.addWidgetToLayout(layouts, widgetLayout);
    expect(newLayouts).toEqual({
        lg:[{ i: 'aaa' }, { i: 'bb' }, { i: 'c' }, { i: 'n_reg_customer', a:1, b:2 }],
        md:[{ i: 'aaa' }, { i: 'bb' }, { i: 'c' }, { i: 'n_reg_customer', a:1, b:2 }],
        sm:[{ i: 'aaa' }, { i: 'bb' }, { i: 'c' }, { i: 'n_reg_customer', a:1, b:2 }],
        xs:[{ i: 'aaa' }, { i: 'bb' }, { i: 'c' }, { i: 'n_reg_customer', a:1, b:2 }],
        xxs:[{ i: 'aaa' }, { i: 'bb' }, { i: 'c' },{ i: 'n_reg_customer', a:1, b:2 }]
    });
});

describe('getWidgetLayoutSettings()', () => {
    test('don\'t have local settings: store default settings', () => {
        LocalStorageHelper.getWidgetLayout.mockImplementation(() => null);
        LocalStorageHelper.saveWidgetLayout.mockReset();
        WidgetLayout.getWidgetLayoutSettings();
        expect(LocalStorageHelper.saveWidgetLayout).toBeCalledWith(Wglayouts);
    });

    test('don\'t have local settings: return default layout', () => {
        LocalStorageHelper.getWidgetLayout.mockImplementation(() => null);
        const layouts = WidgetLayout.getWidgetLayoutSettings();
        expect(layouts).toEqual(Wglayouts);
    });

    test('return local settings', () => {
        const userSettings = {
            lg: 'some settings',
            md: 's******t*ting'
        }; 
        LocalStorageHelper.getWidgetLayout.mockImplementation(() => userSettings);        

        const layouts = WidgetLayout.getWidgetLayoutSettings();

        expect(layouts).toBe(userSettings);
    });
});