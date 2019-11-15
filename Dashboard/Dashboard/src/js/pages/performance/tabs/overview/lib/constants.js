
import { defaultData } from '../../../lib/constants';

export const getMajorChangeList = measurementId => {
  let measurement = defaultData.measurements.find(_ => _.id === measurementId);
  measurement = measurement || {};
  return [
    {
      key: 'currencyTopChange',
      title: 'MAJOR CHANGES - By CURRENCY',
      headers: [[{ name: 'Currency' }, { name: measurement.name }, { name: '%CHG' }]],
      data: []
    },
    {
      key: 'productTopChange',
      title: 'MAJOR CHANGES - By PRODUCT',
      headers: [[{ name: 'Product' }, { name: measurement.name }, { name: '%CHG' }]],
      data: []
    },
    {
      key: 'bettypeTopChange',
      title: 'MAJOR CHANGES - By BETTYPE',
      headers: [[{ name: 'Bettype' }, { name: measurement.name }, { name: '%CHG' }]],
      data: []
    },
    {
      key: 'platformTopChange',
      title: 'MAJOR CHANGES - By PLATFORM',
      headers: [[{ name: 'Platform' }, { name: measurement.name }, { name: '%CHG' }]],
      data: []
    }
  ]
}
