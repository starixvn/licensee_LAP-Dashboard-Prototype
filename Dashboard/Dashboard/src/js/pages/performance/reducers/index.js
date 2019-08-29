import { combineReducers } from 'redux';
import * as currency from '../../../reducers/currencyReducer'

export default combineReducers(Object.assign(
  currency
));
