
export default class  WidgetApi
{
   
    static fetchData(param)
    {
        return {isOk:true,msg:"done", data:"$2000000K"};
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