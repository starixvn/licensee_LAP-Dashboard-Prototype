import WidgetLayout from '../WidgetLayout';
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

test('clearLayoutSettingIfNewVersion(): calls to localStorage with correct keys', () => {
    document.body.innerHTML = '<script src="aaa?v=123" id="dashboard-script"></script>';
  
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

