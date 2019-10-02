import createReducer from '../../../lib/createReducer'
import * as types from '../actions/types.js'

export const currentChildTabKey = createReducer({}, {
  [types.SET_CURRENT_CHILD_TAB](state, action) {
    return action.data;
  }
});
