import { createGlobalStyle } from 'styled-components';
// import background from '../assets/images/background.svg';
import 'react-toastify/dist/ReactToastify.css';
import colors from './colors';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
  *{
    margin:0;
    padding:0;
    outline:0;
  }
  html,body,#root{
    height:100%;
    display:flex;
    flex-direction:column;
    @media (min-width: 300px) { min-width: 300px;font-size: 12px }
    @media (min-width: 400px) { min-width: 400px;font-size: 14px }
    @media (min-width: 800px) { min-width: 800px;font-size: 18px }
    @media (min-width: 1200px) { min-width: 1200px;font-size: 20px }
  }
  body{
    background:${() => colors.white};
    -webkit-font-smoothing:antialiased !important;
  }
  body,input,button{
    color:${() => colors.darkness};
    src: local('Roboto-Medium'), url(./fonts/Roboto-Medium.ttf) format('ttf');
    font:14px Roboto-Medium, sans-serif, Arial, Helvetica;
  }
  #root {
    /*max-width:1020px;
    margin:0 auto;
    padding: 0 20px 50px;*/
  }
  button{
    cursor:pointer
  }
`;
