export const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key) || null)
export const setLocalStorage = (key, val) => window.localStorage.setItem(key, JSON.stringify(val))
export const existsInLocalStorage = (key) => window.localStorage.getItem(key) !== undefined
export const clearLocalStorage = (key) => window.localStorage.clear()
export const goToUrl = (path, title) => {
  const currentHistoryState = window.history.state
  window.history.pushState(currentHistoryState, title, path)
  window.location.replace(path)
}
export const reload = () => window.location.reload()
