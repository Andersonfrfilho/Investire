export function addToUserRequest(user, users) {
  return {
    type: '@login/REQUEST_ADD_TO_USER',
    payload: {
      user,
      users,
    },
  };
}

export function addToUser(newUser) {
  return {
    type: '@login/ADD_TO_USER',
    payload: {
      newUser,
    },
  };
}
export function addToUsers(users) {
  return {
    type: '@login/ADD_TO_USERS',
    payload: {
      users,
    },
  };
}

export function requestUsersExist() {
  return {
    type: '@login/REQUEST_USERS_EXIST',
  };
}
