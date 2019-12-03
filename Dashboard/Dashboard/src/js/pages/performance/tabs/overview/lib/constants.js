
import { defaultData } from '../../../lib/constants';
import languageApi from '../../../../../lib/languageApi';

export const getMajorChangeList = measurementId => {
  let measurement = defaultData.measurements.find(_ => _.id === measurementId);
  measurement = measurement || {};
  return [
    {
      key: 'currencyTopChange',
      title: languageApi.getDefaultRes('marjor_table_title_currency'),
      headers: [[{ name: languageApi.getDefaultRes('currency') }, { name: measurement.name }, { name: '%CHG' }]],
      data: []
    },
    {
      key: 'productTopChange',
      title: languageApi.getDefaultRes('marjor_table_title_product'),
      headers: [[{ name: languageApi.getDefaultRes('product') }, { name: measurement.name }, { name: '%CHG' }]],
      data: []
    },
    {
      key: 'bettypeTopChange',
      title: languageApi.getDefaultRes('marjor_table_title_bettype'),
      headers: [[{ name: languageApi.getDefaultRes('bettype')  }, { name: measurement.name }, { name: '%CHG' }]],
      data: []
    },
    {
      key: 'platformTopChange',
      title: languageApi.getDefaultRes('marjor_table_title_platform'),
      headers: [[{ name: languageApi.getDefaultRes('platform') }, { name: measurement.name }, { name: '%CHG' }]],
      data: []
    }
  ]
}
