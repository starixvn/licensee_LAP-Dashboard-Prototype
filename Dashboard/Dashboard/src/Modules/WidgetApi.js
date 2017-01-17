
export default class WidgetApi
{
    constructor()
    {

    }
    fetchData(param)
    {
        return {isOk:true,msg:"done", data:{}};
    }

    savePosition(widInfo)
    {
        return;
    }

    getPosition(widgetKey)
    {
        return {key:"deposite",pos:{x:0,y:0,w:200,h:200}};
    }

}