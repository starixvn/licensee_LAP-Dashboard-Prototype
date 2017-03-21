import React from 'react';
import renderer from 'react-test-renderer';
import AutoReload from '../AutoReload';

test('render corectly', () => {
    const props = {
        className: 'a b c',
        hello: 'world'
    };
    const component = renderer.create(<AutoReload {...props}><b>i'm super</b></AutoReload>);
    expect(component.toJSON()).toMatchSnapshot();
});

test('invalid refresh: do not start timer', () => {
    const _setTimeout = window.setTimeout;
    window.setTimeout = jest.fn();

    [null, undefined, 0, false].forEach(refresh => {
        new AutoReload({ refresh });
        expect(window.setTimeout).not.toBeCalled();
    });

    window.setTimeout = _setTimeout;
});

test('valid refresh value: start timer', () => {
    const _setTimeout = window.setTimeout;
    window.setTimeout = jest.fn();

    const props = {
        refresh: 1000,
        callbackParent: jest.fn()
    };

    const component = new AutoReload(props);

    expect(props.callbackParent).toBeCalled();
    expect(window.setTimeout.mock.calls[0][1]).toBe(props.refresh);

    component._onRefresh = jest.fn();
    window.setTimeout.mock.calls[0][0]();

    expect(component._onRefresh).toBeCalled();

    window.setTimeout = _setTimeout;
});