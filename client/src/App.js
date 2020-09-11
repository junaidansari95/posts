import React from 'react';
import './App.css';
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { history } from "./Utils/history";
import { Router, Route, Switch } from "react-router-dom";
import Main from "./Screens/Main";
export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Main} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  )
}