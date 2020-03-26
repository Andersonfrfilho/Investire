import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { compareAsc, format, addYears, differenceInDays } from 'date-fns';
import ModalOption from '../../components/ModalOption';

import {
  AreaHome,
  AreaContent,
  AreaOptions,
  AreaSelect,
  AreaGraph,
  AreaRadio,
  BitIcon,
  CalendarIcon,
  MoneyIcon,
  TesaureIcon,
  GoGraphIcon,
  AreaButton,
  RefreshIcon,
  AreaTitle,
  AreaText,
  Title,
} from './styles';
import * as InvestmentsActions from '../../store/modules/investments/actions';
import Header from '../../components/Header';
import Select from '../../components/Select';
import Graph from '../../components/Graph';
import Radio from '../../components/Radio';
import IconButton from '../../components/IconButton';
import DataPicker from '../../components/DataPicker';
import InputValue from '../../components/InputValue';

export default function Home() {
  const { loading } = useSelector(state => state.common);
  const {
    initialDate,
    initialValue,
    finalValue,
    rentability,
    graphGenerate,
    graphValue,
  } = useSelector(state => state.investments);
  console.tron.log(graphGenerate, graphGenerate);
  const [typeInvesting, setTypeInvesting] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const [options, setOptions] = useState([
    { name: 'Bitcoin', active: false, icon: () => <BitIcon />, disabled: null },
    {
      name: 'Tesouro Direto pré-fixado',
      active: false,
      icon: () => <TesaureIcon />,
      disabled: null,
    },
  ]);
  const dateTime = new Date();
  const [dateOption, setDateOption] = useState({
    datetime: null,
    dateButtonEnabled: false,
    dateTimeError: null,
    dateFunction: () => {},
    dateVisible: null,
    dateValue: dateTime,
    alternOption: false,
    dateOptions: [
      { value: 'oneYear', label: 'One Year' },
      { value: 'twoYear', label: 'Two Year' },
    ],
  });
  const [valueOption, setValueOption] = useState({
    valueTime: null,
    valueButtonEnabled: false,
    valueTimeError: null,
    valueFunction: () => {},
    valueVisible: null,
    alternOption: false,
    value: 'R$: 0,00',
    valueOptions: [
      { label: 'R$  2.000,00', value: 2000.0, checked: false },
      { label: 'R$ 10.000,00', value: 10000.0, checked: false },
    ],
  });
  const [visibleComponentOptions, setVisibleComponentOptions] = useState(false);
  const [visibleComponentExist, setVisibleComponentExist] = useState(true);
  const [heightGraph, setHeightGraph] = useState(0);

  function functionClearStates(optionParam) {
    setHeightGraph(0);
    setVisibleComponentExist(true);
    dispatch(InvestmentsActions.resetGraph(optionParam));
    setOptions([
      {
        name: 'Bitcoin',
        active: false,
        icon: () => <BitIcon />,
        disabled: null,
      },
      {
        name: 'Tesouro Direto pré-fixado',
        active: false,
        icon: () => <TesaureIcon />,
        disabled: null,
      },
    ]);
    setDateOption({
      datetime: null,
      dateButtonEnabled: false,
      dateTimeError: null,
      dateFunction: () => {},
      dateVisible: null,
      dateValue: dateTime,
      alternOption: false,
      dateOptions: [
        { value: 'oneYear', label: 'One Year' },
        { value: 'twoYear', label: 'Two Year' },
      ],
    });
    setValueOption({
      valueTime: null,
      valueButtonEnabled: false,
      valueTimeError: null,
      valueFunction: () => {},
      valueVisible: null,
      alternOption: false,
      value: 'R$: 0,000',
      valueOptions: [
        { label: 'R$  2.000,00', value: 2000.0, checked: false },
        { label: 'R$ 10.000,00', value: 10000.0, checked: false },
      ],
    });
    setVisibleComponentOptions(false);
  }
  function optionChange(indexParam, optionValueParam) {
    functionClearStates();
    setTypeInvesting(optionValueParam);
    const newConstObj = options.map((option, optionIndexParam) => {
      if (optionIndexParam === indexParam) {
        return {
          ...option,
          active: !option.active,
        };
      }
      return { ...option, active: false };
    });
    setVisibleComponentOptions(newConstObj[indexParam].active);
    setDateOption({
      ...dateOption,
      dateButtonEnabled: newConstObj[indexParam].active,
    });
    const date = new Date();
    const showDateOne = addYears(date, -1);
    const showDateTwo = addYears(date, -2);
    const formattedOneDate = format(showDateOne, 'dd/MM/yyyy');
    const formattedTwoDate = format(showDateTwo, 'dd/MM/yyyy');
    setDateOption({
      ...dateOption,
      dateButtonEnabled: true,
      dateValue: dateOption[0],
      dateOptions: [
        { label: formattedOneDate, value: showDateOne },
        { label: formattedTwoDate, value: showDateTwo },
      ],
    });
    setOptions(newConstObj);
  }
  function functionAlterDate() {
    setDateOption({
      ...dateOption,
      alternOption: !dateOption.alternOption,
    });
  }
  function functionSetValueDate(valueDateParam, selectParam = false) {
    if (selectParam) {
      setDateOption({
        ...dateOption,
        dateValue: valueDateParam.value,
      });
    } else {
      setDateOption({
        ...dateOption,
        dateValue: valueDateParam,
      });
    }
  }
  function functionOnChangeRadio(valueParam, indexParam, optionsParam) {
    const newOptions = optionsParam.valueOptions.map(
      (option, indexOptionParam) => {
        if (indexParam === indexOptionParam) {
          return {
            ...option,
            checked: true,
          };
        }
        return {
          ...option,
          checked: false,
        };
      }
    );
    const newObject = {
      ...valueOption,
      value: valueParam,
      valueOptions: newOptions,
    };
    setValueOption(newObject);
  }
  function functionClearInputRadio(optionsParam) {
    const newOptions = optionsParam.valueOptions.map(option => {
      return {
        ...option,
        checked: false,
      };
    });

    const newObject = {
      ...valueOption,
      valueOptions: newOptions,
    };
    setValueOption(newObject);
  }

  function functionGenerateGraph(
    dateInitialParam,
    valueParam,
    typeInvestingParam
  ) {
    setHeightGraph(300);
    setVisibleComponentExist(false);
    if (!dateInitialParam || dateInitialParam === undefined) {
      setMessage('error date invalid');
      return false;
    }
    const today = new Date();
    const initalDay = new Date(dateInitialParam);
    if (today < initalDay) {
      setMessage('error date invalid');
      return false;
    }
    const daysBetween = differenceInDays(today, initalDay);
    if (daysBetween <= 0) {
      setMessage('error date invalid');
      return false;
    }
    if (!valueParam || valueParam === undefined) {
      setMessage('error value invalid');
      return false;
    }
    const clearValue = valueParam.toString().replace(/[: .\sR$]/gm, '');
    const newValue = clearValue.replace(',', '.');
    dispatch(
      InvestmentsActions.generateValueInvestments(
        dateInitialParam,
        newValue,
        typeInvestingParam,
        daysBetween
      )
    );
  }
  return (
    <AreaHome>
      <Header title="Investire" />
      <AreaContent>
        <AreaOptions>
          {options.map((option, indexParam) => (
            <ModalOption
              icon={<option.icon />}
              // disabled={option.active}
              active={option.active}
              title={option.name}
              functionOnClick={() => optionChange(indexParam, option.name)}
            />
          ))}
        </AreaOptions>

        {visibleComponentExist && (
          <>
            <AreaSelect visible={visibleComponentOptions}>
              <Select
                title="Selecione um periodo:"
                options={dateOption.dateOptions}
                disabled={!dateOption.alternOption}
                functionOnChange={valueDate =>
                  functionSetValueDate(valueDate, true)
                }
              />
              <IconButton
                icon={<CalendarIcon />}
                disabled={dateOption.dateButtonEnabled}
                functionOnClick={() =>
                  functionAlterDate(dateOption.alternOption)
                }
              />
              <DataPicker
                title="Personalizado:"
                disabled={!dateOption.alternOption}
                select={dateOption.dateValue}
                functionOnChange={dateParam => functionSetValueDate(dateParam)}
              />
            </AreaSelect>

            <AreaRadio visible={visibleComponentOptions}>
              <Radio
                options={valueOption.valueOptions}
                functionOnChange={(valueParam, indexParam) =>
                  functionOnChangeRadio(valueParam, indexParam, valueOption)
                }
              />
              <IconButton icon={<MoneyIcon />} disabled />
              <InputValue
                title="Personalizado:"
                onClickfunctionEndEditing={() =>
                  functionClearInputRadio(valueOption)
                }
                functionOnChangedValue={textParam =>
                  setValueOption({ ...valueOption, value: textParam })
                }
                value={valueOption.value}
              />
            </AreaRadio>
          </>
        )}
        <AreaButton visible={visibleComponentOptions}>
          <IconButton
            icon={<GoGraphIcon />}
            functionOnClick={() =>
              functionGenerateGraph(
                dateOption.dateValue,
                valueOption.value,
                typeInvesting
              )
            }
          />
          <IconButton
            icon={<RefreshIcon />}
            functionOnClick={() => functionClearStates(false)}
          />
        </AreaButton>

        <AreaGraph visible={graphGenerate}>
          <AreaTitle>
            <AreaText>
              <Title bold>Dia de início:</Title>
              <Title>{`${format(initialDate, 'dd/MM/yyyy')}`}</Title>
            </AreaText>
            <AreaText>
              <Title bold>Valor total inicial:</Title>
              <Title>{`${Number(initialValue).toLocaleString('pt-BR')}`}</Title>
            </AreaText>
            <AreaText>
              <Title bold>Valor total hoje:</Title>
              <Title>{`${Number(finalValue).toLocaleString('pt-BR')}`}</Title>
            </AreaText>
            <AreaText>
              <Title bold>Rentabilidade acumulada:</Title>
              <Title>{`${Number(rentability).toLocaleString('pt-BR')}`}</Title>
            </AreaText>
          </AreaTitle>
          <Graph data={graphValue} title="Rentabilidade" height={heightGraph} />
        </AreaGraph>
      </AreaContent>
    </AreaHome>
  );
}
