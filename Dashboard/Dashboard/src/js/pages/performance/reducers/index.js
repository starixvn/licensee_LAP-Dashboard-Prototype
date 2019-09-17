import { combineReducers } from 'redux';
import * as currency from '../../../reducers/currencyReducer';
import * as date from '../../../reducers/dateReducer';
import * as filter from './filterReducer';
import overviewReducer from '../tabs/overview/reducers';

export default combineReducers(Object.assign(
  currency,
  date,
  filter,
  overviewReducer
));
