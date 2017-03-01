import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import RightPanel from '../RightPanel.jsx';
import WidgetLayout from '../../Modules/WidgetLayout';
import WidgetApi from '../../Modules/WidgetApi';

jest.mock('../../Modules/WidgetLayout');
jest.mock('../../Modules/WidgetApi');

const fakeProps = {
    wgs: [
        {
            key: "abc",
            enable: true
        }, {
            key: "def",
            enable: true
        }
    ],
    langCode: 'en',
    callbackParent: jest.fn()
};
const fakeResponse = {
    data: {
        CurrencyList: [
            {
                Key: 1,
                Value: "1"
            }
        ],
        BaseCurrencyList: ["A", "B"]
    }
};

function findElement(component, selector) {
    if (component._component) {
        return findElement(component._component, selector);
    }

    if (component._currentElement) {
        const element = component._currentElement;

        if (element.ref === selector) {
            return element;
        }

        if (selector[0] === '.' && element.props && element.props.className) {
            const reg = new RegExp(selector.substring(1));
            if (component._currentElement.props.className.match(reg)) {
                return element;
            }
        }
    }

    if (component._renderedComponent) {
        return findElement(component._renderedComponent, selector);
    }

    if (component._renderedChildren) {
        for (let key in component._renderedChildren) {
            let found = findElement(component._renderedChildren[key], selector);
            if (found) {
                return found;
            }
        }
    }

    return null;
}

beforeAll(() => {
    WidgetLayout
        .getWidgetStatus
        .mockImplementation(() => {
            return [
                {
                    key: "abc",
                    enable: true
                }, {
                    key: "abc",
                    enable: false
                }
            ];
        });
});

test('renders correctly', () => {
    WidgetApi
        .fetchData
        .mockImplementation(() => Promise.resolve(fakeResponse));
    const component = renderer.create(<RightPanel {...fakeProps}/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('hidden state change: re-render', () => {
    WidgetApi
        .fetchData
        .mockImplementation(() => Promise.resolve(fakeResponse));
    const component = renderer.create(<RightPanel {...fakeProps}/>);

    component
        .getInstance()
        .setState({isHidden: false});

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('componentDidMount: fetch data with given props', () => {
    const promise = Promise.resolve(fakeResponse);
    WidgetApi
        .fetchData
        .mockImplementation(() => promise);
    const component = renderer.create(<RightPanel {...fakeProps}/>);

    promise.then(() => expect(component.toJSON()).toMatchSnapshot());
});

test('componentWillUnmount: set mount status false', () => {
    const component = new RightPanel(fakeProps);
    component.setState = jest.fn();

    component.componentWillUnmount();

    expect(component.setState).toBeCalledWith({isMounted: false});
});

test('bindWgCheckBox(wgs): return mapped items from given parameter', () => {
    const component = new RightPanel(fakeProps);

    const result = component.bindWgCheckBox([
        {
            key: 'a',
            enable: true
        }, {
            key: 'b',
            enable: false
        }
    ]);

    expect(result).toEqual({a: true, b: false});
});

describe('_fetchData()', () => {
    test('fetch data by criteria', () => {
        const promise = Promise.resolve();
        promise.then = () => promise;
        WidgetApi
            .fetchData
            .mockImplementation(() => promise);

        const component = new RightPanel(fakeProps);

        component._fetchData();

        expect(WidgetApi.fetchData).toBeCalledWith({Url: '/api/Dashboard/GetCurrencyList', IsCrossSite: true});
    });

    test('write log when fetch data fail', () => {
        // assign
        const component = new RightPanel(fakeProps);
        const promise = Promise.resolve();
        promise.then = () => promise;
        promise.catch = c => {
            c('should write log when fail');
            return promise;
        };

        WidgetApi
            .fetchData
            .mockImplementation(() => promise);

        const _log = console.log;
        console.log = jest.fn();

        //  action
        component._fetchData(fakeProps);

        // assert
        expect(console.log).toBeCalledWith('error:', 'should write log when fail');
        console.log = _log;
    });
});

describe('togglePanel()', () => {
    [true, false].forEach(isHidden => {
        test('toggle hidden status', () => {
            const component = new RightPanel({wgs: []});
            component.setState = jest.fn();
            component.state = {
                isHidden: isHidden
            };

            component.togglePanel();
            const asyncUpdateState = component.setState.mock.calls[0][0];
            const result = asyncUpdateState(component.state);
            expect(result).toEqual({
                isHidden: !isHidden
            });
        });
    });

    test('widget status different with saved data:call parent callback', () => {
        const component = new RightPanel(fakeProps);
        component.setState = jest.fn();
        component.state = {
            isHidden: true
        };

        component.togglePanel();

        expect(component.props.callbackParent).toBeCalledWith({
            action: 'wgSyncStatus',
            items: [
                {
                    key: "abc",
                    enable: false
                }
            ]
        });
    });
    test('widget status different with saved data: update state', () => {
        const component = new RightPanel(fakeProps);
        component.setState = jest.fn();
        component.bindWgCheckBox = () => 123.456;
        component.state = {
            isHidden: true
        };

        component.togglePanel();

        expect(component.setState).toBeCalledWith({wgs: 123.456});
    });
});

describe('event listeners', () => {
    beforeEach(() => {
        WidgetApi
            .fetchData
            .mockReset();
        fakeProps
            .callbackParent
            .mockReset();
        WidgetApi
            .fetchData
            .mockImplementation(() => Promise.resolve(fakeResponse));
    });

    test('on currency list change: update state', () => {
        const component = renderer.create(<RightPanel {...fakeProps}/>);
        const componentInstance = component.getInstance();
        const element = findElement(component, 'currencyDropdownList');

        componentInstance.setState = jest.fn();

        element
            .props
            .onChange({
                target: {
                    value: 'fake currency value'
                }
            });

        expect(componentInstance.setState).toBeCalledWith({SelectedCurrency: 'fake currency value'});
    });

    test('on base currency list change: update state', () => {
        const component = renderer.create(<RightPanel {...fakeProps}/>);
        const componentInstance = component.getInstance();
        const element = findElement(component, 'baseCurrencyDropdownList');

        componentInstance.setState = jest.fn();
        element
            .props
            .onChange({
                target: {
                    value: 'fake currency value'
                }
            });

        expect(componentInstance.setState).toBeCalledWith({SelectedBaseCurrency: 'fake currency value'});
    });

    describe('on submit button click', () => {
        test('component is unmounted then do nothing', () => {
            const component = renderer.create(<RightPanel {...fakeProps}/>);
            const componentInstance = component.getInstance();
            const element = findElement(component, '.btn-submit');

            componentInstance.setState({isMounted: false});
            fakeProps
                .callbackParent
                .mockReset();
            element
                .props
                .onClick();

            expect(fakeProps.callbackParent)
                .not
                .toBeCalled();
        });

        test('component is mounted then call callbackParent()', () => {
            const component = renderer.create(<RightPanel {...fakeProps}/>);
            const componentInstance = component.getInstance();
            const element = findElement(component, '.btn-submit');

            componentInstance.setState({isMounted: true, SelectedCurrency: 'selected currency', SelectedBaseCurrency: 'selected base currency'});
            element
                .props
                .onClick();

            expect(fakeProps.callbackParent).toBeCalledWith({
                action: 'apply',
                filter: {
                    currency: 'selected currency',
                    baseCurrency: 'selected base currency'
                }
            });
        });
    });

    test('on quickaccess click: toggle panel', () => {
        const component = renderer.create(<RightPanel {...fakeProps}/>);
        const componentInstance = component.getInstance();
        const element = findElement(component, '.icon-quickaccess');

        componentInstance.togglePanel = jest.fn();
        element
            .props
            .onClick('fake event');

        expect(componentInstance.togglePanel).toBeCalledWith('fake event');
    });

    test('right panel overlay click: toggle panel', () => {
        const component = renderer.create(<RightPanel {...fakeProps}/>);
        const componentInstance = component.getInstance();
        const element = findElement(component, '.right-panel-overlay');

        componentInstance.togglePanel = jest.fn();
        element
            .props
            .onClick('fake event');

        expect(componentInstance.togglePanel).toBeCalledWith('fake event');
    });

    describe('on widget item check status change', () => {
        test('state is unmounted: do nothing', () => {
            const component = renderer.create(<RightPanel {...fakeProps}/>);
            const componentInstance = component.getInstance();
            const element = findElement(component, '.filled-in');

            componentInstance.setState({isMounted: false});
            element
                .props
                .onChange();

            expect(componentInstance.props.callbackParent)
                .not
                .toBeCalled();
        });
        test('state is mounted: call parent callback and update state', () => {
            const component = renderer.create(<RightPanel {...fakeProps}/>);
            const componentInstance = component.getInstance();
            const element = findElement(component, '.filled-in');

            componentInstance.setState({isMounted: true});
            element
                .props
                .onChange();

            expect(componentInstance.props.callbackParent).toBeCalledWith({
                action: 'wgSyncStatus',
                items: [
                    {
                        key: 'abc',
                        enable: false
                    }
                ]
            });
        });
    });
});
