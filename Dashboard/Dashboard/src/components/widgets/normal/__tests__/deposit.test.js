import React from 'react';
import renderer from 'react-test-renderer';
import DepositWidget from '../deposit.jsx';
import WidgetApi from '../../../../Modules/WidgetApi';

jest.mock('../../../../Modules/WidgetApi');

const selectedFilter = {
    baseCurrency: "EUR"
};

beforeAll(() => {
    WidgetApi.fetchData.mockImplementation(() => {
        return new Promise(resolve => {
            resolve({
                data: 9999
            })
        });
    });
});

test('renders correctly', () => {
    const component = renderer.create(
        <DepositWidget filter={selectedFilter} refresh="100" langCode="en"  />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});