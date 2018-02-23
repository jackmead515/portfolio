import { dateRange } from '../util/';

const initialState = {
  guides: {
    data: [],
    dateRange: 0,
    lastSynced: undefined
  },
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case 'REFRESH_GUIDES':
      return {
        ...state,
        guides: {
          data: action.data,
          lastSynced: new Date(),
          dateRange: dateRange(action.data)
        }
      }
    default:
      return state;
  }
};
