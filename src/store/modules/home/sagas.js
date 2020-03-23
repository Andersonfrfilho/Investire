import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import { addToRepository, addToUser } from './actions';
// import history from '../../../services/history';
import {
  loading,
  successAction,
  failureAction,
  // breakAction,
} from '../common/actions';
import { errorVerify } from '../../../utils';

function* requestAddToUserRepository({ payload }) {
  const { user } = payload;
  yield put(loading());
  try {
    const { data: repositories } = yield call(
      api.get,
      `/users/${user.login.toLowerCase()}/repos`,
      {
        params: {
          per_page: 5,
        },
      }
    );
    yield put(addToUser(user));
    yield put(addToRepository(repositories));
    yield put(successAction(''));
  } catch (error) {
    const menssage = errorVerify(error.message);
    toast.error(menssage);
    yield put(failureAction(menssage));
  }
}
export default all([
  takeLatest(
    '@home/REQUEST_ADD_TO_USER_REPOSITORY',
    requestAddToUserRepository
  ),
]);
