import * as types from './types';

export const setCurrentTab = tabKey => {
  return {
    type: types.SET_CURRENT_CHILD_TAB,
    data: tabKey
  }
}
