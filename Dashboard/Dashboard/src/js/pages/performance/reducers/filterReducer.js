import createReducer from '../../../lib/createReducer'
import * as types from '../actions/types.js'

export const selectedMeasurement = createReducer({}, {
  [types.SET_MEASUREMENT](state, action) {
    return action.data;
  }
});
