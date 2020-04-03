import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { subDays, format, addDays } from 'date-fns';
import axios from 'axios';
import { ptBR } from 'date-fns/locale';
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
      const dateInitialFormat = format(dateInitial, 'yyyy-MM-dd', {
        locale: ptBR,
      });
      const dateEnd = new Date();
      const dateEndFormat = format(dateEnd, 'yyyy-MM-dd', {
        locale: ptBR,
      });
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
      const dataDollarValues = [];
      const dateInitalAux = dateInitial;
      const dateInitialFormatAux = format(dateInitalAux, 'MM-dd-yyyy');
      const dateFinalyFormatAux = format(new Date(), 'MM-dd-yyyy');
      const {
        data: { value: dollar },
      } = yield call(
        axios.get,
        `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial='${dateInitialFormatAux}'&@dataFinalCotacao='${dateFinalyFormatAux}'&$top=${dateValue.length}&$format=json&$select=cotacaoCompra,dataHoraCotacao`
      );
      let positionBitCoin = 0;
      let positionDollar = 0;
      const arrayDateValue = [];
      while (positionBitCoin < dateValue.length) {
        const dateFormat = format(
          new Date(dollar[positionDollar].dataHoraCotacao),
          'yyyy-MM-dd'
        );
        if (dateFormat === dateValue[positionBitCoin]) {
          arrayDateValue.push({
            date: `${dateValue[positionBitCoin].slice(8, 10)}/${dateValue[
              positionBitCoin
            ].slice(5, 7)}/${dateValue[positionBitCoin].slice(0, 4)}`,
            valueDollar: dollar[positionDollar].cotacaoCompra,
            bitCoinValue:
              valueBitCoin[positionBitCoin] *
              dollar[positionDollar].cotacaoCompra,
          });

          positionDollar += 1;
        }
        positionBitCoin += 1;
      }

      const qtdbitCoin = initialValue / arrayDateValue[0].bitCoinValue;

      const data = arrayDateValue.map((bitCointValueReal, index) => {
        return {
          name: bitCointValueReal.date,
          valor: (
            Number(qtdbitCoin) * Number(bitCointValueReal.bitCoinValue)
          ).toFixed(2),
          time: index,
        };
      });
      if (arrayDateValue.length >= 30) {
        for (let i = 30; i > 0; i -= 1) {
          dataGraph.push({ ...data[data.length - i], time: 30 - i });
        }
      } else {
        for (let i = 0; i < Number(arrayDateValue.length); i += 1) {
          dataGraph.push({ ...data[i], time: i });
        }
      }
      diferenceValue = data[data.length - 1].valor - data[0].valor;
      investimentValue = data[data.length - 1].valor;
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
