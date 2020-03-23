import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  error: false,
  message: '',
};

export default function login(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@common/LOADING':
      return produce(state, draft => {
        draft.loading = action.payload.loading;
        draft.error = action.payload.error;
        draft.message = action.payload.message;
      });
    case '@common/SUCCESS':
      return produce(state, draft => {
        draft.loading = action.payload.loading;
        draft.message = action.payload.message;
        draft.error = action.payload.error;
      });
    case '@common/FAILURE':
      return produce(state, draft => {
        draft.loading = action.payload.loading;
        draft.message = action.payload.message;
        draft.error = action.payload.error;
      });
    case '@common/BREAK':
      return produce(state, draft => {
        draft.loading = action.payload.loading;
        draft.message = action.payload.message;
        draft.error = action.payload.error;
      });
    default:
      return state;
  }
}
