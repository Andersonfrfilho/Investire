import styled from 'styled-components';
import { FaBitcoin, FaFonticonsFi } from 'react-icons/fa';
import { GiOpenTreasureChest } from 'react-icons/gi';
import { colors } from '../../styles';

export const AreaHeader = styled.div`
  display: flex;
  height: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;

  margin: 5px;
  max-width: 150px;
  border-radius: 10px;
`;
AreaHeader.defaultProps = {
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
export const Title = styled.h2`
  color: ${colors.blumineDark};
`;
export const Icon = styled(FaFonticonsFi)`
  transition: 0.7s;
`;
export const BitIcon = styled(FaBitcoin)``;
export const TesaureIcon = styled(GiOpenTreasureChest)``;
