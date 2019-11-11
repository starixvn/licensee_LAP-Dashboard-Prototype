import { tabMenuKey } from '../lib/constants';
import * as overviewApi from '../tabs/overview/lib/api';
import * as currencyApi from '../tabs/currency/lib/api';
import * as productApi from '../tabs/product/lib/api';

const overviewApiFactory = {
  mainApi: filterData => {
    return overviewApi.getCombineData(filterData);
  },
  lazyApi: null
}

const currencyApiFactory = {
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

const productApiFactory = {
  mainApi: filterData => {
    return productApi.getCombineData(filterData);
  },
  lazyApi: async (mainData, filterData) => {
    const topDistributions = mapToTopDistributions(mainData['growthData']['periodGrowth']);
    const lazyFilterData = {
      ...filterData,
      ...{
        topDistributions
      }
    }
    const responseData = await productApi.getAllMonthGrowthData(lazyFilterData);
    const data = {
      handlerData: state => {
        state['growthData']['monthGrowth'] = responseData
        return state;
      }
    }
    return data;
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

export const factoryApi = {
  [tabMenuKey.overview]: overviewApiFactory,
  [tabMenuKey.currency]: currencyApiFactory,
  [tabMenuKey.product]: productApiFactory
}
