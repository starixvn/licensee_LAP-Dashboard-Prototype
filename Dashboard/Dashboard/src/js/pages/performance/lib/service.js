import { defaultFormatFunc } from '../../../lib/dateTimeHelper';

export const generalService = {
  getFilterData: ({ selectedMeasurement, selectedBaseCurrency, selectedComparePeriods}) => {
    return {
      measurement: selectedMeasurement,
      baseCurrencyName: selectedBaseCurrency,
      currentPeriod: convertPeriodToMetaModel(_convertPeriod(selectedComparePeriods.currentPeriod)),
      previousPeriod: convertPeriodToMetaModel(_convertPeriod(selectedComparePeriods.previousPeriod)),
    }
  },
  getScrollTabStyle: () => {
    const { innerHeight } = window;
    return {
      maxHeight: (innerHeight - 200) + 'px'
    }
  }
}

const _convertPeriod = ({ from, to }) => {
  return {
    from: {
      ...from,
      ...{
        month: from.month + 1
      }
    },
    to: {
      ...to,
      ...{
        month: to.month + 1
      }
    }
  }
}

export const convertPeriodToMetaModel = ({ from, to }) => {
  const fromMonth = defaultFormatFunc(from.month, from.year);
  const toMonth = defaultFormatFunc(to.month, to.year);
  return {
    fromMonth,
    toMonth
  }
}
