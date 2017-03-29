import LocalStorageHelper from '../LocalStorageHelper';

function fakeDashboardScript(scriptSrc) {
    var scriptElement = window.document.createElement("script");
    scriptElement.id = "dashboard-script";
    scriptElement.src = scriptSrc;
    window.document.body.appendChild(scriptElement);

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
});

describe('clearLayoutSettingIfNewVersion()', () => {
    afterEach(() => {
        window.document.body.innerHTML = '';
    });

    test('no dashboard script: do nothing', () => {
        LocalStorageHelper.clearLayoutSettingIfNewVersion();
        expect(window.localStorage.getItem)
            .not
            .toBeCalled();
    });
    test('script version not match: do nothing', () => {
        var scriptElement = fakeDashboardScript('something else i don\'t know');

        LocalStorageHelper.clearLayoutSettingIfNewVersion();
        expect(window.localStorage.getItem)
            .not
            .toBeCalled();
    });
    test('get cache version with correct setting key', () => {
        var scriptElement = fakeDashboardScript('f**k.js?v=123');

        LocalStorageHelper.clearLayoutSettingIfNewVersion();

        expect(window.localStorage.getItem).toBeCalledWith('_LAP_Dashboard_Wg_Version');
    });

    [null, '', undefined, 'v=122'].forEach(cacheVersion => {
        test('dashboard script has different version with cache: set new version', () => {
            // new version
            var scriptElement = fakeDashboardScript('f**k.js?v=123456');

            // cache version
            window.localStorage.getItem = jest.fn(() => cacheVersion);

            LocalStorageHelper.clearLayoutSettingIfNewVersion();

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

        LocalStorageHelper.clearLayoutSettingIfNewVersion();

        expect(window.localStorage.setItem)
            .not
            .toBeCalled();
    });
});

describe('saveWidgetStatus(wgs)', () => {
    test('set item to localStorage with correct key', () => {
        LocalStorageHelper.saveWidgetStatus('any-status');
        expect(window.localStorage.setItem).toBeCalledWith('_LAP_Dashboard_Wg_Status', JSON.stringify('any-status'));
    });
    test('cannot save: show alert', () => {
        window.alert = jest.fn();
        window.localStorage.setItem = () => {
            throw 'fake exception'
        };

        LocalStorageHelper.saveWidgetStatus('any-status');

        expect(window.alert).toBeCalledWith('To continue use dashboard. Please turn private browsing off!!');
    });
});

describe('getWidgetStatus()', () => {
    test('get item from localStorage with correct key', () => {
        window.localStorage.getItem = key => key === '_LAP_Dashboard_Wg_Status'
            ? '{"any":"should return this"}'
            : null;
        expect(LocalStorageHelper.getWidgetStatus()).toEqual({ "any": "should return this" });
    });

    [null, undefined, '', 'undefined'].forEach(savedStatus => {
        test('dont have saved data: return null', () => {
            window.localStorage.getItem = () => savedStatus;
            expect(LocalStorageHelper.getWidgetStatus()).toBeNull();
        });
    });
});

describe('saveWidgetLayout(saveRemovedWidgetLayout)', () => {
    test('set item to localStorage with correct key', () => {
        const layoutConfigs = {
            any: 'layout-config'
        };
        LocalStorageHelper.saveWidgetLayout(layoutConfigs);
        expect(window.localStorage.setItem).toBeCalledWith('_LAP_Dashboard_Wg_Layout', JSON.stringify(layoutConfigs));
    });
    test('cannot save: show alert', () => {
        window.alert = jest.fn();
        window.localStorage.setItem = () => {
            throw 'fake exception'
        };

        LocalStorageHelper.saveWidgetLayout('any-status');

        expect(window.alert).toBeCalledWith('To continue use dashboard. Please turn private browsing off!!');
    });
});

describe('getWidgetLayout()', () => {
    test('get item from localStorage with correct key', () => {
        window.localStorage.getItem = key => key === '_LAP_Dashboard_Wg_Layout'
            ? '{"any":"should return this"}'
            : null;
        expect(LocalStorageHelper.getWidgetLayout()).toEqual({ "any": "should return this" });
    });

    [null, undefined, '', 'undefined'].forEach(savedStatus => {
        test('dont have saved data: return null', () => {
            window.localStorage.getItem = () => savedStatus;
            expect(LocalStorageHelper.getWidgetLayout()).toBeNull();
        });
    });
});

describe('saveRemovedWidgetLayout(layout)', () => {
    test('set item to localStorage with correct key', () => {
        const layoutConfigs = {
            any: 'layout-config'
        };
        LocalStorageHelper.saveRemovedWidgetLayout(layoutConfigs);
        expect(window.localStorage.setItem).toBeCalledWith('_LAP_Dashboard_Wg_Layout_removed', JSON.stringify(layoutConfigs));
    });
    test('cannot save: show alert', () => {
        window.alert = jest.fn();
        window.localStorage.setItem = () => {
            throw 'fake exception'
        };

        LocalStorageHelper.saveRemovedWidgetLayout('any-status');

        expect(window.alert).toBeCalledWith('To continue use dashboard. Please turn private browsing off!!');
    });
});

describe('getRemovedWidgetLayout()', () => {
    test('get item from localStorage with correct key', () => {
        window.localStorage.getItem = key => key === '_LAP_Dashboard_Wg_Layout_removed'
            ? '{"any":"should return this"}'
            : null;
        expect(LocalStorageHelper.getRemovedWidgetLayout()).toEqual({ "any": "should return this" });
    });

    [null, undefined, '', 'undefined'].forEach(savedStatus => {
        test('dont have saved data: return empty object', () => {
            window.localStorage.getItem = () => savedStatus;
            expect(LocalStorageHelper.getRemovedWidgetLayout()).toEqual({});
        });
    });
});

describe('getWidgetReloadCountdown()', () => {
    test('get item from localStorage with correct key', () => {
        window.localStorage.getItem = key => key === '_LAP_Dashboard_Wg_Reload_Countdown'
            ? '{"any":"should return this"}'
            : null;
        expect(LocalStorageHelper.getWidgetReloadCountdown()).toEqual({ "any": "should return this" });
    });

    [null, undefined, '', 'undefined'].forEach(savedStatus => {
        test('dont have saved data: return empty object', () => {
            window.localStorage.getItem = () => savedStatus;
            expect(LocalStorageHelper.getWidgetReloadCountdown()).toEqual({});
        });
    });
});

describe('saveWidgetReloadCountdown(values)', () => {
    test('set item to localStorage with correct key', () => {
        const somethingTobeSaved = { any: 'hellllo' };
        LocalStorageHelper.saveWidgetReloadCountdown(somethingTobeSaved);
        expect(window.localStorage.setItem).toBeCalledWith(
            '_LAP_Dashboard_Wg_Reload_Countdown',
            JSON.stringify(somethingTobeSaved));
    });
    test('cannot save: show alert', () => {
        window.alert = jest.fn();
        window.localStorage.setItem = () => {
            throw 'fake exception'
        };

        LocalStorageHelper.saveWidgetReloadCountdown('any-status');

        expect(window.alert).toBeCalledWith('To continue use dashboard. Please turn private browsing off!!');
    });
});