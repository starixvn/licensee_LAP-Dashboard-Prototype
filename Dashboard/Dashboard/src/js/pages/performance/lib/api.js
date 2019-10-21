import { tabMenuKey } from '../lib/constants';
import * as overviewApi from '../tabs/overview/lib/api';
import * as currencyApi from '../tabs/currency/lib/api';

export const factoryApi = {
  [tabMenuKey.overview]: filterData => {
    return overviewApi.getCombineData(filterData);
  },
  [tabMenuKey.currency]: filterData => {
    return currencyApi.getCombineData(filterData);
  }
}
