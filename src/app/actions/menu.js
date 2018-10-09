
export const navigateAdmin = (page, extra) => {
  return {
    type: 'ADMIN_PAGE_NAVIGATION',
    data: {page, extra}
  }
}

export const changeTheme = (data) => {
  return {
    type: 'CHANGE_THEME',
    data
  }
}

export const toggleBees = (data) => {
  return {
    type: 'TOGGLE_BEES',
    data
  }
}

export const refreshCommands = (index, data) => {
  return {
    type: 'REFRESH_COMMANDS',
    data,
    index
  }
}

export const refreshWindowDims = (windowWidth, windowHeight) => {
  return {
    type: 'REFRESH_WINDOWDIMS',
    windowWidth,
    windowHeight
  }
}

export const refreshMouseDims = (mouseX, mouseY) => {
  return {
    type: 'REFRESH_MOUSEDIMS',
    mouseX,
    mouseY
  }
}
