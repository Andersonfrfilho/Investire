import styled from 'styled-components';
import { colors } from '../../styles';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction:column;
  justify-content: center;
  align-items: center;

  /* border-radius: 3px; */
  /* background-color: ${colors.havelockBlue}; */
`;
export const AreaRadios = styled.div`
  display: flex;
  flex: 1;
  flex-direction:column;
  justify-content: center;
  align-items: flex-start;

  /* border-radius: 3px; */
  /* background-color: ${colors.havelockBlue}; */
`;
export const AreaRadio = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-left: 5px;
  padding-right: 5px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
  background-color: ${colors.havelockBlueLightShadeOne};
  box-shadow: 3px 3px 7px 0px ${colors.darknesTransparent};
  border-radius: 3px;
`;
AreaRadio.defaultProps = {
  disabled: 'default',
};
export const InputRadioLabel = styled.label`
  padding-left: 3px;
  text-align: left;
`;
export const InputRadio = styled.input`
  color: ${colors.blumineDark};
`;
export const Title = styled.h4`
  margin-top: 5px;
  margin-bottom: 5px;
  color: ${colors.light};
`;
