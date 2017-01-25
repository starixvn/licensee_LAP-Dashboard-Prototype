
import axios from 'axios';

export default class WidgetApi {

    static _getAuthToken(action) {
        var tokenUrl = window.TokenUrl || "http://10.18.200.209:8073/12bet/Verify/ApplyApiToken?type=1&actionLink={0}"
        tokenUrl = tokenUrl.replace("{0}", encodeURIComponent(action))
        return axios.get(tokenUrl, {

        });
    }
    static _fetchJson(param) {
        //sample
        axios.get(param.Url, {

            withCredentials: !param.IsCrossSite,
        })
            .then(response => {
                console.log(response.data);

            })
            .catch(error => {
                console.log(error);
            });


    }
    static fetchData(param) {
        var data = param.Data || {};

        if (param.IsCrossSite) {

            WidgetApi._getAuthToken(param.Url).then((response) => {

                data['X-Auth-Token'] = response.data.Token
                var dataUrl = response.data.Host + param.Url
                return axios.get(dataUrl, {
                    params: data
                });
            });

        }
        else {
            var dataUrl = window.HostUrl || "http://10.18.200.209:8073/12bet" + param.Url;
            return axios.get(dataUrl, {
                params: data
            });
        }

    }

    static wgStatusCacheKey() {
        return "_LAP_Dashboard_Wg_Status"
    }
    static saveWgStatus(wgs) {
        try {
            window.sessionStorage.setItem(WidgetApi.wgStatusCacheKey(), JSON.stringify(wgs))
        } catch (error) {
            alert("To continue use dashboard. Please turn private browsing off!!")
        }
    }
    static getWgStatus() {
        var item = window.sessionStorage.getItem(WidgetApi.wgStatusCacheKey())
        return item ? JSON.parse(item) : null


    }
}