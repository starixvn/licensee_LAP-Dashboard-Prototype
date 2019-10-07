import { defaultFormatFunc } from '../../../lib/dateTimeHelper';

export const generalService = {
  getFilterData: ({ selectedMeasurement, selectedBaseCurrency, selectedComparePeriods}) => {
    return {
      measurement: selectedMeasurement,
      baseCurrencyName: selectedBaseCurrency,
      currentPeriod: _convertPeriodToMetaModel(_convertPeriod(selectedComparePeriods.currentPeriod)),
      previousPeriod: _convertPeriodToMetaModel(_convertPeriod(selectedComparePeriods.previousPeriod)),
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

const _convertPeriodToMetaModel = ({ from, to }) => {
  const fromMonth = defaultFormatFunc(from.month, from.year);
  const toMonth = defaultFormatFunc(to.month, to.year);
  return {
    fromMonth,
    toMonth
  }
}
