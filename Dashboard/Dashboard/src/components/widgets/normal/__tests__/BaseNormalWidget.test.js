import React from 'react';
import renderer from 'react-test-renderer';
import BaseNormalWidget from '../BaseNormalWidget.jsx';
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
                data: 9999
            })
        });
    });
});

test('renders correctly', () => {
    const component = renderer.create(
        <BaseNormalWidget filter={selectedFilter} refresh="100" langCode="en" />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('data was rendered correctly from API', (done) => {
    var view = ReactTestUtils.renderIntoDocument(<BaseNormalWidget filter={selectedFilter} refresh="100" langCode="en" />)
    var param = {
        filter: { }
    };
    view.fetchData(param, () => {
        expect(ReactTestUtils.findRenderedDOMComponentWithClass(view, "number-big").innerHTML).toBe("€9,999.00");
        done();
    });
});