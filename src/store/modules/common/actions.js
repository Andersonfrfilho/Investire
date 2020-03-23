export function loading(message) {
  return {
    type: '@common/LOADING',
    payload: {
      loading: true,
      message,
      error: false,
    },
  };
}
export function successAction(message) {
  return {
    type: '@common/SUCCESS',
    payload: {
      loading: false,
      message,
      error: false,
    },
  };
}
export function breakAction(message) {
  return {
    type: '@common/BREAK',
    payload: {
      loading: false,
      message,
      error: false,
    },
  };
}
export function failureAction(message) {
  return {
    type: '@common/FAILURE',
    payload: {
      loading: false,
      message,
      error: true,
    },
  };
}
