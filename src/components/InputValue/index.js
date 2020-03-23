import React from 'react';

import PropTypes from 'prop-types';

import { AreaSelect, CurrencyINPUT, Title } from './styles';

export default function InputValue({
  title,
  value,
  functionOnChangedValue,
  onClickfunctionEndEditing,
}) {
  return (
    <AreaSelect>
      <Title>{title}</Title>
      <CurrencyINPUT
        onBlur={onClickfunctionEndEditing}
        onChange={value => functionOnChangedValue(value)}
        value={value}
        decimalSeparator=","
        thousandSeparator="."
        prefix="R$: "
        precision="2"
      />
    </AreaSelect>
  );
}
InputValue.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  functionOnChangedValue: PropTypes.func,
  onClickfunctionEndEditing: PropTypes.func,
};
InputValue.defaultProps = {
  value: 'R$ 0,00',
  functionOnChangedValue: () => {},
  onClickfunctionEndEditing: () => {},
  title: 'Titulo do input',
};
