import { all } from 'redux-saga/effects';

import investments from './investments/sagas';

export default function* rootSaga() {
  return yield all([investments]);
}
