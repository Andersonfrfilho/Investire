import React from 'react';

import PropTypes from 'prop-types';
import { AreaButton, AreaIcon, Icon } from './styles';

export default function IconButton({ icon, title, functionOnClick, disabled }) {
  return (
    <AreaButton data-testid="area-button" disabled onClick={functionOnClick}>
      <AreaIcon data-testid="areaIcon">{icon}</AreaIcon>
    </AreaButton>
  );
}
IconButton.propTypes = {
  icon: PropTypes.func,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  functionOnClick: PropTypes.func,
};
IconButton.defaultProps = {
  icon: <Icon />,
  disabled: true,
  title: 'title button',
  functionOnClick: () => {},
};
