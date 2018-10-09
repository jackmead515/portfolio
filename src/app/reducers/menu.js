const initialState = {
  commands: [],
  commandIndex: 0,
  admin: {
    page: 'LOGIN',
    extra: undefined
  },
  theme: {
    textColor: 'white',
    backgroundColor: 'black',
    iconColor: 'white',
    themeIndex: -1
  },
  windowWidth: 0,
  windowHeight: 0,
  mouseX: 0,
  mouseY: 0,
  bees: false
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case 'ADMIN_PAGE_NAVIGATION':
      return {
        ...state,
        admin: {
          page: action.data.page,
          extra: action.data.extra
        }
      }
    case 'REFRESH_COMMANDS':
      return {
        ...state,
        commands: action.data,
        commandIndex: action.index
      }
    case 'CHANGE_THEME':
        return {
          ...state,
          theme: action.data
        }
    case 'REFRESH_WINDOWDIMS':
        return {
          ...state,
          windowWidth: action.windowWidth,
          windowHeight: action.windowHeight
        }
    case 'REFRESH_MOUSEDIMS':
      return {
        ...state,
        mouseX: action.mouseX,
        mouseY: action.mouseY
      }
    case 'TOGGLE_BEES':
      return {
        ...state,
        bees: action.data
      }
    default:
      return state;
  }
};
