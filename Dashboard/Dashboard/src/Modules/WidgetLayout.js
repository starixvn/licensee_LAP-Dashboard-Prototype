const widgetVersionCacheKey = "_LAP_Dashboard_Wg_Version";

const widgetStatusCacheKey = "_LAP_Dashboard_Wg_Status";

const widgetLayoutCacheKey = "_LAP_Dashboard_Wg_Layout";

export default class WidgetLayout {
    static clearLayoutSettingIfNewVersion() {
        var scriptElement = document.getElementById("dashboard-script");
        if (!scriptElement) {
            return;
        }

        var jsVersions = scriptElement.src.match(/v=\d*/);
        if (!jsVersions) {
            return;
        }

        var newVersion = jsVersions[0];
        var cacheVersion = window.localStorage.getItem(widgetVersionCacheKey);
        if (newVersion !== cacheVersion) {
            window.localStorage.setItem(widgetVersionCacheKey, newVersion);
            window.localStorage.removeItem(widgetStatusCacheKey);
            window.localStorage.removeItem(widgetLayoutCacheKey);
        }
    }

    static saveWidgetStatus(wgs) {
        try {
            window.localStorage.setItem(widgetStatusCacheKey, JSON.stringify(wgs))
        } catch (error) {
            alert("To continue use dashboard. Please turn private browsing off!!")
        }
    }
    static getWidgetStatus() {
        var item = window.localStorage.getItem(widgetStatusCacheKey)
        return item && item !== "undefined" && item !== "null" ? JSON.parse(item) : null;
    }

    static saveWidgetLayout(layout) {
        try {
            window.localStorage.setItem(widgetLayoutCacheKey, JSON.stringify(layout))
        } catch (error) {
            alert("To continue use dashboard. Please turn private browsing off!!")
        }
    }
    static getWidgetLayout() {
        var item = window.localStorage.getItem(widgetLayoutCacheKey)
        return item && item !== "undefined" && item !== "null" ? JSON.parse(item) : null;
    }
}