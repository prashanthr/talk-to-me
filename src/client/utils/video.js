export const getUserName = (socketId = '') => (
  `user-${socketId.toLowerCase().substring(0,6)}`
)
