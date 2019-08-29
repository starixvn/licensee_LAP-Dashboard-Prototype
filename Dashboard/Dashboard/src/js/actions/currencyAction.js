import * as types from './types.js'
import { CurrenyListApiUrl } from '../lib/constants'
import widgetApi  from '../lib/widgetApi'

export const getCurrencyList = () => {
  return (dispatch) => {
    var param = {
      Url: CurrenyListApiUrl,
      IsCrossSite: false
    };
    widgetApi.fetchData(param)
      .then((response) => {
        response
          .data
          .Currency
          .unshift({ Currency: "All", CurrencyId: "0" });
          dispatch(setCurrencyList(response.data.Currency));
      })
      .catch(function (error) {
        console.log("error:", error);
      });
  }

}

const setLiveMatchs = (newData) => {
  return {
      type: types.SET_CURRENCY_LIST,
      data: newData,
  }
};
