
import axios from 'axios';

export default class  WidgetApi
{
    
    static _getAuthToken()
    {

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
            // call _getAuthToken().then(=>append token to param.url then call _fetchJson)
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
   {
       try {
             var item=window.sessionStorage.getItem(WidgetApi.wgStatusCacheKey())
              return item? JSON.parse(item) : null
       } catch (error) {
           
       }
     
   }
}