import React from 'react';
import renderer from 'react-test-renderer';
import RegisteredCustomer from '../registercustomer';
import WidgetApi from '../../../../Modules/WidgetApi';
import ReactTestUtils from 'react-addons-test-utils';

jest.mock('../../../../Modules/WidgetApi');

const selectedFilter = {
    baseCurrency: "EUR"
};

beforeAll(() => {
    WidgetApi.fetchData.mockImplementation(() => {
        return new Promise(resolve => {
            resolve({
                data: {
                    Deposit: 1111,
                    NoneDeposit: 2222
                }
            })
        });
    });
});

test('renders correctly', () => {
    const component = renderer.create(
        <RegisteredCustomer filter={selectedFilter} refresh="100" langCode="en" />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('state must be assigned correct data from API', (done) => {
    var view = ReactTestUtils.renderIntoDocument(<RegisteredCustomer filter={selectedFilter} refresh="100" langCode="en" />)
    var param = {
        filter: {}
    };
    view.fetchData(param, () => {
        expect(view.state.deposit).toBe(1111);
        expect(view.state.noneDeposit).toBe(2222);
        done();
    });
});