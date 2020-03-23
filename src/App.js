import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { GlobalStyle } from './styles';
import './config/ReactotronConfig';
import Routes from './routes/index';
import store from './store';
import history from './services/history';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <GlobalStyle />
        <ToastContainer autoClose={3000} />
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
