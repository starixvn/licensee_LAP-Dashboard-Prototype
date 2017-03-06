import React from 'react';
import renderer from 'react-test-renderer';
import WidgetBox from '../widgetbox';
import LocalStorageHelper from '../../../Modules/LocalStorageHelper';

jest.mock('../../../Modules/LocalStorageHelper');
const fakeWidgetStates = [
    {
        key: 'fap fap fap'
    }
];

function findElementByClassName(component, className) {
    if (component.toJSON) {
        return findElementByClassName(component.toJSON(), className);
    }

    if (component.props && component.props.className && component.props.className.match(new RegExp(className))) {
        return component;
    }

    if (component.children) {
        for (let i = 0; i < component.children.length; i++) {
            let found = findElementByClassName(component.children[i], className);
            if (found) {
                return found;
            }
        }

    }

    return null;
}

beforeAll(() => {
    LocalStorageHelper
        .getWidgetStatus
        .mockImplementation(() => fakeWidgetStates);
});

test('render correctly', () => {
    const component = renderer.create(<WidgetBox
        widgetKey="fap fap fap"
        widgetName="w i d g e t"
        title="T.T"
        isLoading={true}/>);

    expect(component.toJSON()).toMatchSnapshot();
});

test('update mount status', () => {
    const component = renderer.create(<WidgetBox
        widgetKey="fap fap fap"
        widgetName="w i d g e t"
        title="T.T"
        isLoading={true}/>);
    const componentInstance = component.getInstance();

    componentInstance.componentDidMount();
    expect(componentInstance.state.isMounted).toBeTruthy();

    componentInstance.componentWillUnmount();
    expect(componentInstance.state.isMounted).toBeFalsy();
});

test('component is mounted & close widget is calling: close state changes', () => {
    const component = renderer.create(<WidgetBox
        widgetKey="fap fap fap"
        widgetName="w i d g e t"
        title="T.T"
        isLoading={true}/>);
    const componentInstance = component.getInstance();

    expect(componentInstance.state.isClosed).toBeFalsy();

    componentInstance.toggleClose();

    expect(componentInstance.state.isClosed).toBeTruthy();
    expect(component.toJSON()).toMatchSnapshot();
});

test('component is unmounted & close widget is calling: keep close state', () => {
    const component = renderer.create(<WidgetBox
        widgetKey="fap fap fap"
        widgetName="w i d g e t"
        title="T.T"
        isLoading={true}/>);
    const componentInstance = component.getInstance();

    componentInstance.componentWillUnmount();
    expect(componentInstance.state.isClosed).toBeFalsy();

    componentInstance.toggleClose();
    expect(componentInstance.state.isClosed).toBeFalsy();
    expect(component.toJSON()).toMatchSnapshot();
});

test('disable widget when close', () => {
    const component = renderer.create(<WidgetBox
        widgetKey="fap fap fap"
        widgetName="w i d g e t"
        title="T.T"
        isLoading={true}/>);
    const componentInstance = component.getInstance();

    fakeWidgetStates[0].enable = true;

    componentInstance.toggleClose();
    expect(fakeWidgetStates[0].enable).toBeFalsy();
});

test('component closed: save state', () => {
    const component = renderer.create(<WidgetBox
        widgetKey="fap fap fap"
        widgetName="w i d g e t"
        title="T.T"
        isLoading={true}/>);
    const componentInstance = component.getInstance();

    LocalStorageHelper
        .saveWidgetStatus
        .mockReset();
    componentInstance.toggleClose();
    expect(LocalStorageHelper.saveWidgetStatus).toBeCalledWith(fakeWidgetStates);
});

test('on close element clicked: toggle close', () => {
    const component = renderer.create(<WidgetBox
        widgetKey="fap fap fap"
        widgetName="w i d g e t"
        title="T.T"
        isLoading={true}/>);
    const componentInstance = component.getInstance();
    const closeElement = findElementByClassName(component, 'icon-close');
    expect(closeElement)
        .not
        .toBeNull();
    componentInstance.toggleClose = jest.fn();

    closeElement
        .props
        .onClick();

    expect(componentInstance.toggleClose).toBeCalled();
});