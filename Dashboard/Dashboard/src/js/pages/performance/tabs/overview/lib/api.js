import widgetApi from '../../../../../lib/widgetApi';

export const getCombineData = async (filterData) => {
  const param = Object.assign({}, widgetApi.getCommonParam(4), { Data: filterData, Url: '/api/performance/overview' });
  const response = await widgetApi.postData(param);
  if (response && response.data) {
    return response.data.data;
  }
  return null;
}
