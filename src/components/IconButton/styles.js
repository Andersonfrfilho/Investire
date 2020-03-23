import styled from 'styled-components';
import { FaFonticonsFi } from 'react-icons/fa';
import { colors } from '../../styles';

export const AreaButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${colors.havelockBlue};
  color: ${colors.blumineDark};
  overflow: hidden;
  margin: 5px;
  height: 50px;
  width: 50px;
  border-radius: 25px;
  transition: 0.7s;
  box-shadow: 3px 3px 7px 0px ${colors.darknesTransparent};
  cursor: ${({ disabled }) => (disabled ? 'pointer' : 'default')};

  &:hover {
    background-color: ${colors.havelockBlueDarkShadeTwo};
    svg {
      color: white;
    }
    p {
      color: white;
    }
  }
`;
AreaButton.defaultProps = {
  disabled: 'default',
};

export const AreaIcon = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
export const Icon = styled(FaFonticonsFi)`
  transition: 0.7s;
`;
