import React from 'react';
import renderer from 'react-test-renderer';
import RightPanel from '../RightPanel.jsx';

test('renders the RightPanel component', () => {
    const wgStatus = [
        { key: "abc", enable: true }
    ];

    const component = renderer.create(
        <RightPanel langCode="en" wgs={wgStatus}>
        </RightPanel>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});