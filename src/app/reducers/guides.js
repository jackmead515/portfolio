import { dateRange } from '../util/';

const initialState = {
  guides: {
    data: [],
    dateRange: 0,
    lastSynced: undefined
  },
  tracking: {
    data: [],
    lastSynced: undefined
  }
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
    case 'REFRESH_TRACKING':
      return {
          ...state,
          tracking: {
            data: action.data,
            lastSynced: new Date()
          }
      }
    default:
      return state;
  }
};
