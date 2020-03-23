import React from 'react';

import PropTypes from 'prop-types';
import { AreaHeader, AreaTitle, Title } from './styles';

export default function Header({ title }) {
  return (
    <AreaHeader>
      <AreaTitle>
        <Title>{title}</Title>
      </AreaTitle>
    </AreaHeader>
  );
}
Header.propTypes = {
  title: PropTypes.string,
};
Header.defaultProps = {
  title: 'title button',
};
