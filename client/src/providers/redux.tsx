import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import rootReducer, { RootState } from 'reducers';
import rootSagas from 'sagas';

export interface ReduxProviderProps {
  children: React.ReactNode;
}

let composeEnhancers = compose;

const sagaMiddleware = createSagaMiddleware();

if (process.env.NODE_ENV !== 'production') {
  composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const middleware: any = [sagaMiddleware];

const saveState = (state: Partial<RootState>) => {
  try {
    localStorage.setItem('state', JSON.stringify(state));
  } catch (error) { /* ignore */ }
};

const loadState = (): Partial<RootState> => {
  try {
    const localState = JSON.parse(localStorage.getItem('state'));
    if (localState === null) {
      throw new Error('No local state found');
    }
    return JSON.parse(localStorage.getItem('state'));
  } catch (error) {
    return {
      auth: {
        processing: false,
      },
    };
  }
};

export const store = createStore(
  rootReducer,
  loadState(),
  composeEnhancers(applyMiddleware(...middleware)),
);

store.subscribe(() => {
  const { auth: { accessToken, user } } = store.getState();
  saveState({ auth: { accessToken, user } });
});

sagaMiddleware.run(rootSagas);

const ReduxProvider = ({ children }: ReduxProviderProps) => (
  <Provider store={store}>
    {children}
  </Provider>
);

export default ReduxProvider;
