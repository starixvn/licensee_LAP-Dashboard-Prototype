
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

   static savePosition(widInfo)
    {
        return;
    }

   static getPosition(widgetKey)
    {
        return {key:"deposite",pos:{x:0,y:0,w:200,h:200}};
    }
    static saveFilter(filterModel)
    {
        return;
    }
    static getFilter()
    {
        return;
    }
}