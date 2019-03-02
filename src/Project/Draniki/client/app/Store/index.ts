declare const process: any;

import { applyMiddleware, compose, createStore, DeepPartial, Middleware, Store } from 'redux';
import createSagaMiddleware, { END, SagaMiddleware } from 'redux-saga';

import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, createMemoryHistory, History } from 'history';

import { AppState } from '../models';

import makeRootReducer from './reducer';
import sagas from './sagas';
import { preparePreloadedState } from './state';

export default class AppStore {
  public get instance() {
    return this.storeInstance;
  }

  public get history() {
    return this.routerHistory;
  }
  private storeInstance: Store<AppState>;
  private sagaMiddleware: SagaMiddleware<{}>;

  private routerHistory: History;
  private routerMiddleware: Middleware;

  public constructor(preloadedState: DeepPartial<AppState>, ssr: boolean = false) {
    // init the sagaMiddleware in order to run it later
    this.sagaMiddleware = createSagaMiddleware();

    this.routerHistory = ssr ? createMemoryHistory() : createBrowserHistory();
    this.routerMiddleware = routerMiddleware(this.routerHistory);

    const middlewares = [this.sagaMiddleware, this.routerMiddleware];

    const composeEnhancers = this.getComposeEnhancer();

    const enhancer = composeEnhancers(applyMiddleware(...middlewares));
    const store = createStore(makeRootReducer(this.routerHistory), preloadedState, enhancer);

    if (!ssr) {
      this.runSaga();
    }

    this.storeInstance = store;
  }

  public close() {
    if (this.storeInstance) {
      this.storeInstance.dispatch(END);
    }
  }

  private runSaga() {
    if (this.sagaMiddleware) {
      this.sagaMiddleware.run(sagas);
    }
  }

  private getComposeEnhancer() {
    // return compose without REDUX DEV TOOLS when running production bundle
    if (process.env.NODE_ENV === 'production') {
      return compose;
    }

    return typeof window === 'object' && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']
      ? window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']
      : compose;
  }
}

export { preparePreloadedState };
