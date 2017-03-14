import React from 'react';
import renderer from 'react-test-renderer';
import Loader from '../Loader.jsx';
import {WidgetKey} from '../../config';

test('renders the Loader component', () => {
    const component = renderer.create(<Loader/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('renders the Loader component when isLoading = true', () => {
    const component = renderer.create(<Loader isLoading="true"/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('base normal widgets: loader white', () => {
    [
        WidgetKey.normalCustomerBalance, 
        WidgetKey.normalPendingFund, 
        WidgetKey.normalDeposit, 
        WidgetKey.normalWithdrawal
    ].forEach(key => {
        const component = renderer.create(<Loader widgetKey={key}/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});