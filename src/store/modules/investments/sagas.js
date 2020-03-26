import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { subDays, format, addDays } from 'date-fns';
import axios from 'axios';
import { fixedRate, errorVerify } from '../../../utils';
import { defineGraph } from './actions';
import { loading, successAction, failureAction } from '../common/actions';

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
      const dateInitialFormat = format(addDays(dateInitial, 1), 'yyyy-MM-dd');
      const dateEnd = new Date();
      const dateEndFormat = format(dateEnd, 'yyyy-MM-dd');
      const restYear = daysBetween % 100;
      const repeatYear = Math.trunc(daysBetween / 100);
      const {
        data: { bpi },
      } = yield call(
        axios.get,
        `https://api.coindesk.com/v1/bpi/historical/close.json?start=${dateInitialFormat}&end=${dateEndFormat}`
      );
      const valueBitCoin = [];
      const dateValue = [];

      for (const key in bpi) {
        valueBitCoin.push(bpi[key]);//eslint-disable-line
        dateValue.push(key);
      }
      console.tron.log(bpi);
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
      const valuesDollarForReal = dataDollarValues.map(element => element.high);
      const valueRealBitCoin = valueBitCoin.map(
        (bitcoin, index) => bitcoin * valuesDollarForReal[index]
      );
      console.tron.log(valueBitCoin);
      const qtdbitCoin = initialValue / valueRealBitCoin[0];
      console.tron.log(valueRealBitCoin, dataDollarValues);
      const data = valueRealBitCoin.map((bitCointValueReal, index) => {
        return {
          name: format(new Date(dateValue[index]), 'dd/MM/yyyy'),
          valor: (Number(qtdbitCoin) * Number(bitCointValueReal)).toFixed(2),
          time: index,
        };
      });
      if (daysBetween >= 30) {
        for (let i = 30; i > 0; i -= 1) {
          dataGraph.push({ ...data[data.length - i], time: 30 - i });
        }
      } else {
        for (let i = 0; i > Number(daysBetween); i += 1) {
          dataGraph.push({ ...data[i], time: i });
        }
      }
      diferenceValue = data[data.length - 2].valor - data[0].valor;
      investimentValue = data[data.length - 2].valor;
    }
    let valueMajor = dataGraph[0].valor;
    for (let i = 0; i < dataGraph.length; i += 1) {
      if (Number(dataGraph[i].valor) >= valueMajor) {
        valueMajor = dataGraph[i].valor;
      }
    }
    toast.success('grafico gerado');
    yield put(
      defineGraph(
        initialDate,
        initialValue,
        investimentValue,
        diferenceValue,
        dataGraph,
        true,
        false,
        valueMajor
      )
    );
    yield put(successAction(''));
  } catch (error) {
    const menssage = errorVerify(error);
    toast.error(menssage);
    yield put(failureAction(menssage));
  }
}

export default all([
  takeLatest('@investments/REQUEST_GENERATE_VALUE', generateValue),
]);
