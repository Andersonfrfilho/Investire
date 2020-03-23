import styled from 'styled-components';
import { FaFonticonsFi } from 'react-icons/fa';
import { colors } from '../../styles';

export const AreaButton = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  background-color: ${({ active }) =>
    active ? colors.havelockBlueDarkShadeTwo : colors.havelockBlue};
  color: ${({ active }) => (active ? 'white' : colors.blumineDark)};
  overflow: hidden;
  height: 50px;
  margin: 5px;
  padding: 5px;
  min-width: 250px;
  border-radius: 10px;
  transition: 0.7s;
  box-shadow: 3px 3px 7px 0px ${colors.darknesTransparent};
  cursor: ${({ disabled }) => (disabled ? 'pointer' : 'default')};
  &:hover {
    background-color: ${({ active }) =>
      active ? colors.havelockBlue : colors.havelockBlueDarkShadeTwo};
    svg {
      color: ${({ active }) => (active ? colors.blumineDark : 'white')};
    }
    p {
      color: ${({ active }) => (active ? colors.blumineDark : 'white')};
    }
  }
`;
AreaButton.defaultProps = {
  disabled: 'default',
};

export const AreaIcon = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const AreaTitle = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const Title = styled.p`
  transition: 0.7s;
`;
export const Icon = styled(FaFonticonsFi)`
  transition: 0.7s;
`;
