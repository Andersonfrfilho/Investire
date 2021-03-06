import React from 'react';

import PropTypes from 'prop-types';
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
} from 'recharts';
import { AreaSelect, Title } from './styles';

export default function Graph({ data, title, height, numberMax }) {
  return (
    <AreaSelect>
      <Title>{title}</Title>
      <LineChart
        width={900}
        height={height}
        data={data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <Tooltip />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="valor" stroke="#387908" yAxisId={0} />
        <YAxis y={numberMax} />
        <XAxis dataKey="name" fontSize={12} />
      </LineChart>
    </AreaSelect>
  );
}
Graph.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  height: PropTypes.number,
  numberMax: PropTypes.number,
};
Graph.defaultProps = {
  title: 'titulo da tabela',
  height: 0,
  numberMax: 0,
  data: [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400, time: 1 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210, time: 3 },
    { name: 'Page C', uv: 2000, pv: -9800, amt: 2290, time: 9 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000, time: 10 },
    { name: 'Page E', uv: 2500, pv: 4800, amt: 2181, time: 12 },
    { name: 'Page F', uv: 1220, pv: 3800, amt: 2500, time: 16 },
    { name: 'Page G', uv: 2300, pv: 4300, amt: 2100, time: 18 },
    { name: 'Page H', uv: 2300, pv: 4300, amt: 2100, time: 24 },
  ],
};
