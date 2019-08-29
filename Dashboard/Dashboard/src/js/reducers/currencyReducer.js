import createReducer from '../lib/createReducer.js'
import * as types from '../actions/types.js'
export const currencyList = createReducer({}, {
  [types.SET_CURRENCY_LIST](state, action) {
    return [...action.data];
  }
});
