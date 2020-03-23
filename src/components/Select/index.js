import React from 'react';

import PropTypes from 'prop-types';
import { AreaSelect, Options, Title } from './styles';

export default function Select({
  title,
  disabled,
  options,
  value,
  functionOnChange,
}) {
  return (
    <AreaSelect visible={disabled}>
      <Title>{title}</Title>
      <Options options={options} value={value} onChange={functionOnChange} />
    </AreaSelect>
  );
}
Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  functionOnChange: PropTypes.func,
};
Select.defaultProps = {
  title: 'title',
  disabled: true,
  value: 'lol',
  options: [
    { value: 'oneYear', label: 'One Year' },
    { value: 'twoYear', label: 'Two Year' },
  ],
  functionOnChange: () => {},
};
