import React from 'react';

import PropTypes from 'prop-types';
import {
  Container,
  AreaRadios,
  AreaRadio,
  InputRadio,
  InputRadioLabel,
  Title,
} from './styles';

export default function Radio({ options, functionOnChange }) {
  return (
    <Container>
      <Title>Escolha um valor</Title>
      <AreaRadios>
        {options.map((option, indexParam) => (
          <AreaRadio>
            <InputRadio
              type="radio"
              id="value"
              name="gender"
              value={option.value}
              checked={option.checked}
              onFocusCapture={() => functionOnChange(option.value, indexParam)}
              // onChange={valueParam => functionOnChange(valueParam)}
            />
            <InputRadioLabel for="value">{option.label}</InputRadioLabel>
          </AreaRadio>
        ))}
      </AreaRadios>
    </Container>
  );
}
Radio.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  functionOnChange: PropTypes.func,
};
Radio.defaultProps = {
  functionOnChange: () => {},
  options: [
    { value: 'oneYear', label: 'One Year' },
    { value: 'twoYear', label: 'Two Year' },
  ],
};
