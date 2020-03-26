import produce from 'immer';

const INITIAL_STATE = {
  initialDate: new Date(),
  initialValue: '',
  finalValue: '',
  rentability: '',
  graphGenerate: false,
  optionsGenerate: true,
  graphValue: [],
  majorValue: 0,
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
        draft.graphGenerate = action.payload.graphGenerate;
        draft.optionsGenerate = action.payload.closedOptions;
        draft.majorValue = action.payload.valueMajor;
      });
    case '@investments/RESET_VALUE':
      return produce(state, draft => {
        draft.initialDate = new Date();
        draft.initialValue = '';
        draft.finalValue = '';
        draft.rentability = '';
        draft.graphValue = [];
        draft.graphGenerate = false;
        draft.optionsGenerate = action.payload.closedOptions;
        draft.majorValue = 0;
      });
    default:
      return state;
  }
}
