export function requestAddToUserRepository(user) {
  return {
    type: '@home/REQUEST_ADD_TO_USER_REPOSITORY',
    payload: {
      user,
    },
  };
}
export function addToRepository(repositories) {
  return {
    type: '@home/ADD_TO_REPOSITORY',
    payload: {
      repositories,
    },
  };
}
export function addToUser(user) {
  return {
    type: '@home/ADD_TO_USER',
    payload: {
      user,
    },
  };
}
