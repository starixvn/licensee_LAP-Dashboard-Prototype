import widgetApi from '../../../lib/widgetApi';
import { tabMenuKey } from '../lib/constants';

export const factoryApi = {
  [tabMenuKey.overview]: filterData => {
    return overviewApi.getCombineData(filterData);
  },
  [tabMenuKey.currency]: filterData => {
    return currencyApi.getCombineData(filterData);
  }
}

export const overviewApi = {
  getCombineData: async (filterData) => {
    const url =  '/api/performance/overview';
    const body = filterData;
    const response = await widgetApi.fetchDataCrossSite({ url, body });
    if (response && response.data) {
      return response.data.data;
    }
    return null;

  }
}
export const currencyApi = {
  getCombineData: async (filterData) => {
    const url =  '/api/performance/currency';
    const body = filterData;
    const response = await widgetApi.fetchDataCrossSite({ url, body });
    if (response && response.data) {
      debugger
      return response.data.data;
    }
    return null;

  }
}
