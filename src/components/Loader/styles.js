import styled, { keyframes } from 'styled-components';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FiLoader } from 'react-icons/fi';
import { FaSpinner } from 'react-icons/fa';
import { colors } from '../../styles';

export const AreaSvg = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
export const IconLoaderiPhone = styled(AiOutlineLoading3Quarters)`
  flex: 1;
  animation: ${rotate} ${({ time }) => time}s linear infinite;
  color: ${colors.darkTransparent};
`;
export const IconLoaderAndroid = styled(FiLoader)`
  flex: 1;
  animation: ${rotate} ${({ time }) => time}s linear infinite;
  color: ${colors.darkTransparent};
`;
export const IconLoaderWeb = styled(FaSpinner)`
  flex: 1;
  animation: ${rotate} ${({ time }) => time}s linear infinite;
  color: ${colors.darkTransparent};
`;
