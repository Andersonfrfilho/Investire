import produce from 'immer';

const INITIAL_STATE = {
  user: '',
  users: [],
};

export default function login(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@login/ADD_TO_USER':
      return produce(state, draft => {
        draft.users.push(action.payload.newUser);
        draft.user = action.payload.newUser;
      });
    case '@login/ADD_TO_USERS':
      return produce(state, draft => {
        draft.users = action.payload.users;
      });
    default:
      return state;
  }
}
