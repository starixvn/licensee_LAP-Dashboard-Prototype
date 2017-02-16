import React from 'react';
import renderer from 'react-test-renderer';
import DefaultLayout from '../Default.jsx';

test('renders the DefaultLayout component', () => {
    const wgStatus = [
        { key: "abc", enable: true }
    ];

    const component = renderer.create(
        <DefaultLayout langCode="en" initialWgStatus={_wgStatus}>
        </DefaultLayout>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});