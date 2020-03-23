import styled from 'styled-components';
import Select from 'react-select';
import { colors } from '../../styles';

export const AreaSelect = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 200px;
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  transition: visibility 0.7s linear 300ms, opacity 300ms;
`;
AreaSelect.defaultProps = {
  disabled: 'default',
};

export const Options = styled(Select)`
  height: 40px;
  width: 180px;
`;
export const Title = styled.h4`
  margin-top: 5px;
  margin-bottom: 5px;
  color: ${colors.light};
`;
