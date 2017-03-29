import React from 'react';
import renderer from 'react-test-renderer';
import PendingFundsWidget from '../pendingfunds';
import WidgetApi from '../../../../Modules/WidgetApi';
import { WidgetApiUrl, WidgetKey } from '../../../../config';
import WidgetBox from '../../widgetbox';

jest.mock('../../widgetbox');
jest.mock('../../../../Modules/WidgetApi');

const fakeProps = {
    filter: {
        baseCurrency: "EUR",
        currency: "123"
    },
    refresh: 100,
    langCode: 'en',
    callbackParent: 'fake callbackParent',
    wgItemFromParent: 'fake wgItemFromParent'
};

beforeAll(() => {
    WidgetApi
        .fetchData
        .mockImplementation(() => Promise.resolve({ data: 9999 }));
    WidgetBox.mockImplementation(() => ({
        render: function () {
            return (
                <div {...this.props} name="WidgetBox">
                    {this.props.children}
                </div>
            )
        }
    }));
});

test('renders correctly', () => {
    const component = renderer.create(<PendingFundsWidget {...fakeProps} />);
    expect(component.toJSON()).toMatchSnapshot();
});

test('componentDidMount: fetch data with correct criteria', () => {
    const component = renderer.create(<PendingFundsWidget {...fakeProps} />);
    expect(WidgetApi.fetchData).toBeCalledWith({
        Data: {
            CurrencyId: fakeProps.filter.currency,
            BaseCurrency: fakeProps.filter.baseCurrency
        },
        Url: WidgetApiUrl.normalPendingFund,
        IsCrossSite: true
    })
});

test('has specific configs', () => {
    const component = new PendingFundsWidget(fakeProps);
    expect(component.configs).toEqual({
        Url: WidgetApiUrl.normalPendingFund,
        TitleKey: "pending_funds",
        WidgetName: "pending-fund",
        WidgetKey: WidgetKey.normalPendingFund,
        defaultCountdown: 75,
        countdownValues: [15, 30, 45, 60, 75]
    })
});