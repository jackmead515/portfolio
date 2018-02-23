const initialState = {
  topics: {
    data: [],
    lastSynced: null
  }
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case 'REFRESH_TOPICS':
      return {
        ...state,
        topics: {
          data: action.data,
          lastSynced: new Date()
        }
      }
    default:
      return state;
  }
};
