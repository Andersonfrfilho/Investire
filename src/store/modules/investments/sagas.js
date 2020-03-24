import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { differenceInDays, subDays, format } from 'date-fns';
import api from '../../../services/api';
import {
  fixedRate,
  postFixed,
  NewException,
  errorVerify,
} from '../../../utils';
import { dataGraph } from './actions';
import {
  loading,
  successAction,
  failureAction,
  breakAction,
} from '../common/actions';

function* generateValue({
  payload: { initialDate, initialValue, typeInvestments, daysBetween },
}) {
  yield put(loading());
  try {
    if (typeInvestments === 'Tesouro Direto pré-fixado') {
      const today = new Date();
      const initialDay = new Date(initialDate);
      const tax = 0.1 / 360;
      const data = [];
      if (daysBetween >= 30) {
        const investimentValue = fixedRate(
          Number(initialValue),
          tax,
          daysBetween - 30
        );
        const investimentValuePos = fixedRate(
          Number(initialValue),
          tax,
          daysBetween
        );
        const diferenceValue = investimentValuePos - investimentValue;
        for (let i = 29; i > -1; i -= 1) {
          const newDate = subDays(today, i);
          const formatDate = format(newDate, 'dd/MM/yyyy');
          data.push({
            name: formatDate,
            valor: (diferenceValue / (i + 1) + investimentValue).toFixed(2),
            time: i,
          });
        }
      } else {
        const investimentValue = fixedRate(
          Number(initialValue),
          tax,
          daysBetween
        );
        const diferenceValue = investimentValue - Number(initialValue);

        for (let i = Number(daysBetween); i > -1; i -= 1) {
          const newDate = subDays(today, i);
          const formatDate = format(newDate, 'dd/MM/yyyy');
          data.push({
            name: formatDate,
            valor: diferenceValue / (i + 1) + Number(initialValue),
            time: i,
          });
        }
      }
      yield put(dataGraph(data));
    }
    // const { data: receiveUser } = yield call(
    //   api.get,
    //   `/users/${user.toLowerCase()}`
    // );
    // if (users.length === 0) {
    //   yield put(addToUser(receiveUser));
    //   toast.success('Usuario adicionado');
    //   yield put(successAction(''));
    // } else {
    //   const newUser = users.find(element => element.id === receiveUser.id);
    //   if (newUser === undefined) {
    //     yield put(addToUser(receiveUser));
    //     toast.success('Usuario adicionado');
    //     yield put(successAction(''));
    //   } else {
    //     throw new UserException('usuário ja cadastrado');
    //   }
    // }
  } catch (error) {
    const menssage = errorVerify(error);
    toast.error(menssage);
    yield put(failureAction(menssage));
  }
}

export default all([
  takeLatest('@investments/REQUEST_GENERATE_VALUE', generateValue),
]);
