import React from 'react';
import renderer from 'react-test-renderer';
import RegisteredCustomer from '../registercustomer';
import WidgetApi from '../../../../Modules/WidgetApi';
import ReactTestUtils from 'react-addons-test-utils';
import WidgetBox from '../../widgetbox.jsx';

jest.mock('../../../../Modules/WidgetApi');
jest.mock('../../widgetbox');

const fakeProps = {
    filter: {
        baseCurrency: "EUR",
        currency: 111
    },
    refresh: 100,
    langCode: "zhcn"
};

beforeAll(() => {
    WidgetBox.mockImplementation(() => ({
        render: function () {
            return (
                <div {...this.props}>
                    {this.props.children}
                </div>
            )
        }
    }));
});
afterEach(() => {
    WidgetApi.mockReset();
});

test('renders correctly', () => {
    WidgetApi
        .fetchData
        .mockImplementationOnce(() => Promise.resolve({
            data: {
                Deposit: 12345.6789,
                NoneDeposit: 98765.4321
            }
        }));
    const component = renderer.create(<RegisteredCustomer {...fakeProps}/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('componentDidMount: fetch data with given props', () => {
    // assert
    const promise = Promise.resolve({
        data: {
            Deposit: 12345.6789,
            NoneDeposit: 98765.4321
        }
    });
    WidgetApi
        .fetchData
        .mockImplementationOnce(() => promise);

    // action
    const component = renderer.create(<RegisteredCustomer { ...fakeProps }/>);

    // assert
    promise.then(() => expect(component.toJSON()).toMatchSnapshot());
});

test('componentWillReceiveProps: next.refresh > old.refresh, fetch new data', () => {
    // assign
    const component = new RegisteredCustomer(fakeProps);

    component.fetchData = jest.fn();
    component.setState = jest.fn();

    const nextProps = Object.assign({}, fakeProps);
    nextProps.refresh += 1000;
    nextProps.langCode = 'zhcn';

    // action
    component.componentWillReceiveProps(nextProps);

    // assert
    expect(component.setState).toBeCalledWith({isLoading: true});
    expect(component.fetchData).toBeCalledWith(nextProps);
});

test('componentWillReceiveProps: next.refresh <= old.refresh, do nothing', () => {
    // assign
    const component = new RegisteredCustomer(fakeProps);
    component.fetchData = jest.fn();

    const nextProps = Object.assign({}, fakeProps);
    nextProps.refresh -= 1000;
    const propsNotChanged = fakeProps;

    // action
    component.componentWillReceiveProps(propsNotChanged);
    component.componentWillReceiveProps(nextProps);

    // assert
    expect(component.fetchData)
        .not
        .toBeCalled();
});

test('fetch data by criteria', () => {
    // assign
    const component = new RegisteredCustomer(fakeProps);
    const promise = Promise.resolve();

    promise.then = () => promise;
    WidgetApi
        .fetchData
        .mockImplementationOnce(() => promise);

    // action
    component.fetchData(fakeProps);

    // assert
    expect(WidgetApi.fetchData).toBeCalledWith({
        Data: {
            CurrencyId: fakeProps.filter.currency,
            BaseCurrency: fakeProps.filter.baseCurrency
        },
        Url: 'GetRegisteredUserOnline',
        IsCrossSite: false
    })
});

test('write log when fetch data fail', () => {
    // assign
    const component = new RegisteredCustomer(fakeProps);
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
    component.fetchData(fakeProps);

    // assert
    expect(console.log).toBeCalledWith('error:', 'should write log when fail');
    console.log = _log;
});