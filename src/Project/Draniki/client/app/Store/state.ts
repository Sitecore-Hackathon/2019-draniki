import { Field } from '@sitecore-jss/sitecore-jss';
import { DeepPartial } from 'redux';

import { AppState } from '../models';

export const preparePreloadedState = (fields: { [name: string]: Field }): DeepPartial<AppState> => {

  return {

  };
};
