import { all } from 'redux-saga/effects';

import home from './home/sagas';

export default function* rootSaga() {
  return yield all([home]);
}
