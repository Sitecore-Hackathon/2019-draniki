import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';

import { AppState } from '../models';

export const makeRootReducer = (history: History) =>
  combineReducers<AppState>({
    router: connectRouter(history),
  });

export default makeRootReducer;
