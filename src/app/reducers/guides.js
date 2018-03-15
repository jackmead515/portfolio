const initialState = {
  guides: {
    data: [],
    lastSynced: undefined
  },
  popular: {
    data: [],
    lastSynced: undefined
  },
  recent: {
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
        }
      }
    case 'REFRESH_POPULAR':
      return {
        ...state,
        popular: {
          data: action.data,
          lastSynced: new Date(),
        }
      }
    case 'REFRESH_RECENT':
      return {
        ...state,
        recent: {
          data: action.data,
          lastSynced: new Date(),
        }
      }
    default:
      return state;
  }
};
