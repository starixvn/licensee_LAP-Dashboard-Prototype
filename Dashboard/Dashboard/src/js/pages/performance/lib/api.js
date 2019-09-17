import widgetApi from '../../../lib/widgetApi';

export const overviewApi = {
    getTotal: async (filterData) => {
        var param = {
            Data: filterData,
            Url: '/api/performance/overview/total',
            IsCrossSite: true
        };

        const response = await widgetApi.fetchData(param);
        if(response && response.data)
            return response.data.data || [];
        return [];
      },
      getTopChange: async (filterData) => {
        var param = {
            Data: filterData,
            Url: '/api/performance/overview/topchange',
            IsCrossSite: true
        };

        const response = await widgetApi.fetchData(param);
        if(response && response.data)
            return response.data.data || [];
        return [];
    }
}

