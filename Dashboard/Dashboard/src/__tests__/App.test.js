import React from 'react';
import ReactDOM from 'react-dom';
import LocalStorageHelper from '../Modules/LocalStorageHelper';
import WidgetLayout from '../Modules/WidgetLayout';
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
const fakeWidgetLayout = Wglayouts;
const fakeWidgetStatus = [
    {key: 'c_turnover', enable: true},
    {key: 'c_licWL',enable: true},
    {key: 'n_reg_customer',enable: true},
    {key: 'c_online_customer',enable: true},
    {key: 'n_customer_balance',enable: true},
    {key: 'n_pending_funds',enable: true},
    {key: 'n_deposit',enable: true},
    {key: 'n_withdrawal',enable: true}
];

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

beforeEach(() => {
    window.widgetPermission = [
        'c_turnover',
        'c_licWL',
        'n_deposit',
        'c_online_customer',
        'n_pending_funds',
        'n_reg_customer',
        'n_customer_balance',
        'n_withdrawal'
    ];
    LocalStorageHelper.mockReset();
    LocalStorageHelper.getWidgetStatus.mockImplementation(() => fakeWidgetStatus);
    LocalStorageHelper.getWidgetLayout.mockImplementation(() => fakeWidgetLayout);
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
        LocalStorageHelper.getWidgetLayout = jest.fn(() => fakeWidgetLayout);
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
            xs: Wglayouts.xs,
            md:[],
            sm:[],
            xxs:[]
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
        LocalStorageHelper.saveWidgetStatus.mockReset();
        LocalStorageHelper.getWidgetStatus.mockReset();

        LocalStorageHelper.getWidgetStatus
            .mockImplementationOnce(() => null)
            .mockImplementationOnce(() => fakeWidgetStatus);
        window.widgetPermission = [
            'c_turnover',
            'c_licWL',
            'n_deposit'
        ];
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

    test('clear layout setting if new version', () => {
        const app = new DashboardApp();
        expect(LocalStorageHelper.clearLayoutSettingIfNewVersion).toBeCalled();
    });
});

describe('when call renderWgItem(key)', () => {    
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
            const app = new DashboardApp();
            app.state = {
                selectedFilter: 'fake filter',
                refresh: 'fake refresh',
                langCode: 'fake code'
            };
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
    const _window = global.window;

    afterEach(() => {
        global.window = _window;
    });

    test('if window has ontouchstart: return true', () => {
        const app = new DashboardApp();
        global.window.ontouchstart = null;
        global.navigator.maxTouchPoints = 0;

        expect(app.isTouchScreen).toBeTruthy();
    });

    test('if navigator has maxTouchPoints: return true', () => {
        const app = new DashboardApp();
        delete global.window;
        global.window = {};
        global.navigator.maxTouchPoints = 1;
        expect(app.isTouchScreen).toBeTruthy();
    });
});

describe('onChildChanged(newState)', () => {
    const newState = {
        filter: 'fake new filter',
        items: []
    };

    const oldState = {
        refresh: 123456
    };

    test('if action is apply: update state', () => {
        const app = new DashboardApp();
        app.setState = jest.fn();
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
        const app = new DashboardApp();
        app.setState = jest.fn();
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
        const _addWidgetToLayout = WidgetLayout.addWidgetToLayout;
        WidgetLayout.addWidgetToLayout = jest.fn(
            (layouts, key) => key === 'n_reg_customer' ? 'add' : '');
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
        WidgetLayout.addWidgetToLayout = _addWidgetToLayout;
    });

    test('remove widget', () => {
        const app = new DashboardApp();
        app.setState = jest.fn();
        app.setState.mockReset();
        newState.items.push({key: 'n_reg_customer', enable: false});
        app.state = {
            wgStatus: [{key: 'n_reg_customer', enable: true}]
        };
        const _removeWidgetFromLayout = WidgetLayout.removeWidgetFromLayout;
        WidgetLayout.removeWidgetFromLayout = jest.fn(
            (layouts, key) => key === 'n_reg_customer' ? 'remove' : '');
        newState.action = 'other actions';
        app.onChildChanged(newState);

        expect(app.setState).toBeCalledWith({
            wgStatus: [{key: 'n_reg_customer', enable: false}],
            layouts: 'remove'
        });
        expect(LocalStorageHelper.saveWidgetStatus).toBeCalledWith([
            {key: 'n_reg_customer',enable: false}
        ])
        expect(LocalStorageHelper.saveWidgetLayout).toBeCalledWith('remove');
        WidgetLayout.removeWidgetFromLayout = _removeWidgetFromLayout;
    });
});

test('save layout when layout change', () => {
    const app = new DashboardApp();
    app.onLayoutChange(123, 456);
    expect(LocalStorageHelper.saveWidgetLayout).toBeCalledWith(456);
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