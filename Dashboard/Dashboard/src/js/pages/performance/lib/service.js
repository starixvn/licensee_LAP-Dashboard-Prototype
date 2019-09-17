export const overviewService = {
  getFilterData: (data) => {
    return {
      baseCurrency: data.selectedBaseCurrency,
      measurement: data.selectedMeasurement,
      dateRange: data.dateRange,
      compareWith: data.compareWith
    }
  }
}
