import { setLoading } from '../../../actions/loadingAction';
import { setAnalyticData } from '../../../actions/analyticDataAction';
import { getMonthGrowthData } from '../lib/api';

export const getDrillDownData = (filterData, field) => {
   return async (dispatch) => {
        dispatch(setLoading(true));
        try {
          setTimeout(async () => {
            const responseData = await getMonthGrowthData(filterData);
            const data = {
              handlerData: state => {
                state['growthData']['monthGrowth'][field] = responseData
                return {
                  ...state
                }
              }
            }
            dispatch(setAnalyticData(data));
            dispatch(setLoading(false));
          }, 500)

        } catch(error) {
          console.log('error', error.message)
        }
        console.log('filter', filterData)
    }
}
