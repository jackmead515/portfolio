const initialState = {
  tracking: {
    data: [],
    lastSynced: null
  }
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
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
