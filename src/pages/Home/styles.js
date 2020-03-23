import styled from 'styled-components';
import {
  FaBitcoin,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaRegMoneyBillAlt,
} from 'react-icons/fa';
import { FiRefreshCcw } from 'react-icons/fi';
import { GoGraph } from 'react-icons/go';
import { GiOpenTreasureChest } from 'react-icons/gi';
import { colors } from '../../styles';

export const AreaHome = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 30px;
  background-color: ${colors.lighter};
`;
export const AreaContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${colors.blumineDark};
  min-width: 1024px;
  padding-top: 20px;
  padding-left: 5px;
  padding-bottom: 10px;
  padding-right: 5px;
  border-radius: 10px;
  box-shadow: 10px 11px 25px 0px rgba(0, 0, 0, 0.75);
`;
export const AreaOptions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding-left: 5px;
  padding-right: 5px;
`;
export const AreaSelect = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: center;
  margin-top: 15px;
  min-width: 500px;
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  transition: visibility 0.7s linear 300ms, opacity 300ms;
`;
export const AreaRadio = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: flex-start;
  margin-top: 15px;
  min-width: 500px;
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  transition: visibility 0.7s linear 300ms, opacity 300ms;
`;
export const AreaButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin-top: 15px;
  min-width: 500px;
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  transition: visibility 0.7s linear 300ms, opacity 300ms;
`;
export const AreaGraph = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: flex-start;
  margin-top: 15px;
  min-width: 520px;
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  transition: visibility 0.7s linear 300ms, opacity 300ms;
`;
export const RepositoryList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;
  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;
  }
  & + li {
    margin-top: 10px;
  }
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #eee;
  }
  div {
    flex: 1;
    margin-left: 15px;
    strong {
      font-size: 16px;
      a {
        text-decoration: none;
        color: #333;
        &:hover {
          color: #7159c1;
        }
      }
      span {
        background: #eee;
        color: #333;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 600;
        height: 20px;
        padding: 3px 4px;
        margin-left: 10px;
      }
    }
    p {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
    }
  }
`;
export const BitIcon = styled(FaBitcoin)`
  transition: 0.7s;
`;
export const TesaureIcon = styled(GiOpenTreasureChest)`
  transition: 0.7s;
`;
export const BillIcon = styled(FaMoneyBillWave)`
  transition: 0.7s;
`;
export const CalendarIcon = styled(FaCalendarAlt)`
  transition: 0.7s;
`;
export const MoneyIcon = styled(FaRegMoneyBillAlt)`
  transition: 0.7s;
`;
export const GoGraphIcon = styled(GoGraph)`
  transition: 0.7s;
`;
export const RefreshIcon = styled(FiRefreshCcw)`
  transition: 0.7s;
`;
