import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import RightPanel from '../RightPanel.jsx';
import WidgetLayout from '../../Modules/WidgetLayout';
import WidgetApi from '../../Modules/WidgetApi';

jest.mock('../../Modules/WidgetLayout');
jest.mock('../../Modules/WidgetApi');

const wgStatus = [
    { key: "abc", enable: true }
];

beforeAll(() => {
    WidgetLayout.getWidgetStatus.mockImplementation(() => {
        return [{ key: "abc", enable: true }];
    });

    WidgetApi.fetchData.mockImplementation(() => {
        return new Promise(resolve => {
            resolve({
                data: {
                    CurrencyList: [{ Key: 1, Value: "1" }],
                    BaseCurrencyList: ["A", "B"]
                }
            })
        });
    });
});

test('renders correctly', () => {
    const component = renderer.create(
        <RightPanel langCode="en" wgs={wgStatus} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('has class is-expanded when clicking on handler', () => {
    const component = shallow(
        <RightPanel langCode="en" wgs={wgStatus} />
    );
    expect(component.hasClass('is-expanded')).toBeFalsy();

    component.find('.icon-quickaccess').simulate('click');
    expect(component.hasClass('is-expanded')).toBeTruthy();
});