import React from 'react';
import renderer from 'react-test-renderer';
import WidgetApi from '../../../../Modules/WidgetApi';
import WidgetBox from '../../widgetbox';
import LicenseeWinLoss from '../licenseewl';
import * as ChartJs from 'react-chartjs-2'

jest.mock('../../../../Modules/WidgetApi');
jest.mock('../../widgetbox');
jest.mock('react-chartjs-2',);

const Bar = ChartJs.Bar;

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
    Bar.mockImplementation(() => ({
        render: function () {
            return (
                <div {...this.props}>
                    hello bar
                </div>
            )
        }
    }));
});

test('when component did mount, fetch data with given props', () => {
    // assign
    const fakeProps = {
        filter: {
            currency: 999,
            baseCurrency: 'fap fap baseCurrency'
        },
        langCode: 'en',
        refresh: 1000,
        some_prop: "fap fap fap!"
    };
    let fetchDataPromise = new Promise(resolve => resolve({
        data: {
            Data: [
                {
                    Key: 'total_turnover',
                    Value: 1.234
                }, {
                    Key: 'c_online_customer',
                    Value: 5.678
                }
            ],
            Total: 123.456
        }
    }));

    WidgetApi
        .fetchData
        .mockImplementation(() => fetchDataPromise);

    // action
    const component = renderer.create(<LicenseeWinLoss { ...fakeProps }/>);
    fetchDataPromise.then(() => expect(component.toJSON()).toMatchSnapshot())
});