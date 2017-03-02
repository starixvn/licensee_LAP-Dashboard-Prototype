import React from 'react';
import ReactDOM from 'react-dom';
import WidgetLayout from '../Modules/WidgetLayout';
import {WidgetKey, Wglayouts} from '../config';
import renderer from 'react-test-renderer';
import * as ReactGridLayout from 'react-grid-layout';

import DefaultLayout from '../layouts/Default';
import DepositWg from '../components/widgets/normal/deposit';
import OnlineCustomerWg from '../components/widgets/chart/onlinecustomer';
import PendingWg from '../components/widgets/normal/pendingfunds';
import RegisteredCustomerWg from '../components/widgets/normal/registercustomer';
import CustomerBalanceWg from '../components/widgets/normal/customerbalance';
import WithdrawalWg from '../components/widgets/normal/withdrawal';
import LicenseeWinLossWg from '../components/widgets/chart/licenseewl';
import TurnoverWg from '../components/widgets/chart/turnover';

jest.mock('react-dom');
jest.mock('react-grid-layout');
jest.mock('../layouts/Default');
jest.mock('../Modules/WidgetLayout');
jest.mock('../components/widgets/normal/deposit');
jest.mock('../components/widgets/chart/onlinecustomer');
jest.mock('../components/widgets/normal/pendingfunds');
jest.mock('../components/widgets/normal/registercustomer');
jest.mock('../components/widgets/normal/customerbalance');
jest.mock('../components/widgets/normal/withdrawal');
jest.mock('../components/widgets/chart/licenseewl');
jest.mock('../components/widgets/chart/turnover');

const dashboardAppElement = (function injectDashboardAppElementToDocument() {
    let dashboardAppElement = document.createElement('div');
    dashboardAppElement.id = 'dashboad-app';
    document
        .body
        .appendChild(dashboardAppElement);
    return dashboardAppElement;
})();

const DashboardApp = require('../App.jsx').default;

function getMockComponentRender(name) {
    return {
        render: function () {
            return (
                <div {...this.props} name={name}>
                    {this.props.children}
                </div>
            )
        }
    }
}

beforeAll(() => {
    DepositWg.mockImplementation(() => getMockComponentRender('DepositWg'));
    OnlineCustomerWg.mockImplementation(() => getMockComponentRender('OnlineCustomerWg'));
    PendingWg.mockImplementation(() => getMockComponentRender('PendingWg'));
    RegisteredCustomerWg.mockImplementation(() => getMockComponentRender('RegisteredCustomerWg'));
    CustomerBalanceWg.mockImplementation(() => getMockComponentRender('CustomerBalanceWg'));
    WithdrawalWg.mockImplementation(() => getMockComponentRender('WithdrawalWg'));
    LicenseeWinLossWg.mockImplementation(() => getMockComponentRender('LicenseeWinLossWg'));
    TurnoverWg.mockImplementation(() => getMockComponentRender('TurnoverWg'));
    DefaultLayout.mockImplementation(() => getMockComponentRender('DefaultLayout'));
    ReactGridLayout
        .WidthProvider
        .mockImplementation(responsive => {
            expect(responsive).toBe(ReactGridLayout.Responsive);
            return props => (
                <div {...props} name="ResponsiveReactGridLayout">{props.children}</div>
            );
        });
});

test('render DashboardApp to #dashboad-app', () => {
    expect(ReactDOM.render).toBeCalledWith((<DashboardApp/>), dashboardAppElement);
});

describe('render correctly', () => {
    test('with english as default language', () => {
        window.dashboardLangCode = null;

        const component = renderer.create(<DashboardApp/>);
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('with language from global config', () => {
        window.dashboardLangCode = 'ch';

        const component = renderer.create(<DashboardApp/>);
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('with saved widget status data', () => {
        WidgetLayout.getWidgetStatus = jest.fn(() => [
            {
                key: WidgetKey.normalPendingFund,
                enable: true
            }, {
                key: WidgetKey.chartLicenseeWL,
                enable: false
            }
        ]);

        const component = renderer.create(<DashboardApp/>);
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('with saved widget layout data', () => {
        WidgetLayout.getWidgetLayout = jest.fn(() => ({lg: Wglayouts.lg, xs: Wglayouts.xs}));

        const component = renderer.create(<DashboardApp/>);
        expect(component.toJSON()).toMatchSnapshot();
    });
});

test('save layout when layout change', () => {
    const app = new DashboardApp();
    app.onLayoutChange(123, 456);
    expect(WidgetLayout.saveWidgetLayout).toBeCalledWith(456);
});
/*
test('when get defaultWgStatus return _defaultWgStatus', () => {
    const app = new DashboardApp();
    app._defaultWgStatus = 123456;
    expect(app.defaultWgStatus).toBe(123456);
});*/

test('when call cloneLayoutConfig() return new layout config', () => {
    const app = new DashboardApp();
    expect(app.cloneLayoutConfig()).toEqual({
        lg: [...Wglayouts.lg],
        md: [...Wglayouts.md],
        sm: [...Wglayouts.sm],
        xs: [...Wglayouts.xs],
        xxs: [...Wglayouts.xxs]
    });
});

test('when remove widget from layout: remove widget from all breakpoints ', () => {
    const app = new DashboardApp();
    const breakpoints = ['lg', 'md', 'sm', 'xs', 'xxs'];

    app.state = {
        layouts: Wglayouts
    };

    breakpoints.forEach(name => {
        expect(app.state.layouts[name].find(w => w.i === 'c_turnover'))
            .not
            .toBeUndefined();
    });

    const newLayout = app._removeWidgetFromLayout('c_turnover');

    breakpoints.forEach(name => {
        expect(newLayout[name].find(w => w.i === 'c_turnover')).toBeUndefined();
    });
});

test('add widget to layout: find widget then add to all breakpoints ', () => {
    const app = new DashboardApp();
    const dummyLayout = {
        i: 'hello'
    };
    const breakpoints = ['lg', 'md', 'sm', 'xs', 'xxs'];

    app.state = {
        layouts: {
            lg: [dummyLayout],
            md: [dummyLayout],
            sm: [dummyLayout],
            xs: [dummyLayout],
            xxs: [dummyLayout]
        }
    };

    const newLayout = app._addWidgetToLayout('c_turnover');

    breakpoints.forEach(name => {
        expect(newLayout[name][0]).toBe(dummyLayout);
        expect(newLayout[name][1].i).toBe('c_turnover');
    });
});

describe('when call renderWgItem(key)', () => {
    const app = new DashboardApp();
    app.state = {
        selectedFilter: 'fake filter',
        refresh: 'fake refresh',
        langCode: 'fake code'
    };
    [
        'c_turnover',
        'c_licWL',
        'n_deposit',
        'c_online_customer',
        'n_pending_funds',
        'n_reg_customer',
        'n_customer_balance',
        'n_withdrawal'
    ].forEach(key => {
        test(`return a correct element that match key: ${key}`, () => {
            const widget = renderer.create(
                <div>{app.renderWgItem(key)}</div>
            );
            expect(widget.toJSON()).toMatchSnapshot();
        });
    });
});

describe('when get isTouchScreen', () => {
    const app = new DashboardApp();
    const _window = global.window;

    afterEach(() => {
        global.window = _window;
    });

    test('if window has ontouchstart: return true', () => {
        global.window.ontouchstart = null;
        global.navigator.maxTouchPoints = 0;

        expect(app.isTouchScreen).toBeTruthy();
    });

    test('if navigator has maxTouchPoints: return true', () => {
        delete global.window;
        global.window = {};
        global.navigator.maxTouchPoints = 1;
        expect(app.isTouchScreen).toBeTruthy();
    });
});