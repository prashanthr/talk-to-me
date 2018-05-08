export const getLocalStorage = (key) => window.localStorage.getItem(key)
export const setLocalStorage = (key, val) => window.localStorage.setItem(key, val)
export const existsInLocalStorage = (key) => window.localStorage.getItem(key) !== undefined
export const clearLocalStorage = (key) => window.localStorage.clear()
export const goToUrl = (path, title) => {
  const currentHistoryState = window.history.state
  window.history.pushState(currentHistoryState, title, path)
  window.location.replace(path)
}
