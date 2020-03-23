import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { compareAsc, format, addYears } from 'date-fns';
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
} from './styles';
import * as HomeActions from '../../store/modules/home/actions';
import Header from '../../components/Header';
import Select from '../../components/Select';
import Graph from '../../components/Graph';
import Radio from '../../components/Radio';
import IconButton from '../../components/IconButton';
import DataPicker from '../../components/DataPicker';
import InputValue from '../../components/InputValue';

export default function Home() {
  const { loading } = useSelector(state => state.common);
  const { repositories, user } = useSelector(state => state.home);
  const [typeInvesting, setTypeInvesting] = useState('');
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
    value: 'R$: 0,000',
    valueOptions: [
      { label: 'R$  1.000,00', value: 1000.0, checked: false },
      { label: 'R$ 10.000,00', value: 10000.0, checked: false },
    ],
  });
  const [visibleComponentOptions, setVisibleComponentOptions] = useState(false);
  const [visibleComponentGraph, setVisibleComponentGraph] = useState(false);
  const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400, time: 1 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210, time: 3 },
    { name: 'Page C', uv: 2000, pv: -9800, amt: 2290, time: 9 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000, time: 10 },
    { name: 'Page E', uv: 2500, pv: 4800, amt: 2181, time: 12 },
    { name: 'Page F', uv: 1220, pv: 3800, amt: 2500, time: 16 },
    { name: 'Page G', uv: 2300, pv: 4300, amt: 2100, time: 18 },
    { name: 'Page H', uv: 2300, pv: 4300, amt: 2100, time: 24 },
  ];
  function optionChange(indexParam, optionValueParam) {
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
  function functionSetValueDate(valueDateParam) {
    setDateOption({
      ...dateOption,
      dateValue: valueDateParam,
    });
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
  function functionClearStates() {
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
        { label: 'R$  1.000,00', value: 1000.0, checked: false },
        { label: 'R$ 10.000,00', value: 10000.0, checked: false },
      ],
    });
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

        <AreaSelect visible={visibleComponentOptions}>
          <Select
            title="Selecione um periodo:"
            options={dateOption.dateOptions}
            disabled={!dateOption.alternOption}
            functionOnChange={value => functionSetValueDate(value)}
            value={dateOption.dateValue}
          />
          <IconButton
            icon={<CalendarIcon />}
            disabled={dateOption.dateButtonEnabled}
            functionOnClick={() => functionAlterDate(dateOption.alternOption)}
          />
          <DataPicker
            title="Personalizado:"
            disabled={!dateOption.alternOption}
            startDate={dateOption.dateValue}
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
        <AreaButton visible={visibleComponentOptions}>
          <IconButton icon={<GoGraphIcon />} />
          <IconButton
            icon={<RefreshIcon />}
            functionOnClick={() => functionClearStates()}
          />
        </AreaButton>
        <AreaGraph visible={visibleComponentGraph}>
          <Graph data={data} title="Rentabilidade" />
        </AreaGraph>
      </AreaContent>
    </AreaHome>
  );
}
