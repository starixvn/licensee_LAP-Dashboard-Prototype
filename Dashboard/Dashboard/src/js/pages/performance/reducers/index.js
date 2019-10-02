import { combineReducers } from 'redux';
import * as currency from '../../../reducers/currencyReducer';
import * as filter from './filterReducer';
import * as loading from './loadingReducer';
import * as analyticData from './analyticDataReducer';
import * as tab from './tabReducer';
import overviewReducer from '../tabs/overview/reducers';

export default combineReducers(Object.assign(
  loading,
  currency,
  filter,
  tab,
  analyticData,
  overviewReducer
));
