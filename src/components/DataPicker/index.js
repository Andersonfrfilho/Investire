import React from 'react';

import PropTypes from 'prop-types';
import { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import { AreaSelect, PickerDate, Title } from './styles';

export default function DataPicker({
  startDate,
  title,
  disabled,
  select,
  functionOnChange,
}) {
  registerLocale('pt-Br', ptBR);
  const date = new Date();
  return (
    <AreaSelect>
      <Title>{title}</Title>
      <PickerDate
        disabled={disabled}
        selected={select}
        onChange={date => functionOnChange(date)}
        locale="pt-Br"
        dateFormat="P"
      />
    </AreaSelect>
  );
}
DataPicker.propTypes = {
  startDate: PropTypes.string,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  functionOnChange: PropTypes.func,
};
DataPicker.defaultProps = {
  startDate: new Date(),
  disabled: true,
  title: '',
  functionOnChange: () => {},
};
