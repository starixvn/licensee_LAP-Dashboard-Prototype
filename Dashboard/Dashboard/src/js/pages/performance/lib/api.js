import { tabMenuKey } from '../lib/constants';
import * as overviewApi from '../tabs/overview/lib/api';
import * as currencyApi from '../tabs/currency/lib/api';

export const factoryApi = {
  [tabMenuKey.overview]: {
    mainApi: filterData => {
      return overviewApi.getCombineData(filterData);
    },
    lazyApi: null
  },
  [tabMenuKey.currency]:  {
    mainApi: filterData => {
      return currencyApi.getCombineData(filterData);
    },
    lazyApi: async (mainData, filterData) => {
      const topDistributions = mapToTopDistributions(mainData['growthData']['periodGrowth']);
      const lazyFilterData = {
        ...filterData,
        ...{
          topDistributions
        }
      }
      const responseData = await currencyApi.getAllMonthGrowthData(lazyFilterData);
      const data = {
        handlerData: state => {
          state['growthData']['monthGrowth'] = responseData
          return state;
        }
      }
      return data;
    }
  }
}

const mapToTopDistributions = data => {
  return data.map(_ => ({
      displayId: _.id,
      displayName: _.name,
      previousPeriodDistributions: _.currentPeriodDistributions,
      currentPeriodDistributions: _.previousPeriodDistributions
  }));
}
