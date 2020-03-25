import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { differenceInDays, subDays, format, addDays } from 'date-fns';
import axios from 'axios';
import {
  fixedRate,
  postFixed,
  NewException,
  errorVerify,
} from '../../../utils';
import { defineGraph } from './actions';
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
    let diferenceValue;
    let investimentValue;
    const dataGraph = [];
    if (typeInvestments === 'Tesouro Direto pré-fixado') {
      const today = new Date();
      const initialDay = new Date(initialDate);
      const tax = 0.1 / 360;
      if (daysBetween >= 30) {
        const investimentValueLess = fixedRate(
          Number(initialValue),
          tax,
          daysBetween - 30
        );
        investimentValue = fixedRate(Number(initialValue), tax, daysBetween);
        diferenceValue = investimentValue - investimentValueLess;
        for (let i = 29; i > -1; i -= 1) {
          const newDate = subDays(today, i);
          const formatDate = format(newDate, 'dd/MM/yyyy');
          dataGraph.push({
            name: formatDate,
            valor: (diferenceValue / (i + 1) + investimentValueLess).toFixed(2),
            time: i,
          });
        }
      } else {
        investimentValue = fixedRate(Number(initialValue), tax, daysBetween);
        diferenceValue = investimentValue - Number(initialValue);

        for (let i = Number(daysBetween); i > -1; i -= 1) {
          const newDate = subDays(today, i);
          const formatDate = format(newDate, 'dd/MM/yyyy');
          dataGraph.push({
            name: formatDate,
            valor: diferenceValue / (i + 1) + Number(initialValue),
            time: i,
          });
        }
      }
    } else {
      const dateInitial = new Date(initialDate);
      const dateInitialFormat = format(dateInitial, 'yyyy-MM-dd');
      const dateInitialFormatTwo = format(dateInitial, 'yyyyMMdd');
      const dateEnd = new Date();
      const dateEndFormat = format(dateEnd, 'yyyy-MM-dd');
      const dateEndFormatTwo = format(dateEnd, 'yyyyMMdd');
      const restYear = daysBetween % 100;
      const repeatYear = Math.trunc(daysBetween / 100);
      const {
        data: { bpi },
      } = yield call(
        axios.get,
        `https://api.coindesk.com/v1/bpi/historical/close.json?start=${dateInitialFormat}&end=${dateEndFormat}`
      );
      const dataDollarValues = [];
      let dateInitalAux = dateInitial;
      let dateInitialFormatAux = format(dateInitalAux, 'yyyyMMdd');
      let dateFinalyAux = addDays(dateInitalAux, 100);
      let dateFinalyFormatAux = format(dateFinalyAux, 'yyyyMMdd');
      if (repeatYear !== 0) {
        for (let i = 0; i < repeatYear; i += 1) {
          const { data: dollarValues } = yield call(
            axios.get,
            `https://economia.awesomeapi.com.br/USD-BRL/${100}?start_date=${dateInitialFormatAux}&end_date=${dateFinalyFormatAux}`
          );
          dateInitalAux = dateFinalyAux;
          dateInitialFormatAux = dateFinalyFormatAux;
          dateFinalyAux = addDays(dateInitalAux, 100);
          dateFinalyFormatAux = format(dateFinalyAux, 'yyyyMMdd');
          for (let j = 0; j < dollarValues.length; j += 1) {
            dataDollarValues.push(dollarValues[j]);
          }
        }
      }
      const { data: dollarValues } = yield call(
        axios.get,
        `https://economia.awesomeapi.com.br/USD-BRL/${restYear}?start_date=${dateInitialFormatAux}&end_date=${dateFinalyFormatAux}`
      );
      for (let j = 0; j < dollarValues.length; j += 1) {
        dataDollarValues.push(dollarValues[j]);
      }
      const values = dataDollarValues.map(element => element.high);
      console.tron.log(values);
    }
    toast.success('grafico gerado');
    yield put(successAction(''));
    // yield put(
    //  defineGraph(
    //    initialDate,
    //    initialValue,
    //    investimentValue,
    //    diferenceValue,
    //    dataGraph,
    //    true
    //  )
    // );
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
