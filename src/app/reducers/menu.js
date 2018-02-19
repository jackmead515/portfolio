const initialState = {
  opened: false,
  skills: false,
  admin: {
    page: 'LOGIN',
    extra: undefined
  },
  theme: {
    textColor: 'white',
    backgroundColor: 'black',
    iconColor: 'white',
    themeIndex: -1
  }
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case 'PAGE_NAVIGATION':
      return {
        ...state,
        user: {
          page: action.data.page,
          pageProps: action.data.extra
        }
      }
    case 'ADMIN_PAGE_NAVIGATION':
      return {
        ...state,
        admin: {
          page: action.data.page,
          extra: action.data.extra
        }
      }
    case 'MENU_TOGGLE':
        return {
          ...state,
          opened: action.data
        }
    case 'SKILLS_TOGGLE':
      return {
        ...state,
        skills: action.data
      }
    case 'CHANGE_THEME':
        return {
          ...state,
          theme: action.data
        }
    default:
      return state;
  }
};
