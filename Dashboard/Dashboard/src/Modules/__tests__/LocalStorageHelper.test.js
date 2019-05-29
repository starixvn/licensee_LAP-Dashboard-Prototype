import LocalStorageHelper from '../LocalStorageHelper';
import 'jest-localstorage-mock';
function fakeDashboardScript(scriptSrc) {
  var scriptElement = window.document.createElement("script");
  scriptElement.id = "dashboard-script";
  scriptElement.src = scriptSrc;
  window.document.body.appendChild(scriptElement);

  return scriptElement;
}

beforeEach(() => {
  localStorage.clear();
  jest.resetAllMocks();
  localStorage.setItem.mockClear();
  global.alert = jest.fn(text => text)

});


afterEach(() => {

});

describe('clearLayoutSettingIfNewVersion()', () => {
  afterEach(() => {
    window.document.body.innerHTML = '';
  });

  test('no dashboard script: do nothing', () => {
    LocalStorageHelper.clearLayoutSettingIfNewVersion();
    expect(window.localStorage.getItem)
      .not
      .toHaveBeenCalled();
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

    expect(window.localStorage.getItem).toHaveBeenCalledWith('_LAP_Dashboard_Wg_Version');
  });

  [null, '', undefined, 'v=122'].forEach(cacheVersion => {
    test('dashboard script has different version with cache: set new version', () => {
      // new version
      var scriptElement = fakeDashboardScript('f**k.js?v=123456');

      LocalStorageHelper.clearLayoutSettingIfNewVersion();

      expect(window.localStorage.setItem).toHaveBeenCalledWith('_LAP_Dashboard_Wg_Version', 'v=123456');
      expect(window.localStorage.removeItem).toHaveBeenCalledWith('_LAP_Dashboard_Wg_Status');
      expect(window.localStorage.removeItem).toHaveBeenCalledWith('_LAP_Dashboard_Wg_Layout');
    });
  });

  test('dashboard script has same version with cache: do not set new version', () => {
    // new version
    localStorage.__STORE__["_LAP_Dashboard_Wg_Version"]="v=123456";

    var scriptElement = fakeDashboardScript('f**k.js?v=123456');

    LocalStorageHelper.clearLayoutSettingIfNewVersion();

    expect(localStorage.__STORE__["_LAP_Dashboard_Wg_Version"]).toBe("v=123456");
  });
});

describe('saveWidgetStatus(wgs)', () => {
  test('set item to localStorage with correct key', () => {
    LocalStorageHelper.saveWidgetStatus('any-status');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('_LAP_Dashboard_Wg_Status', JSON.stringify('any-status'));
  });

});



describe('saveWidgetLayout(saveRemovedWidgetLayout)', () => {
  test('set item to localStorage with correct key', () => {
    const layoutConfigs = {
      any: 'layout-config'
    };
    LocalStorageHelper.saveWidgetLayout(layoutConfigs);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('_LAP_Dashboard_Wg_Layout', JSON.stringify(layoutConfigs));
  });


});


describe('saveRemovedWidgetLayout(layout)', () => {
  test('set item to localStorage with correct key', () => {
    const layoutConfigs = {
      any: 'layout-config'
    };
    LocalStorageHelper.saveRemovedWidgetLayout(layoutConfigs);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('_LAP_Dashboard_Wg_Layout_removed', JSON.stringify(layoutConfigs));
  });

});



describe('saveWidgetReloadCountdown(values)', () => {
  test('set item to localStorage with correct key', () => {
    const savedValue = { any: 'hellllo' };
    LocalStorageHelper.saveWidgetReloadCountdown(savedValue);
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      '_LAP_Dashboard_Wg_Reload_Countdown',
      JSON.stringify(savedValue));
  });

});
