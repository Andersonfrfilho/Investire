import styled from 'styled-components';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { colors } from '../../styles';
import 'react-datepicker/dist/react-datepicker.css';

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

export const Options = styled(Select)`
  height: 40px;
  width: 180px;
  box-shadow: 3px 3px 7px 0px ${colors.darknesTransparent};
`;
export const Title = styled.h4`
  margin-top: 5px;
  margin-bottom: 5px;
  color: ${colors.light};
`;
export const PickerDate = styled(DatePicker)`
  width: 180px;
  height: 35px;
  border: solid 2px ${colors.light};
  border-radius: 8px;
  margin-bottom: 3px;
  padding-left: 5px;
  font-size: 18px;
  color: ${colors.regular};
`;
