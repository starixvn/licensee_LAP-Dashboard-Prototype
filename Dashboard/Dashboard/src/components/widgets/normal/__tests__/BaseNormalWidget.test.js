import React from 'react';
import renderer from 'react-test-renderer';
import BaseNormalWidget from '../BaseNormalWidget.jsx';
import WidgetApi from '../../../../Modules/WidgetApi';
import WidgetBox from '../../widgetbox.jsx';

jest.mock('../../../../Modules/WidgetApi');
jest.mock('../../widgetbox');

const fakeProps = {
    filter: {
        baseCurrency: "EUR",
        currency: 1111
    },
    refresh: 1000,
    langCode: "en",
    callbackParent: 'fake callbackParent',
    wgItemFromParent: 'f**k wgItemFromParent'
};
const fakeConfigs = {
    WidgetKey: 'this is a f**k key',
    Url: 'this is a f**k url',
    WidgetName: 'this is a f**k name',
    TitleKey: 'licensee_winloss_month_todate',
    defaultCountdown: 123,
    countdownValues: [1, 2, 3]
};
class FakeConfiguredBaseNormalWidget extends BaseNormalWidget {
    constructor(props) {
        super(props, fakeConfigs);
    }
}

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
        .mockImplementation(() => Promise.resolve({ data: 999.888 }))
    const component = renderer.create(<FakeConfiguredBaseNormalWidget {...fakeProps} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('data was rendered correctly from API', () => {
    const promise = Promise.resolve({ data: 888.777 });
    WidgetApi
        .fetchData
        .mockImplementation(() => promise);
    const component = renderer.create(<FakeConfiguredBaseNormalWidget {...fakeProps} />);

    promise.then(() => expect(component.toJSON()).toMatchSnapshot());
});

test('componentWillReceiveProps: next.refresh > old.refresh, fetch new data', () => {
    // assign
    const component = new FakeConfiguredBaseNormalWidget(fakeProps);

    component.fetchData = jest.fn();
    component.setState = jest.fn();
    component.state.isMounted = true;
    const nextProps = Object.assign({}, fakeProps);
    nextProps.refresh += 1000;
    nextProps.langCode = 'zhcn';

    // action
    component.componentWillReceiveProps(nextProps);

    // assert
    expect(component.setState).toBeCalledWith({ isLoading: true });
    expect(component.fetchData).toBeCalledWith(nextProps);
});

test('componentWillReceiveProps: next.refresh <= old.refresh, do nothing', () => {
    // assign
    const component = new FakeConfiguredBaseNormalWidget(fakeProps);
    component.fetchData = jest.fn();
    component.state.isMounted = true;
    const nextProps = Object.assign({}, fakeProps);
    nextProps.refresh -= 1000;
    const propsNotChanged = fakeProps;

    // action
    component.componentWillReceiveProps(propsNotChanged);
    component.componentWillReceiveProps(nextProps);

    // assert
    expect(component.fetchData).not.toBeCalled();
});

test('componentWillReceiveProps: not mounted: do nothing', () => {
    // assign
    const component = new FakeConfiguredBaseNormalWidget(fakeProps);
    component.fetchData = jest.fn();
    component.setState = jest.fn();
    component.state.isMounted = false;
    const nextProps = Object.assign({ refresh: 5000 }, fakeProps);

    // action
    component.componentWillReceiveProps(nextProps);

    // assert
    expect(component.fetchData).not.toBeCalled();
    expect(component.setState).not.toBeCalled();
});

test('componentDidMount: set mount state true', () => {
    // assign
    const component = new FakeConfiguredBaseNormalWidget(fakeProps);
    component.setState = jest.fn();

    // action
    component.componentDidMount();

    // assert
    expect(component.setState.mock.calls[0][0].isMounted).toBeTruthy();
});

test('componentWillUnmount: set mount state false', () => {
    // assign
    const component = new FakeConfiguredBaseNormalWidget(fakeProps);
    component.setState = jest.fn();

    // action
    component.componentWillUnmount();

    // assert
    expect(component.setState).toBeCalledWith({ isMounted: false });
});

test('fetch data by criteria', () => {
    // assign
    const component = new FakeConfiguredBaseNormalWidget(fakeProps);
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
        Url: fakeConfigs.Url,
        IsCrossSite: true
    })
});

test('write log when fetch data fail', () => {
    // assign
    const component = new FakeConfiguredBaseNormalWidget(fakeProps);
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

test('reloadCallback and component is mounted: fetch data', () => {
    // assign
    const component = new FakeConfiguredBaseNormalWidget(fakeProps);
    component.setState = jest.fn();
    component.fetchData = jest.fn();
    component.state.isMounted = true;

    //  action
    const rendered = component.render();
    rendered.props.reloadCallback();

    // assert
    expect(component.setState).toBeCalledWith({ isLoading: true })
    expect(component.fetchData).toBeCalledWith(fakeProps);
});

test('reloadCallback and component is un-mounted: do nothing', () => {
    // assign
    const component = new FakeConfiguredBaseNormalWidget(fakeProps);
    component.setState = jest.fn();
    component.fetchData = jest.fn();
    component.state.isMounted = false

    //  action
    const rendered = component.render();
    rendered.props.reloadCallback();

    // assert
    expect(component.setState).not.toBeCalled();
    expect(component.fetchData).not.toBeCalled();
});