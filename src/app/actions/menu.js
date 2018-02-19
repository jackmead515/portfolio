export const navigateAdmin = (page, extra) => {
  return {
    type: 'ADMIN_PAGE_NAVIGATION',
    data: {page, extra}
  }
}

export const toggleMenu = (data) => {
  return {
    type: 'MENU_TOGGLE',
    data
  }
}

export const toggleSkills = (data) => {
  return {
    type: 'SKILLS_TOGGLE',
    data
  }
}

export const changeTheme = (data) => {
  return {
    type: 'CHANGE_THEME',
    data
  }
}
