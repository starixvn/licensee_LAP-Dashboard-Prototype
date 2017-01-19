
import {en} from '../resources/resource.en-us';
import {cn} from '../resources/resource.zh-cn';
import {tw} from '../resources/resource.zh-tw';
export default class Lang
{
    static getRes(langcode,resKey)
    {
        switch(langcode)
        {
            case "en":
            return en[resKey];
            case "cn":
            return cn[resKey];
            case "tw":
            return tw[resKey];
            default:
            return en[resKey];
        }
    }
}