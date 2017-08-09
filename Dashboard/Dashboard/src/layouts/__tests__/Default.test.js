import React from 'react';
import renderer from 'react-test-renderer';
import DefaultLayout from '../Default.jsx';
import WidgetApi from '../../Modules/WidgetApi';

jest.mock('../../Modules/WidgetApi');
const fakeResponse = {
  data: {
    Currency: [{
      CurrencyId: 1,
      Currency: "USD",

    },
    {
      CurrencyId: "20",
      Currency: "UUS",

    }
    ],
    BaseCurrency: []
  }
};
test('renders the DefaultLayout component', () => {
     WidgetApi
    .fetchData
    .mockImplementation(() => Promise.resolve(fakeResponse));
    const wgStatus = [
        { key: "abc", enable: true }
    ];

    const component = renderer.create(
        <DefaultLayout langCode="en" initialWgStatus={wgStatus}>
        </DefaultLayout>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});