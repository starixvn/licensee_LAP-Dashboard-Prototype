
import { defaultData } from '../../../lib/constants';

export const getMajorChangeList = measurementId => {
  let measurement = defaultData.measurements.find(_ => _.id === measurementId);
  measurement = measurement || {};
  return [
    {
      key: 'currencyTopChange',
      title: 'MAJOR CHANGES - By CURRENCY',
      header: ['Currency', measurement.name, '%CHG'],
      data: []
    },
    {
      key: 'productTopChange',
      title: 'MAJOR CHANGES - By PRODUCT',
      header: ['Product', measurement.name, '%CHG'],
      data: []
    },
    {
      key: 'bettypeTopChange',
      title: 'MAJOR CHANGES - By BETTYPE',
      header: ['Bettype', measurement.name, '%CHG'],
      data: []
    },
    {
      key: 'platformTopChange',
      title: 'MAJOR CHANGES - By PLATFORM',
      header: ['Platform', measurement.name, '%CHG'],
      data: []
    }
  ]
}
