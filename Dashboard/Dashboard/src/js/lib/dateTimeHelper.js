export const getPreviousPeriod = currentPeriod => {
  const { from, to } = currentPeriod;
  const distance = 12 * (to.year - from.year) + (to.month - from.month);

  const prevPeriodTo = {
    month: (from.month - 1) || 12,
    year: from.month - 1 ? from.year : from.year - 1
  }

  const prevPeriodFrom = {
    month: (12 * (to.year - from.year) + prevPeriodTo.month - distance) % 12,
    year:  prevPeriodTo.year - distance / 12
  }

  this.setState({
    from: prevPeriodFrom,
    to:  prevPeriodTo
  });
}
