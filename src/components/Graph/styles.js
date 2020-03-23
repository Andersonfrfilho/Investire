import styled from 'styled-components';
import { LineChart, XAxis, Tooltip, CartesianGrid, Line } from 'recharts';
import { colors } from '../../styles';

export const AreaSelect = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: ${colors.lightsmaller};
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  box-shadow: 3px 3px 7px 0px ${colors.darknesTransparent};
`;
export const Title = styled.h3`
  color: ${colors.blumineDark};
`;
AreaSelect.defaultProps = {
  disabled: 'default',
};

export const LineChartRE = styled(LineChart)``;
export const XAxisR = styled(XAxis)``;
export const TooltipRE = styled(Tooltip)``;
export const CartesianGridRE = styled(CartesianGrid)``;
export const LineRE = styled(Line)``;
