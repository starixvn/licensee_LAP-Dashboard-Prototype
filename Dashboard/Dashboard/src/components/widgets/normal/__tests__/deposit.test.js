import React from 'react';
import renderer from 'react-test-renderer';
import DepositWidget from '../deposit.jsx';
import WidgetApi from '../../../../Modules/WidgetApi';
import WidgetBox from '../../widgetbox';

jest.mock('../../widgetbox');
jest.mock('../../../../Modules/WidgetApi');

test('renders correctly', () => {
    WidgetApi
        .fetchData
        .mockImplementation(() => Promise.resolve({data: 9999}));
    WidgetBox.mockImplementation(() => ({
        render: function () {
            return (
                <div {...this.props} name="WidgetBox">
                    {this.props.children}
                </div>
            )
        }
    }));
    const props = {
        filter: {
            baseCurrency: "EUR"
        },
        refresh: 100,
        langCode: 'en',
        callbackParent: 'fake callbackParent',
        wgItemFromParent: 'fake wgItemFromParent'
    };
    const component = renderer.create(<DepositWidget {...props}/>);
    expect(component.toJSON()).toMatchSnapshot();
});