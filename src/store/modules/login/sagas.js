import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';

import { addToUser, addToUsers } from './actions';
// import history from '../../../services/history';
import {
  loading,
  successAction,
  failureAction,
  breakAction,
} from '../common/actions';
import { UserException, errorVerify } from '../../../config/Exceptions';

function* requestAddToUser({ payload }) {
  const { user, users } = payload;
  yield put(loading());
  try {
    const { data: receiveUser } = yield call(
      api.get,
      `/users/${user.toLowerCase()}`
    );
    if (users.length === 0) {
      yield put(addToUser(receiveUser));
      toast.success('Usuario adicionado');
      yield put(successAction(''));
    } else {
      const newUser = users.find(element => element.id === receiveUser.id);
      if (newUser === undefined) {
        yield put(addToUser(receiveUser));
        toast.success('Usuario adicionado');
        yield put(successAction(''));
      } else {
        throw new UserException('usuário ja cadastrado');
      }
    }
  } catch (error) {
    const menssage = errorVerify(error);
    toast.error(menssage);
    yield put(failureAction(menssage));
  }
}
function* requestUsersExist() {
  yield put(loading());
  try {
    const users = JSON.parse(localStorage.getItem('Modelo@users'));
    if (users) {
      yield put(addToUsers(users));
      yield put(successAction(''));
    } else {
      yield put(addToUsers([]));
      yield put(breakAction(''));
    }
  } catch (error) {
    const menssage = errorVerify(error.message);
    toast.error(menssage);
    yield put(failureAction(menssage));
  }
}
export default all([
  takeLatest('@login/REQUEST_ADD_TO_USER', requestAddToUser),
  takeLatest('@login/REQUEST_USERS_EXIST', requestUsersExist),
]);
