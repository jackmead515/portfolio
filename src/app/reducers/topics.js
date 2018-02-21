const initialState = {
  topics: []
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case 'REFRESH_TOPICS':
      return {
        ...state,
        topics: action.data
      }
    default:
      return state;
  }
};
