import { combineReducers } from 'redux';

import home from './home/reducer';
import common from './common/reducer';

export default combineReducers({
  home,
  common,
});
