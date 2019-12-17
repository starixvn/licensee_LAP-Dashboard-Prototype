import React, { Component } from 'react';
import PerformanceDashboard from './App';
import { defaultData } from './lib/constants';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers/index';

const getMiddleware = function() {
  let middleware = [thunkMiddleware];
  if(process.env.NODE_ENV === 'development') {
    const __DEV__ = '__DEV__';
    const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });
    middleware = [...middleware, loggerMiddleware];
  }
  return middleware;
}

const defaultState = {
  isLoading: false,
  currencyInfo: {
    Currency: [],
    BaseCurrency: []
  },
  selectedMeasurement: defaultData.measurements[0],
  selectedBaseCurrency: window.defaultBaseCurrency,
  analyticData: {},
  selectedComparePeriods: defaultData.getComparePeriods(),
};

function configureStore(initialState) {
  const middleware = getMiddleware();
  const enhancer = compose(
    applyMiddleware(
      ...middleware
    ),
  );
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore(defaultState);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PerformanceDashboard />
      </Provider>
    );
  }
}

