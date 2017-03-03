import React from 'react';
import renderer from 'react-test-renderer';
import WidgetApi from '../../../../Modules/WidgetApi';
import OnlineCustomer from '../onlinecustomer';
import WidgetBox from '../../widgetbox';
import * as ChartJs from 'react-chartjs-2'

jest.mock('../../../../Modules/WidgetApi');
jest.mock('../../widgetbox');
jest.mock('react-chartjs-2');

const HorizontalBar = ChartJs.HorizontalBar;

const fakeProps = {
    langCode: 'ch',
    refresh: 12345
};

const fakeResponse = {
    data: {
        Web: 'webwwebwebweb',
        Wap: 'wapwapwap',
        SmartSite: 'smsmsmsm'
    }
};

function fakeHorizontalBarInstance() {
    return {
        chart: {
            ctx: {
                fillText: jest.fn()
            },
            width: 123456789
        },
        data: {
            datasets: [
                {
                    data: [1.2, 2.3]
                }, {
                    data: [3.4, 4.5]
                }
            ]
        },
        getDatasetMeta: jest.fn(index => index === 0
            ? {
                data: [
                    {
                        _model: {
                            y: 999
                        }
                    }, {
                        _model: {
                            y: 9999
                        }
                    }
                ]
            }
            : (index === 1
                ? {
                    data: [
                        {
                            _model: {
                                y: 888
                            }
                        }, {
                            _model: {
                                y: 8888
                            }
                        }
                    ]
                }
                : null))
    }
}

beforeAll(() => {
    WidgetBox.mockImplementation(() => ({
        render: function () {
            return (
                <div {...this.props} name="WidgetBox">
                    {this.props.children}
                </div>
            )
        }
    }));
    HorizontalBar.mockImplementation(() => ({
        render: function () {
            return (
                <div {...this.props} name="HorizontalBar">
                    hello bar
                </div>
            )
        }
    }));
});

test('render correctly', () => {
    const promise = Promise.resolve();
    WidgetApi.fetchData = jest.fn(() => promise);
    promise.then = () => promise;

    const component = renderer.create(<OnlineCustomer {...fakeProps}/>);
    expect(component.toJSON()).toMatchSnapshot();
});

test('component did mount then fetch new data', () => {
    const promise = Promise.resolve(fakeResponse);
    WidgetApi.fetchData = jest.fn(() => promise);

    const component = renderer.create(<OnlineCustomer {...fakeProps}/>);
    promise.then(() => expect(component.toJSON()).toMatchSnapshot());
});

describe('componentWillReceiveProps(nextProps)', () => {
    test('refresh greater than old value: fetch data', () => {
        const component = new OnlineCustomer(fakeProps);
        component.props = {
            refresh: 123
        };
        component.setState = jest.fn();
        component.fetchData = jest.fn();
        const nextProps = {
            refresh: 456,
            a: 1,
            b: 2
        };
        component.componentWillReceiveProps(nextProps);

        expect(component.setState).toBeCalledWith({isLoading: true});
        expect(component.fetchData).toBeCalled();
    });

    test('refresh less than or equal old value: do nothing', () => {
        const component = new OnlineCustomer(fakeProps);
        component.props = {
            refresh: 123
        };
        component.setState = jest.fn();
        component.fetchData = jest.fn();

        component.componentWillReceiveProps({refresh: 123});
        expect(component.setState)
            .not
            .toBeCalled();
        expect(component.fetchData)
            .not
            .toBeCalled();

        component.componentWillReceiveProps({refresh: 1});
        expect(component.setState)
            .not
            .toBeCalled();
        expect(component.fetchData)
            .not
            .toBeCalled();
    });
});

test('fetch data by criteria', () => {
    const component = new OnlineCustomer(fakeProps);
    const promise = Promise.resolve();
    promise.then = () => promise;
    WidgetApi.fetchData = jest.fn(() => promise);
    component.fetchData();
    expect(WidgetApi.fetchData).toBeCalledWith({Url: 'GetOnlineCustomers', IsCrossSite: false});
});

describe('animation complete', () => {
    test('re-format chart', () => {
        const component = new OnlineCustomer(fakeProps);
        const horizontalBar = fakeHorizontalBarInstance();
        component
            .options
            .animation
            .onComplete
            .call(horizontalBar);

        const formatObject = {
            fillStyle: "#5162BA",
            textAlign: "left",
            textBaseline: "middle"
        };

        expect(horizontalBar.chart.ctx).toEqual(expect.objectContaining(formatObject));
    });

     test('fill text each data set', () => {
        const component = new OnlineCustomer(fakeProps);
        const horizontalBar = fakeHorizontalBarInstance();
        component
            .options
            .animation
            .onComplete
            .call(horizontalBar);

        const formatObject = {
            fillStyle: "#5162BA",
            textAlign: "left",
            textBaseline: "middle"
        };

        expect(horizontalBar.chart.ctx.fillText.mock.calls).toEqual([
            ['1',123456699,999],
            ['2',123456699,9999],
            ['3',123456699,888],
            ['5',123456699,8888],
        ]);
    });
});