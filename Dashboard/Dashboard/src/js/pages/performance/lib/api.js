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
const commonParam = {
  IsCrossSite: true,
  Data: {},
  Url: '',
  Type: 4
};
export const overviewApi = {
  getCombineData: async (filterData) => {
    const param = Object.assign({}, commonParam, { Data: filterData, Url: '/api/performance/overview' });
    const response = await widgetApi.postData(param);
    if (response && response.data) {
      return response.data.data;
    }
    return null;

  }
}
export const currencyApi = {
  getCombineData: async (filterData) => {
    const param = Object.assign({}, commonParam, { Data: filterData, Url: '/api/performance/currency' });
    const response = await widgetApi.postData(param);
    if (response && response.data) {
      return response.data.data;
    }
    return null;
  }
}
