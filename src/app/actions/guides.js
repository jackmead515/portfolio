export const refreshGuides = (data) => {
  return {
    type: 'REFRESH_GUIDES',
    data
  }
}

export const refreshPopular = (data) => {
  return {
    type: 'REFRESH_POPULAR',
    data
  }
}

export const refreshRecent = (data) => {
  return {
    type: 'REFRESH_RECENT',
    data
  }
}
