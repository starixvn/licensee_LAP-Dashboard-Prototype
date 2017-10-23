import axios from 'axios';

const defaultHostUrl = "http://ha.nexdev.net:7611/LAP/12bet";

export default class WidgetApi {

    static _getAuthToken(action) {
        var tokenUrl = window.TokenUrl || defaultHostUrl + "/Verify/ApplyApiToken?type=1&actionLink={0}&_=" + (new Date()).getTime();
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
            var lapRootUrl = window.HostUrl || defaultHostUrl;
            const lapApi = lapRootUrl.replace("SessionIsAlive", param.Url)
            return axios.get(lapApi, {
                params: data
            });
        }
    }
}