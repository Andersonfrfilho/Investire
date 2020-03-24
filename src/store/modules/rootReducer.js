import { combineReducers } from 'redux';

import investments from './investments/reducer';
import common from './common/reducer';

export default combineReducers({
  investments,
  common,
});
