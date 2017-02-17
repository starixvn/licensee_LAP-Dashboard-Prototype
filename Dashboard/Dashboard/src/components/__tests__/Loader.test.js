import React from 'react';
import renderer from 'react-test-renderer';
import Loader from '../Loader.jsx';

test('renders the Loader component', () => {
    const component = renderer.create(
        <Loader />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('renders the Loader component when isLoading = true', () => {
    const component = renderer.create(
        <Loader isLoading="true" />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});