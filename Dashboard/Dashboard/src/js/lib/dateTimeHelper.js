export const getDistanceBetweenPeriod = ({ from, to }) => {
  const distance = 12 * (to.year - from.year) + (to.month - from.month);
  return distance;
}

export const addMonths = (date, numberOfMonth) => {
  const newDate = new Date(date.setMonth(date.getMonth() - numberOfMonth));
  return newDate;
}

export const defaultFormatFunc = (month, year) => {
  return `${month < 10 ? '0' + month : month}/${year}`
}
