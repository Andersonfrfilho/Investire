import produce from 'immer';

const INITIAL_STATE = {
  initialDate: new Date(),
  initialValue: '',
  finalValue: '',
  rentability: '',
  graphGenerate: false,
  graphValue: [],
};

export default function login(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@investments/ADD_TO_VALUE':
      return produce(state, draft => {
        draft.initialDate = action.payload.initialDate;
        draft.initialValue = action.payload.initialValue;
        draft.finalValue = action.payload.finalValue;
        draft.rentability = action.payload.rentability;
        draft.graphValue = action.payload.graphValue;
        draft.graphExibe = action.payload.graphGenerate;
      });
    case '@investments/RESET_VALUE':
      return produce(state, draft => {
        draft.users = action.payload.users;
      });
    default:
      return state;
  }
}
