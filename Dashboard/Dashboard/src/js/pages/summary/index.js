import React, { Component } from 'react';
import SummaryDashboard from './App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from '../../reducers/index'

// middleware that logs actions
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

const defaultState =
  {
    currencyList:[]
  };
function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware,

    ),
  );
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore(defaultState);

export default class App extends Component {



  render() {

    return (
      <Provider store={store}>
        <SummaryDashboard />
      </Provider>
    );
  }
}
