import { setLoading } from '../../../actions/loadingAction';
import { setAnalyticData } from '../../../actions/analyticDataAction';
import { getMonthGrowthData, getAllMonthGrowthData } from '../lib/api';

export const getDrillDownData = (filterData, field) => {
   return async (dispatch) => {
        dispatch(setLoading(true));
        try {
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
        } catch(error) {
          console.log('error', error.message);
        }
        dispatch(setLoading(false));
    }
}

export const getAllDrillDownData = filterData => {
  return async (dispatch) => {
       try {
           const responseData = await getAllMonthGrowthData(filterData);
           const data = {
             handlerData: state => {
               state['growthData']['monthGrowth'] = responseData
               return {
                 ...state
               }
             }
           }
           dispatch(setAnalyticData(data));
       } catch(error) {
         console.log('error', error.message);
       }
   }
}
