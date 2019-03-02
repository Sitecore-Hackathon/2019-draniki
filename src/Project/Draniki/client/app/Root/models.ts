import { LayoutServiceData } from '@sitecore-jss/sitecore-jss';
import { History } from 'history';
import { Store } from 'redux';

import { AppState } from './../models';

export interface AppRootProps {
  layoutServiceData: LayoutServiceData;
  store: Store<AppState>;
  history: History;
}
