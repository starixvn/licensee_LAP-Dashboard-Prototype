
import * as currency from '../../../actions/currencyAction'
import * as filter from './filterAction'
import * as date from '../../../actions/dateAction'
export const ActionCreators = Object.assign({},
  currency,
  filter,
  date
);
