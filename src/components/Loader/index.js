import React from 'react';
import PropTypes from 'prop-types';
import {
  AreaSvg,
  IconLoaderiPhone,
  IconLoaderAndroid,
  IconLoaderWeb,
} from './styles';

export default function Loader({ time, size }) {
  function choiseLoad(typeParam, timeParam, sizeParam) {
    if (typeParam.toLowerCase() === 'android') {
      return <IconLoaderAndroid time={timeParam} size={sizeParam} />;
    }
    if (typeParam.toLowerCase() === 'ios') {
      return <IconLoaderiPhone time={timeParam} size={sizeParam} />;
    }
    return <IconLoaderWeb time={timeParam} size={sizeParam} />;
  }
  return <AreaSvg>{choiseLoad('web', time, size)}</AreaSvg>;
}
Loader.propTypes = {
  time: PropTypes.number,
  size: PropTypes.number,
};
Loader.defaultProps = {
  time: 1.2,
  size: 28,
};
