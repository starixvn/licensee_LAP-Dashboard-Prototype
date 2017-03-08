import WidgetLayout from '../WidgetLayout';
import LocalStorageHelper from '../LocalStorageHelper';
import {Wglayouts} from '../../config';

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

describe('addWidgetToLayout(layouts, key)', () => {
    const layouts = {
        lg:[{ i: 'aaa' }, { i: 'bb' }, { i: 'c' }],
        md:[{ i: 'aaa' }, { i: 'bb' }, { i: 'c' }],
        sm:[{ i: 'aaa' }, { i: 'bb' }, { i: 'c' }],
        xs:[{ i: 'aaa' }, { i: 'bb' }, { i: 'c' }],
        xxs:[{ i: 'aaa' }, { i: 'bb' }, { i: 'c' }]
    };
    const userSettings = {
        lg:[{ i: 'n_reg_customer', a:1, b:2 }],
        md:[{ i: 'n_reg_customer', a:1, b:2 }],
        sm:[{ i: 'n_reg_customer', a:1, b:2 }],
        xs:[{ i: 'n_reg_customer', a:1, b:2 }],
        xxs:[{ i: 'n_reg_customer', a:1, b:2 }]
    };

    function lastItemOf(array){
        return array[array.length - 1];
    }

    test('key not found in default layout: return current layouts', () => {
        const newLayouts = WidgetLayout.addWidgetToLayout(layouts, 'key not found');
        expect(newLayouts).toEqual(layouts);
    });

     test('don\'t have local user settings, get setting from default layout', () => {
        LocalStorageHelper.getWidgetLayout.mockImplementation(() => null);
        const newLayouts = WidgetLayout.addWidgetToLayout(layouts, 'c_turnover');
        
        Object.keys(layouts).forEach(breakpoint => {
            const layout = newLayouts[breakpoint];
            expect(layout.map(x => x.i)).toEqual(['aaa', 'bb', 'c', 'c_turnover']);

            const defaultLayout = Wglayouts[breakpoint].find(w => w.i === 'c_turnover');
            expect(defaultLayout).toEqual(lastItemOf(layout));
        });
    });

    test('have local user settings but key not found, get setting from default layout', () => {
        LocalStorageHelper.getWidgetLayout.mockImplementation(() => userSettings);
        const newLayouts = WidgetLayout.addWidgetToLayout(layouts, 'c_turnover');
        
        Object.keys(layouts).forEach(breakpoint => {
            const layout = newLayouts[breakpoint];
            expect(layout.map(x => x.i)).toEqual(['aaa', 'bb', 'c', 'c_turnover']);

            const defaultLayout = Wglayouts[breakpoint].find(w => w.i === 'c_turnover');
            expect(defaultLayout).toEqual(lastItemOf(layout));
        });
    });

    test('have local user settings, merge setting to default layout', () => {
        LocalStorageHelper.getWidgetLayout.mockImplementation(() => userSettings);
        const newLayouts = WidgetLayout.addWidgetToLayout(layouts, 'n_reg_customer');
        
        Object.keys(layouts).forEach(breakpoint => {
            const layout = newLayouts[breakpoint];
            expect(layout.map(x => x.i)).toEqual(['aaa', 'bb', 'c', 'n_reg_customer']);
            
            const lastItem = lastItemOf(layout);
            const defaultLayout = Wglayouts[breakpoint].find(w => w.i === 'n_reg_customer');
            const userLayout = userSettings[breakpoint][0];

            expect(lastItem).toEqual(expect.objectContaining(defaultLayout));
            expect(lastItem).toEqual(expect.objectContaining(userLayout));
        });
    });

    test('no layouts: return empty object', () => {
        const newLayout = WidgetLayout.addWidgetToLayout(null, 'anykey');
        expect(newLayout).toEqual({});
    });
});

describe('getUserWidgetLayoutSettingsForDisplay()', () => {
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

    test('don\'t have local settings: store default settings', () => {
        LocalStorageHelper.getWidgetLayout.mockImplementation(() => null);
        LocalStorageHelper.saveWidgetLayout.mockReset();
        WidgetLayout.getUserWidgetLayoutSettingsForDisplay();
        expect(LocalStorageHelper.saveWidgetLayout).toBeCalledWith(Wglayouts);
    });

    test('don\'t have local settings: get enabled widgets from default layout', () => {
        LocalStorageHelper.getWidgetLayout.mockImplementation(() => null);        

        const layouts = WidgetLayout.getUserWidgetLayoutSettingsForDisplay();
        const enabled = ['c_turnover', 'c_online_customer', 'n_deposit', 'n_withdrawal'];
        const filter = w => enabled.indexOf(w.i) >= 0;

        expect(layouts).toEqual({
            lg: Wglayouts.lg.filter(filter),
            md: Wglayouts.md.filter(filter),
            sm: Wglayouts.sm.filter(filter),
            xs: Wglayouts.xs.filter(filter),
            xxs:Wglayouts.xxs.filter(filter),
        });
    });

    test('has local settings: get enabled widgets from local settings', () => {
        const userSettings = {
            lg: [Wglayouts.lg[0], Wglayouts.lg[1]],
            md: [Wglayouts.md[0], Wglayouts.md[1]],
            sm: [Wglayouts.sm[0], Wglayouts.sm[1]],
            xs: [Wglayouts.xs[0], Wglayouts.xs[1]],
            xxs:[Wglayouts.xxs[0], Wglayouts.xxs[1]]
        }; 
        LocalStorageHelper.getWidgetLayout.mockImplementation(() => userSettings);        

        const layouts = WidgetLayout.getUserWidgetLayoutSettingsForDisplay();

        expect(layouts).toEqual({
            lg: [Wglayouts.lg[0]],
            md: [Wglayouts.md[0]],
            sm: [Wglayouts.sm[0]],
            xs: [Wglayouts.xs[0]],
            xxs:[Wglayouts.xxs[0]]
        });
    });
});