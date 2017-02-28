import WidgetLayout from '../WidgetLayout';

function fakeDashboardScript(scriptSrc) {
    var scriptElement = window
        .document
        .createElement("script");
    scriptElement.id = "dashboard-script";
    scriptElement.src = scriptSrc;
    window
        .document
        .body
        .appendChild(scriptElement);

    return scriptElement;
}

beforeEach(() => {
    window.localStorage = {
        setItem: jest.fn(),
        getItem: jest.fn(),
        removeItem: jest.fn()
    };
});
afterEach(() => {
    window.localStorage = null;
    window.document.body.innerHTML = '';
});

describe('clearLayoutSettingIfNewVersion()', () => {
    test('no dashboard script: do nothing', () => {
        WidgetLayout.clearLayoutSettingIfNewVersion();
        expect(window.localStorage.getItem)
            .not
            .toBeCalled();
    });
    test('script version not match: do nothing', () => {
        var scriptElement = fakeDashboardScript('something else i don\'t know');

        WidgetLayout.clearLayoutSettingIfNewVersion();
        expect(window.localStorage.getItem)
            .not
            .toBeCalled();
    });
    test('get cache version with correct setting key', () => {
        var scriptElement = fakeDashboardScript('f**k.js?v=123');

        WidgetLayout.clearLayoutSettingIfNewVersion();

        expect(window.localStorage.getItem).toBeCalledWith('_LAP_Dashboard_Wg_Version');
    });

    [null, '', undefined, 'v=122'].forEach(cacheVersion => {
        test('dashboard script has different version with cache: set new version', () => {
            // new version
            var scriptElement = fakeDashboardScript('f**k.js?v=123456');

            // cache version
            window.localStorage.getItem = jest.fn(() => cacheVersion);

            WidgetLayout.clearLayoutSettingIfNewVersion();

            expect(window.localStorage.setItem).toBeCalledWith('_LAP_Dashboard_Wg_Version', 'v=123456');
            expect(window.localStorage.removeItem).toBeCalledWith('_LAP_Dashboard_Wg_Status');
            expect(window.localStorage.removeItem).toBeCalledWith('_LAP_Dashboard_Wg_Layout');
        });
    });

     test('dashboard script has same version with cache: do not set new version', () => {
            // new version
            var scriptElement = fakeDashboardScript('f**k.js?v=123456');

            // cache version
            window.localStorage.getItem = jest.fn(() => 'v=123456');

            WidgetLayout.clearLayoutSettingIfNewVersion();

            expect(window.localStorage.setItem).not.toBeCalled();
        });
});
/*
test('clearLayoutSettingIfNewVersion(): calls to localStorage with correct keys', () => {
    var scriptElement = window
        .document
        .createElement("script");
    scriptElement.id = "dashboard-script";
    scriptElement.src = "anotherScript.js?v=123";
    window
        .document
        .body
        .appendChild(scriptElement);

    WidgetLayout.clearLayoutSettingIfNewVersion();

    expect(window.localStorage.setItem.mock.calls[0][0]).toBe('_LAP_Dashboard_Wg_Version');
    expect(window.localStorage.removeItem.mock.calls[0][0]).toBe('_LAP_Dashboard_Wg_Status');
    expect(window.localStorage.removeItem.mock.calls[1][0]).toBe('_LAP_Dashboard_Wg_Layout');
});

test('saveWidgetStatus(): set item to localStorage with correct key', () => {
    WidgetLayout.saveWidgetStatus();

    expect(window.localStorage.setItem.mock.calls[0][0]).toBe('_LAP_Dashboard_Wg_Status');
});

test('getWidgetStatus(): get item from localStorage with correct key', () => {
    WidgetLayout.getWidgetStatus();

    expect(window.localStorage.getItem.mock.calls[0][0]).toBe('_LAP_Dashboard_Wg_Status');
});

test('saveWidgetLayout(): set item from localStorage with correct key', () => {
    WidgetLayout.saveWidgetLayout();

    expect(window.localStorage.setItem.mock.calls[0][0]).toBe('_LAP_Dashboard_Wg_Layout');
});

test('getWidgetLayout(): get item from localStorage with correct key', () => {
    WidgetLayout.getWidgetLayout();

    expect(window.localStorage.getItem.mock.calls[0][0]).toBe('_LAP_Dashboard_Wg_Layout');
});
*/