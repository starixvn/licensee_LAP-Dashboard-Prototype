import axios from 'axios';

const widgetVersionCacheKey = "_LAP_Dashboard_Wg_Version";

const widgetStatusCacheKey = "_LAP_Dashboard_Wg_Status";

const widgetLayoutCacheKey = "_LAP_Dashboard_Wg_Layout";

export default class WidgetApi {

    static _getAuthToken(action) {
        var tokenUrl = window.TokenUrl || "http://ha.nexdev.net:7611/LAP/12bet/Verify/ApplyApiToken?type=1&actionLink={0}&_=" + (new Date()).getTime();
        tokenUrl = tokenUrl.replace("{0}", encodeURIComponent(action))
        return axios.get(tokenUrl, {

        });
    }

    static fetchData(param) {
        var data = param.Data || {};

        if (param.IsCrossSite) {

            return WidgetApi._getAuthToken(param.Url).then((response) => {


                data['X-Auth-Token'] = response.data.Token
                const dataUrl = response.data.ApiUrl + param.Url

                return axios.get(dataUrl, {
                    params: data
                });
            });


        } else {
            var lapRootUrl = window.HostUrl || "http://ha.nexdev.net:7611/LAP/12bet";
            const lapApi = lapRootUrl.replace("SessionIsAlive", param.Url)
            return axios.get(lapApi, {
                params: data
            });
        }

    }

    static clearLayoutSettingIfNewVersion(){
        var scriptElement = document.getElementById("dashboard-script");
        if (!scriptElement)
        {
            return;
        }

        var jsVersions = scriptElement.src.match(/v=\d*/);
        if (!jsVersions)
        {
            return;
        }

        var newVersion = jsVersions[0];
        var cacheVersion = window.localStorage.getItem(widgetVersionCacheKey);
        if (newVersion !== cacheVersion)
        {
            window.localStorage.setItem(widgetVersionCacheKey, newVersion);
            window.localStorage.removeItem(widgetStatusCacheKey);
            window.localStorage.removeItem(widgetLayoutCacheKey);
        }
    }

    static saveWgStatus(wgs) {
        try {
            window.localStorage.setItem(widgetStatusCacheKey, JSON.stringify(wgs))
        } catch (error) {
            alert("To continue use dashboard. Please turn private browsing off!!")
        }
    }
    static getWgStatus() {
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