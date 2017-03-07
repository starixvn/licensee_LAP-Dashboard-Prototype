import React from 'react';
import ReactDOM from 'react-dom';
import LocalStorageHelper from '../Modules/LocalStorageHelper';
import { WidgetKey, Wglayouts } from '../config';
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
jest.mock('../Modules/LocalStorageHelper');
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
        render: function() {
            return (
                <div {...this.props} name={ name }>
                  { this.props.children }
                </div>
            )
        }
    }
}

function findElementByName(component, name) {
    if (component._component) {
        return findElementByName(component._component, name);
    }

    if (component._currentElement && component._currentElement.props && component._currentElement.props.name === name) {
        return component._currentElement;
    }

    if (component._renderedComponent) {
        return findElementByName(component._renderedComponent, name);
    }

    if (component._renderedChildren) {
        for (let key in component._renderedChildren) {
            let found = findElementByName(component._renderedChildren[key], name);
            if (found) {
                return found;
            }
        }
    }

    return null;
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
                <div {...props} name="ResponsiveReactGridLayout">
                  { props.children }
                </div>
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
        LocalStorageHelper.getWidgetStatus = jest.fn(() => [
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
        LocalStorageHelper.getWidgetLayout = jest.fn(() => ({
            lg: Wglayouts.lg,
            xs: Wglayouts.xs
        }));

        const component = renderer.create(<DashboardApp/>);
        expect(component.toJSON()).toMatchSnapshot();
    });
});

describe('constructor()', () => {
    test('merge widget permission to local then save', () => {
        const userSettings = [
            { key:'c_turnover', enable: true },
            { key:'n_deposit', enable: false },
            { key:'dont have permission anymore, should be removed', enable: false },
        ];
        LocalStorageHelper.getWidgetStatus.mockImplementation(() => userSettings);
        window.widgetPermission = [
            'c_turnover',
            'c_licWL',
            'n_deposit'
        ];
        LocalStorageHelper.saveWidgetStatus.mockReset();
        const app = new DashboardApp();
        expect(LocalStorageHelper.saveWidgetStatus).toBeCalledWith([
            { key:'c_turnover', enable: true },
            { key:'c_licWL', enable: true },
            { key:'n_deposit', enable: false },
        ]);
    });

    test('don\'t merge widget permission if no user settings', () => {
        LocalStorageHelper.getWidgetStatus.mockImplementation(() => null);
        window.widgetPermission = [
            'c_turnover',
            'c_licWL',
            'n_deposit'
        ];
        LocalStorageHelper.saveWidgetStatus.mockReset();
        const app = new DashboardApp();
        expect(LocalStorageHelper.saveWidgetStatus).toBeCalledWith([
            { key:'c_turnover', enable: true },
            { key:'c_licWL', enable: true },
            { key:'n_deposit', enable: true },
        ]);
    });

     test('remove widget if not support', () => {
        window.widgetPermission = [
            WidgetKey.chartTurnover,
            WidgetKey.chartLicenseeWL,
            'not support',
            'should be removed'
        ];
        LocalStorageHelper.saveWidgetStatus.mockReset();
        const app = new DashboardApp();
        expect(LocalStorageHelper.saveWidgetStatus).toBeCalledWith([
            { key:'c_turnover', enable: true },
            { key:'c_licWL', enable: true }
        ]);
    });

    test('save widget layout if it isn\'t saved', () => {
        const app = new DashboardApp();
        expect(LocalStorageHelper.saveWidgetLayout).toBeCalledWith(app.cloneLayoutConfig());
    });

    test('clear layout setting if new version', () => {
        const app = new DashboardApp();
        expect(LocalStorageHelper.clearLayoutSettingIfNewVersion).toBeCalled();
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
                <div>
                  { app.renderWgItem(key) }
                </div>
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

describe('onChildChanged(newState)', () => {
    const app = new DashboardApp();
    app.setState = jest.fn();
    app._removeWidgetFromLayout = jest.fn();
    app._addWidgetToLayout = jest.fn();

    const newState = {
        filter: 'fake new filter',
        items: []
    };

    const oldState = {
        refresh: 123456
    };

    test('if action is apply: update state', () => {
        app
            .setState
            .mockReset();
        newState.action = 'apply';
        app.onChildChanged(newState);

        const asyncSetState = app.setState.mock.calls[0][0];
        expect(asyncSetState(oldState)).toEqual({
            refresh: oldState.refresh + 1,
            selectedFilter: newState.filter
        });
    });

    test('add widget', () => {
        app
            .setState
            .mockReset();
        newState
            .items
            .push({
                key: 'n_reg_customer',
                enable: true
            });
        app.state = {
            wgStatus: [
                {
                    key: 'n_reg_customer',
                    enable: false
                }
            ]
        };
        app._addWidgetToLayout = jest.fn(key => key === 'n_reg_customer'
            ? 'add'
            : '');
        newState.action = 'other actions';
        app.onChildChanged(newState);

        expect(app.setState).toBeCalledWith({
            wgStatus: [
                {
                    key: 'n_reg_customer',
                    enable: true
                }
            ],
            layouts: 'add'
        });
        expect(LocalStorageHelper.saveWidgetStatus).toBeCalledWith([
            {
                key: 'n_reg_customer',
                enable: true
            }
        ])
        expect(LocalStorageHelper.saveWidgetLayout).toBeCalledWith('add');
    });

    test('remove widget', () => {
        app
            .setState
            .mockReset();
        newState
            .items
            .push({
                key: 'n_reg_customer',
                enable: false
            });
        app.state = {
            wgStatus: [
                {
                    key: 'n_reg_customer',
                    enable: true
                }
            ]
        };
        app._removeWidgetFromLayout = jest.fn(key => key === 'n_reg_customer'
            ? 'remove'
            : '');
        newState.action = 'other actions';
        app.onChildChanged(newState);

        expect(app.setState).toBeCalledWith({
            wgStatus: [
                {
                    key: 'n_reg_customer',
                    enable: false
                }
            ],
            layouts: 'remove'
        });
        expect(LocalStorageHelper.saveWidgetStatus).toBeCalledWith([
            {
                key: 'n_reg_customer',
                enable: false
            }
        ])
        expect(LocalStorageHelper.saveWidgetLayout).toBeCalledWith('remove');
    });
});

test('save layout when layout change', () => {
    const app = new DashboardApp();
    app.onLayoutChange(123, 456);
    expect(LocalStorageHelper.saveWidgetLayout).toBeCalledWith(456);
});

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

test('DefaultLayout.callbackParent() is bound to onChildChanged()', () => {
    const component = renderer.create(<DashboardApp/>);
    const instance = component.getInstance();
    const element = findElementByName(component, 'DefaultLayout');

    instance.onChildChanged = jest.fn();
    element
        .props
        .callbackParent('new state');
    expect(instance.onChildChanged).toBeCalledWith('new state');
});

test('ResponsiveReactGridLayout.onLayoutChange() is bound to onLayoutChange()', () => {
    const component = renderer.create(<DashboardApp/>);
    const instance = component.getInstance();
    const element = findElementByName(component, 'ResponsiveReactGridLayout');

    instance.onLayoutChange = jest.fn();
    element
        .props
        .onLayoutChange('layout', 'layouts');
    expect(instance.onLayoutChange).toBeCalledWith('layout', 'layouts');
});