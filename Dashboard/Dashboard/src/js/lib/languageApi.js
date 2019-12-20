
import { ch } from '../resources/resource.ch';
import { cs } from '../resources/resource.cs';
import { en } from '../resources/resource.en';
import { zhcn } from '../resources/resource.zhcn';
import { langCode } from './constants';

export const langCodeMapper = {
  'en': 'en-US',
  'cs': 'zh-CN'
}

export default class languageApi {
  static getRes(langcode, resKey) {
    switch (langcode) {
      case 'ch':
        return ch[resKey];
      case 'cs':
        return cs[resKey];
      case 'en':
        return en[resKey];
      case 'zhcn':
        return zhcn[resKey];
      default:
        return en[resKey];
    }
  }
  static getDefaultRes(resKey) {
    return languageApi.getRes(langCode, resKey);
  }
}
