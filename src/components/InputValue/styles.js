import styled from 'styled-components';
import Select from 'react-select';
import CurrencyInput from 'react-currency-input';
import { colors } from '../../styles';

export const AreaSelect = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 200px;
`;
AreaSelect.defaultProps = {
  disabled: 'default',
};

export const CurrencyINPUT = styled(CurrencyInput)`
  height: 42px;
  width: 180px;
  border: none;
  border-radius: 12px;
  padding-right: 5px;
  box-shadow: 3px 3px 7px 0px ${colors.darknesTransparent};
  font-size: 20px;
  text-align: right;
  color: ${colors.regular};
`;
export const Title = styled.h4`
  margin-top: 5px;
  margin-bottom: 5px;
  color: ${colors.light};
`;
