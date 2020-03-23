import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/Home/:index" exact component={Home} />
    </Switch>
  );
}
