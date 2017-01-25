
import axios from 'axios';

export default class  WidgetApi
{
    
    static _getAuthToken()
    {
        return 'xxx';
    }
    static _fetchJson(param)
    {
        //sample
         axios.get(param.Url, {
            
             withCredentials: !param.IsCrossSite,
        })
        .then(response => {
            console.log(response.data);
            
        })
        .catch(error=> {
            console.log(error);
        });
        
        //return a promise
    }
    static fetchData(param)
    {
        if(param.IsCrossSite)
        {
            return axios.get((window.TokenUrl || "http://localhost:55049") + param.Url, {
                params: {
                 'X-Auth-Token' : WidgetApi._getAuthToken()
                }
            });
        }else
        {
            //call _fetchJson
        }
        //return a promise
    }

   static wgStatusCacheKey()
   {
       return "_LAP_Dashboard_Wg_Status"
   }
   static saveWgStatus(wgs)
   {
       try {
            window.sessionStorage.setItem(WidgetApi.wgStatusCacheKey(),JSON.stringify(wgs))
       } catch (error) {
           alert("To continue use dashboard. Please turn private browsing off!!")
       }
   }
   static getWgStatus()
   {             var item=window.sessionStorage.getItem(WidgetApi.wgStatusCacheKey())
              return item? JSON.parse(item) : null
     
     
   }
}