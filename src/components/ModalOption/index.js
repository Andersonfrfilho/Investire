import React from 'react';

import PropTypes from 'prop-types';
import { AreaButton, AreaIcon, AreaTitle, Icon, Title } from './styles';

export default function ModalOption({
  icon,
  title,
  functionOnClick,
  disabled,
  active,
}) {
  return (
    <AreaButton
      data-testid="area-button"
      disabled={disabled}
      onClick={functionOnClick}
      active={active}
    >
      <AreaIcon data-testid="areaIcon">{icon}</AreaIcon>
      <AreaTitle data-testid="areatitle">
        <Title data-testid="title">{title}</Title>
      </AreaTitle>
    </AreaButton>
  );
}
ModalOption.propTypes = {
  icon: PropTypes.func,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  functionOnClick: PropTypes.func,
  active: PropTypes.bool,
};
ModalOption.defaultProps = {
  icon: <Icon />,
  disabled: true,
  title: 'title button',
  functionOnClick: () => {},
  active: false,
};
