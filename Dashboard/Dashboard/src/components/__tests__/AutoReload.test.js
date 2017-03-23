import React from 'react';
import renderer from 'react-test-renderer';
import AutoReload from '../AutoReload';
import LocalStorageHelper from '../../Modules/LocalStorageHelper';

jest.mock('../../Modules/LocalStorageHelper');

const fakeProps = {
    dataKey: 'test',
    defaultCountdown: 1000,
    reloadCallback: jest.fn()
};

function findElement(component, selector) {
    if (component._component) {
        return findElement(component._component, selector);
    }

    if (component._currentElement) {
        const element = component._currentElement;

        if (element.props && element.props.className) {
            const reg = new RegExp(selector.substring(1));
            if (component._currentElement.props.className.match(reg)) {
                return element;
            }
        }
    }

    if (component._renderedComponent) {
        return findElement(component._renderedComponent, selector);
    }

    if (component._renderedChildren) {
        for (let key in component._renderedChildren) {
            let found = findElement(component._renderedChildren[key], selector);
            if (found) {
                return found;
            }
        }
    }

    return null;
}

describe('render corectly:', () => {
    const _setInterval = window.setInterval;
    const _clearInterval = window.clearInterval;

    beforeEach(() => {
        window.setInterval = jest.fn();
        window.clearInterval = jest.fn();
        LocalStorageHelper.getWidgetReloadCountdown = jest.fn(() => ({}));
    });

    afterEach(() => {
        window.setInterval = _setInterval;
        window.clearInterval = _clearInterval;
    });

    test('without user settings: use default countdown', () => {
        const component = renderer.create(<AutoReload {...fakeProps} />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('load countdown from user settings', () => {
        LocalStorageHelper.getWidgetReloadCountdown = jest.fn(() => ({ test: 100 }));
        const component = renderer.create(<AutoReload {...fakeProps} />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('on timer tick: decrease countdown by 1', () => {
        const component = renderer.create(<AutoReload {...fakeProps} />);
        const instance = component.getInstance();
        instance._onTick();
        expect(component.toJSON()).toMatchSnapshot();
    });

    [null, undefined, []].forEach(countdownValues => {
        test('on counter click: show empty dropdown', () => {
            const props = Object.assign({
                countdownValues: countdownValues
            }, fakeProps);
            const component = renderer.create(<AutoReload {...props} />);
            const element = findElement(component, '.btn-refresh');

            component.getInstance().setState({ isShowSelection: false });

            element.props.onClick();
            expect(component.toJSON()).toMatchSnapshot();
        });
    });

    test('on counter click: show dropdown', () => {
        const props = Object.assign({
            countdownValues: [1, 2, 3, 4]
        }, fakeProps);
        const component = renderer.create(<AutoReload {...props} />);
        const element = findElement(component, '.btn-refresh');

        component.getInstance().setState({ isShowSelection: false });

        element.props.onClick();
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('on counter click: hide dropdown', () => {
        const component = renderer.create(<AutoReload {...fakeProps} />);
        const element = findElement(component, '.btn-refresh');

        component.getInstance().setState({ isShowSelection: true });

        element.props.onClick();
        expect(component.toJSON()).toMatchSnapshot();
    });
});

describe('componentDidMount', () => {
    const _setInterval = window.setInterval;

    beforeEach(() => {
        LocalStorageHelper.getWidgetReloadCountdown = jest.fn(() => ({}));
    });

    afterEach(() => {
        window.setInterval = _setInterval;
    });

    test('countdown equal or less than zero: do nothing', () => {
        [-1, 0].forEach(countdown => {
            LocalStorageHelper.getWidgetReloadCountdown = jest.fn(() => ({ test: countdown }));
            window.setInterval = jest.fn();
            const component = new AutoReload({
                dataKey: 'test',
                defaultCountdown: countdown
            });

            component.componentDidMount();
            expect(window.setInterval).not.toBeCalled();
        });
    });
    test('countdown greater than zero: start timer', () => {
        const component = new AutoReload(fakeProps);
        window.setInterval = jest.fn(() => 123456);
        component._onTick = jest.fn();
        component.componentDidMount();

        expect(component.timerId).toBe(123456);
        expect(window.setInterval.mock.calls[0][1]).toBe(1000);

        window.setInterval.mock.calls[0][0]();
        expect(component._onTick).toBeCalled();
    });
});

describe('componentWillUnmount', () => {
    const _clearInterval = window.clearInterval;

    beforeEach(() => {
        window.clearInterval = jest.fn();
        LocalStorageHelper.getWidgetReloadCountdown = jest.fn(() => ({}));
    });

    afterEach(() => {
        window.clearInterval = _clearInterval;
    });

    test('no timerId: do nothing', () => {
        [null, undefined, 0, false].forEach(timerId => {
            const component = new AutoReload(fakeProps);
            component.timerId = timerId;

            component.componentWillUnmount();
            expect(window.clearInterval).not.toBeCalled();
        });
    });

    test('has timerId: stop timer', () => {
        const component = new AutoReload(fakeProps);
        component.timerId = 123;

        component.componentWillUnmount();
        expect(window.clearInterval).toBeCalledWith(123);
    });
});

test('callback when countdown = 0 and restart countdown', () => {
    const component = new AutoReload(fakeProps);
    component.setState = jest.fn();
    component.state.currentCountdown = 0;
    component.state.countdown = 123;

    component._onTick();

    expect(fakeProps.reloadCallback).toBeCalled();
    expect(component.setState).toBeCalledWith({ currentCountdown: 123 });
});


describe('_onSelectCounterValue', () => {
    beforeEach(() => {
        LocalStorageHelper.getWidgetReloadCountdown = jest.fn(() => ({}));
    });

    test('update countdown and hide dropdown', () => {
        const component = new AutoReload(fakeProps);
        component.setState = jest.fn();

        component._onSelectCounterValue(4444);

        expect(component.setState).toBeCalledWith({
            isShowSelection: false,
            countdown: 4444,
            currentCountdown: 4444
        });
    });

    test('save new value', () => {
        const component = new AutoReload(fakeProps);
        component.setState = jest.fn();

        component._onSelectCounterValue(4444);

        expect(LocalStorageHelper.saveWidgetReloadCountdown).toBeCalledWith({
            test: 4444
        });
    });
});

test('on counter value click: call _onSelectCounterValue(value)', () => {
    const props = Object.assign({
        countdownValues: [1, 2, 3, 4]
    }, fakeProps);
    const component = renderer.create(<AutoReload {...props} />);
    const instance = component.getInstance();
    instance.setState({ isShowSelection: true });
    instance._onSelectCounterValue = jest.fn();

    const element = findElement(component, '.dropdown-timer');
    element.props.children[0].props.onClick();
    expect(instance._onSelectCounterValue).toBeCalledWith(1);

    element.props.children[3].props.onClick();
    expect(instance._onSelectCounterValue).toBeCalledWith(4);
});