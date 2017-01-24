import axios from 'axios';
import StorageHelper from './StorageHelper';

const storageHelper = new StorageHelper();

export default class WidgetApi {
    static _getAuthToken() {

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

        //return a promise
    }
    static fetchData(param) {
        if (param.IsCrossSite) {
            // call _getAuthToken().then(=>append token to param.url then call _fetchJson)
        } else {
            //call _fetchJson
        }
        //return a promise
    }

    static wgStatusCacheKey() {
        return "_LAP_Dashboard_Wg_Status"
    }
    static implementStorageFunction(storageFunction) {
        if (storageHelper.supportSessionStorage === true) {
            return storageFunction();
        } else {
            alert('You are in Privacy Mode\nPlease deactivate Privacy Mode and then reload the page.');
            return null;
        }
    }
    static saveWgStatus(wgs) {
        WidgetApi.implementStorageFunction(() => window.sessionStorage.setItem(WidgetApi.wgStatusCacheKey(), JSON.stringify(wgs)));
    }
    static getWgStatus() {
        return WidgetApi.implementStorageFunction(() => {
            var item = window.sessionStorage.getItem(WidgetApi.wgStatusCacheKey())
            return item ? JSON.parse(item) : null
        });
    }
}